<?php

namespace App\Services;

use App\Models\UserAnswers;
use App\Models\Task; // Assuming you have a Task model
use App\Models\Test; // Assuming you have a Test model
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

        $this->updateUserRatingIfAllCorrect($userAnswer->user_id, $data['task_id'], $data['test_id']);

        Log::info($userAnswer);
        return $userAnswer;
    }

    private function updateUserRatingIfAllCorrect($userId, $taskId = null, $testId = null)
    {
        // Fetch all user answers for the specific task or test
        $userAnswers = UserAnswers::where('user_id', $userId)
            ->when($taskId, function ($query) use ($taskId) {
                return $query->where('task_id', $taskId);
            })
            ->when($testId, function ($query) use ($testId) {
                return $query->where('test_id', $testId);
            })
            ->get();

        // Check if all answers are correct
        $allCorrect = $userAnswers->every(function ($answer) {
            return $answer->is_correct; // Check is_correct flag
        });

        Log::info("User $userId answers checked. All correct: " . ($allCorrect ? 'Yes' : 'No'));

        if ($allCorrect) {
            // Get the assignment_id from the task or test
            $assignmentId = null;

            if ($taskId) {
                $assignmentId = Task::where('id', $taskId)->value('assignment_id');
            } elseif ($testId) {
                $assignmentId = Test::where('id', $testId)->value('assignment_id');
            }

            if ($assignmentId) {
                // Fetch the assignment rating
                $assignmentRating = Assignment::find($assignmentId)->rating;

                // Update user's rating
                $user = User::find($userId);
                $user->rating += $assignmentRating;
                $user->save();

                Log::info("User $userId rating updated by $assignmentRating.");
            } else {
                Log::warning("No assignment_id found for User $userId, Task ID: $taskId, Test ID: $testId.");
            }
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

