<?php

namespace App\Services;

use App\Models\UserAnswers;
use App\Models\Task; // Assuming you have a Task model
use App\Models\Test; // Assuming you have a Test model
use App\Models\Assignment; // Assuming you have a Test model
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // Importing Laravel's logging

class UserAnswerService
{
    public function createUserAnswer(array $data)
    {
        return UserAnswers::create($data);
    }

    public function createOrUpdateUserAnswer(array $data)
    {
        Log::info('Received data for createOrUpdateUserAnswer:', $data);

        if (!isset($data['task_id']) && !isset($data['test_id'])) {
            throw new \Exception('Neither task_id nor test_id is provided.');
        }

        $question = null;

        if (isset($data['task_id'])) {
            $question = Task::where('id', $data['task_id'])->value('question');
        } elseif (isset($data['test_id'])) {
            $question = Test::where('id', $data['test_id'])->value('question');
        }

        if (!$question) {
            throw new \Exception('Question not found for the given task_id or test_id');
        }

        $isCorrect = $this->checkIsCorrectWithOpenAI($question, $data['answer']);
        $data['is_correct'] = $isCorrect;

        $existingAnswer = UserAnswers::where('user_id', $data['user_id'])
            ->when(isset($data['task_id']), function ($query) use ($data) {
                return $query->where('task_id', $data['task_id']);
            })
            ->when(isset($data['test_id']), function ($query) use ($data) {
                return $query->where('test_id', $data['test_id']);
            })
            ->first();

        if ($existingAnswer) {
            $existingAnswer->update($data);
            $userAnswer = $existingAnswer; // Store the updated answer
        } else {
            $userAnswer = UserAnswers::create($data); // Create new answer
        }

        return $userAnswer;
    }

    public function updateUserAnswer($id, array $data)
    {
        $userAnswer = UserAnswers::findOrFail($id);
        $userAnswer->update($data);

        return $userAnswer;
    }

    private function checkIsCorrectWithOpenAI(string $question, string $answer)
    {
        $apiKey = env('OPENAI_API_KEY');

        // Make a request to OpenAI's API for chat completions
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json'
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo', // You can use gpt-4 or another model if desired
                'messages' => [
                    ['role' => 'system', 'content' => 'You are an AI that checks answers.'],
                    ['role' => 'user', 'content' => "Question: $question\nAnswer: $answer\nIs the answer correct? only Yes or No"]
                ],
                'temperature' => 0.7,
                'max_tokens' => 10
            ]);

            if ($response->successful()) {
                $result = $response->json();

                Log::info('OpenAI Response:', $result);

                return strtolower(trim($result['choices'][0]['message']['content'])) == 'yes';
                Log::info(strtolower(trim($result['choices'][0]['message']['content'])));
            } else {
                Log::error('OpenAI Error:', $response->json());
                return false;
            }
        } catch (\Exception $e) {
            Log::error('OpenAI Exception:', ['message' => $e->getMessage()]);
            return false;
        }
    }
}

