<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Chat;  // Assuming you have a Chat model
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        return Inertia::render('Chat');
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        // Log the incoming user message
        Log::info('User message received:', ['message' => $validated['message']]);

        // Send the request to OpenAI's API
        $openaiResponse = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                ['role' => 'user', 'content' => $validated['message']],
            ],
            'temperature' => 0.7,
            'max_tokens' => 1024,
        ]);

        // Log the response status and content from OpenAI
        Log::info('OpenAI API response:', [
            'status' => $openaiResponse->status(),
            'response' => $openaiResponse->json(),
        ]);

        if ($openaiResponse->failed()) {
            // Log the error response
            Log::error('OpenAI API error:', [
                'status' => $openaiResponse->status(),
                'body' => $openaiResponse->body(),
            ]);

            return response()->json(['error' => 'Failed to get response from OpenAI'], 500);
        }

        // Extract the content from the response
        $openaiContent = $openaiResponse->json('choices')[0]['message']['content'];

        // Store the conversation in the database
        Chat::create([
            'user_id' => auth()->id(),
            'request' => $validated['message'],
            'response' => $openaiContent,
        ]);

        // Log the assistant's response
        Log::info('Assistant response stored in database:', ['response' => $openaiContent]);

        return Inertia::render('Chat', [
            'userMessage' => $validated['message'],
            'assistantResponse' => $openaiContent,
        ]);
    }

}

