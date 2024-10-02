<?php

namespace App\Services;

use App\Repositories\AssignmentRepository;

class AssignmentService
{
    protected $assignmentRepository;

    public function __construct(AssignmentRepository $assignmentRepository)
    {
        $this->assignmentRepository = $assignmentRepository;
    }

    public function getAllAssignments()
    {
        return $this->assignmentRepository->all();
    }

    public function getAssignmentById($id, $user_id)
    {
        return $this->assignmentRepository->findById($id, $user_id);
    }

    public function createAssignment(array $data)
    {
        return $this->assignmentRepository->create($data);
    }

    public function updateAssignment($id, array $data)
    {
        return $this->assignmentRepository->update($id, $data);
    }

    public function deleteAssignment($id)
    {
        return $this->assignmentRepository->delete($id);
    }
}

