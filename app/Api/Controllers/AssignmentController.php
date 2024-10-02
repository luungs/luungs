<?php

namespace App\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AssignmentService;
use Illuminate\Http\JsonResponse;

class AssignmentController extends Controller
{
    protected $assignmentService;

    public function __construct(AssignmentService $assignmentService)
    {
        $this->assignmentService = $assignmentService;
    }

    public function index(): JsonResponse
    {
        $assignments = $this->assignmentService->getAllAssignments();
        return response()->json($assignments);
    }

    public function show($id, $user_id): JsonResponse
    {
        $assignment = $this->assignmentService->getAssignmentById($id, $user_id);
        return response()->json($assignment);
    }

    public function destroy($id): JsonResponse
    {
        $this->assignmentService->deleteAssignment($id);
        return response()->json(['message' => 'Assignment deleted successfully']);
    }
}

