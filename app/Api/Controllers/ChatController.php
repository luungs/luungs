<?php

namespace App\Api\Controllers;

use App\Http\Requests\ChatRequest;
use App\Services\ChatService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class ChatController extends Controller
{
    protected $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    public function store(ChatRequest $request): JsonResponse
    {
        $userId = auth()->id();  // Get the logged-in user's ID

        $data = $request->validated();
        $data['user_id'] = $userId;  // Assign the user_id automatically

        $chat = $this->chatService->createChat($data);

        return response()->json($chat, 201);
    }

    public function showByUserId(): JsonResponse
    {
        $userId = auth()->id();  // Get the logged-in user's ID
        $chats = $this->chatService->getChatsByUserId($userId);

        return response()->json($chats);
    }
}

