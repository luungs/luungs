<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\UserAnswers;
use App\Services\UserAnswerService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AssignmentController extends Controller
{

    protected $userAnswerService;

    public function __construct(UserAnswerService $userAnswerService)
    {
        $this->userAnswerService = $userAnswerService;
    }

    public function index() {
        $assignments = Assignment::all();
        return Inertia::render('Assignments', [
            'assignments' => $assignments
        ]);
    }

    public function show($id) {
        $assignment = Assignment::where('id', $id)->with('test', 'task')->first();
        return Inertia::render('Assignment', [
            'assignment' => $assignment
        ]);
    }

    public function submitAnswers(Request $request, $id)
    {
        $user = Auth::user();
        Log::info('User ID: ' . $user->id . ' is submitting answers for assignment ID: ' . $id);

        $assignment = Assignment::find($id);
        if (!$assignment) {
            Log::error('Assignment not found for ID: ' . $id);
            return redirect()->back()->with('message', 'Assignment not found.');
        }

        $existingAnswers = UserAnswers::where('user_id', $user->id)
            ->where(function ($query) use ($assignment) {
                $query->whereIn('task_id', $assignment->task->pluck('id'))
                    ->orWhereIn('test_id', $assignment->test->pluck('id'));
            })
            ->exists();

        if ($existingAnswers) {
            Log::warning('User ID: ' . $user->id . ' has already submitted answers for assignment ID: ' . $id);
            return redirect()->back()->with('message', 'You have already submitted your answers.');
        }

        $answers = $request->input('answers');
        Log::info('Received answers: ', $answers);

        $correctCount = 0;
        $totalQuestions = count($answers);

        foreach ($answers as $answer) {
            $userAnswer = $this->userAnswerService->createOrUpdateUserAnswer([
                'user_id' => $user->id,
                'assignment_id' => $assignment->id,
                'test_id' => $answer['question_id'],
                'answer' => $answer['selected_answer'],
            ]);

            if ($userAnswer->is_correct) {
                $correctCount++;
                Log::info('Correct answer found for question ID: ' . $answer['question_id']);
            } else {
                Log::info('Incorrect answer for question ID: ' . $answer['question_id']);
            }
        }

        Log::info('Total Questions: ' . $totalQuestions . ', Correct Answers: ' . $correctCount);

        if ($totalQuestions > 0) {
            $ratingMultiplier = $correctCount / $totalQuestions;
            Log::info('Rating before update: ' . $user->rating);

            $user->rating += $assignment->rating * $ratingMultiplier;
            $user->save();

            Log::info('Rating after update: ' . $user->rating);
        }

        // Redirect back with success message and results
        return redirect()->back()->with([
            'message' => 'Answers submitted successfully.',
            'correct_answers' => $correctCount,
            'total_questions' => $totalQuestions,
            'updated_rating' => $user->rating,
        ]);
    }

}

