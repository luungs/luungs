<?php

namespace App\Repositories;

use App\Models\Assignment;

class AssignmentRepository
{
    public function all()
    {
        return Assignment::all();
    }

    public function findById($id)
    {
        if(auth()->id()){
        return Assignment::where('id', $id)
            ->with([
                'test' => function($query) {
                    $query->with(['userAnswers' => function ($subQuery) {
                        $subQuery->select('id as user_answer_id', 'test_id', 'is_correct', 'user_id')
                            ->where('user_id', auth()->id());
                    }]);
                },
                'task' => function($query) {
                    $query->with(['userAnswers' => function ($subQuery) {
                        $subQuery->select('id as user_answer_id', 'task_id', 'is_correct', 'user_id')
                            ->where('user_id', auth()->id());
                    }]);
                }
            ])
            ->first();
        } else {
            return Assignment::where('id', $id)->with('test', 'task')->first();
        }
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

