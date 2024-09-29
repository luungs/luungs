<?php

namespace App\Api\Controllers;

use App\Http\Requests\UserAnswerRequest;
use App\Services\UserAnswerService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class UserAnswerController extends Controller
{
    protected $userAnswerService;

    public function __construct(UserAnswerService $userAnswerService)
    {
        $this->userAnswerService = $userAnswerService;
    }

    public function store(UserAnswerRequest $request): JsonResponse
    {
        $userId = auth()->id();  // Get the logged-in user's ID

        $data = $request->validated();
        $data['user_id'] = $userId;  // Assign the current user's ID to the answer

        // Handle creation or updating if the answer already exists for the user and task_id/test_id
        $userAnswer = $this->userAnswerService->createOrUpdateUserAnswer($data);

        return response()->json($userAnswer, 201);
    }
}
