<?php

namespace App\Services;

use App\Models\UserAnswers;

class UserAnswerService
{
    public function createUserAnswer(array $data)
    {
        return UserAnswers::create($data);
    }
    public function createOrUpdateUserAnswer(array $data)
    {
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
            return $existingAnswer;
        }

        return UserAnswers::create($data);
    }

    public function updateUserAnswer($id, array $data)
    {
        $userAnswer = UserAnswers::findOrFail($id);
        $userAnswer->update($data);

        return $userAnswer;
    }
}

