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

        // Ensure that at least one of task_id or test_id is present
        if (!isset($data['task_id']) && !isset($data['test_id'])) {
            throw new \Exception('Neither task_id nor test_id is provided.');
        }

        // Retrieve question based on task_id or test_id
        $question = null;

        if (isset($data['task_id'])) {
            $question = Task::where('id', $data['task_id'])->value('question');
        } elseif (isset($data['test_id'])) {
            $question = Test::where('id', $data['test_id'])->value('question');
        }

        // If no question is found, handle it appropriately
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

        $this->updateUserRatingIfAllCorrect($userAnswer->user_id, $data['task_id'] ?? null, $data['test_id'] ?? null);

        return $userAnswer;
    }

    private function updateUserRatingIfAllCorrect($userId, $taskId = null, $testId = null)
    {
        // Determine the assignment ID based on the provided taskId or testId
        $assignmentId = null;

        if ($taskId) {
            $assignmentId = Task::where('id', $taskId)->value('assignment_id');
        } elseif ($testId) {
            $assignmentId = Test::where('id', $testId)->value('assignment_id');
        }

        if (!$assignmentId) {
            Log::warning("No assignment_id found for User $userId, Task ID: $taskId, Test ID: $testId.");
            return; // Exit if no assignment ID is found
        }

        // Fetch all user answers for the specific assignment
        $userAnswers = UserAnswers::where('user_id', $userId)
            ->where(function ($query) use ($assignmentId) {
                // Get all tasks and tests related to the assignment
                $taskIds = Task::where('assignment_id', $assignmentId)->pluck('id');
                $testIds = Test::where('assignment_id', $assignmentId)->pluck('id');

                return $query->whereIn('task_id', $taskIds)
                             ->orWhereIn('test_id', $testIds);
            })
            ->get();

        // Check if all answers are correct
        $allCorrect = $userAnswers->every(function ($answer) {
            return $answer->is_correct; // Check is_correct flag
        });

        Log::info("User $userId answers for Assignment $assignmentId checked. All correct: " . ($allCorrect ? 'Yes' : 'No'));

        if ($allCorrect) {
            // Fetch the assignment rating
            $assignmentRating = Assignment::find($assignmentId)->rating;

            // Update user's rating
            $user = User::find($userId);
            $user->rating += $assignmentRating;
            $user->save();

            Log::info("User $userId rating updated by $assignmentRating for Assignment $assignmentId.");
        }
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

