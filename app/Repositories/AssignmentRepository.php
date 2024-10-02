<?php

namespace App\Repositories;

use App\Models\Assignment;

class AssignmentRepository
{
    public function all()
    {
        return Assignment::all();
    }

    public function findById($id, $user_id)
    {
        return Assignment::where('id', $id)
            ->with([
                'test' => function($query) use ($user_id) {
                    $query->with(['userAnswers' => function ($subQuery) use ($user_id) {
                        $subQuery->select('id as user_answer_id', 'test_id', 'is_correct', 'user_id', 'answer')
                            ->where('user_id', $user_id);
                    }]);
                },
                'task' => function($query) use ($user_id) {
                    $query->with(['userAnswers' => function ($subQuery) use ($user_id) {
                        $subQuery->select('id as user_answer_id', 'task_id', 'is_correct', 'user_id', 'answer')
                            ->where('user_id', $user_id);
                    }]);
                }
            ])
            ->first();
    }


    public function create(array $data)
    {
        return Assignment::create($data);
    }

    public function update($id, array $data)
    {
        $assignment = $this->findById($id);
        $assignment->update($data);
        return $assignment;
    }

    public function delete($id)
    {
        $assignment = $this->findById($id);
        return $assignment->delete();
    }
}

