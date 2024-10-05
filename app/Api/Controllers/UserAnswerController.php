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
        $data = $request->validated();

        $userAnswer = $this->userAnswerService->createOrUpdateUserAnswer($data);

        return response()->json($userAnswer, 201);
    }
}
