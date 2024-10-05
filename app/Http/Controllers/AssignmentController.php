<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\UserAnswers;
use App\Services\UserAnswerService;
use Illuminate\Support\Facades\Auth;

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

        $assignment = Assignment::find($id);

        $existingAnswers = UserAnswers::where('user_id', $user->id)
            ->where(function ($query) use ($assignment) {
                $query->whereIn('task_id', $assignment->task->pluck('id'))
                    ->orWhereIn('test_id', $assignment->test->pluck('id'));
            })
            ->exists();

        if ($existingAnswers) {
            return redirect()->back()->with('messages', ['You have already submitted your answers.']);
        }

        $answers = $request->input('answers');
        $correctCount = 0;
        $totalQuestions = count($answers);

        foreach ($answers as $answer) {
            $userAnswer = $this->userAnswerService->createOrUpdateUserAnswer([
                'user_id' => $user->id,
                'assignment_id' => $assignment->id,
                'test_id' => $answer['question_id'], // Ensure your answer contains question_id
                'answer' => $answer['selected_answer'], // The answer the user selected
            ]);

            if ($userAnswer->is_correct) {
                $correctCount++;
            }
        }

        if ($totalQuestions > 0) {
            $ratingMultiplier = $correctCount / $totalQuestions;
            $user->rating += $user->rating * $ratingMultiplier;
            $user->save();
        }

        // Redirect back with success message and results
        return redirect()->back()->with([
            'messages' => [
                'Answers submitted successfully.',
                'correct_answers' => $correctCount,
                'total_questions' => $totalQuestions,
                'updated_rating' => $user->rating,
            ]
        ]);
    }
}

