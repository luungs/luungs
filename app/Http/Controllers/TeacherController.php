<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Test;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TeacherController extends Controller
{
    public function index() {
        Log::info('Teacher dashboard accessed.');
        return Inertia::render('Teacher/Dashboard');
    }

    public function assignments() {
        $assignments = Assignment::all();
        Log::info('Teacher assignments accessed.', ['assignments_count' => $assignments->count()]);

        return Inertia::render('Teacher/Tasks', [
            'assignments' => $assignments,
        ]);
    }

    public function createAssignment() {
        Log::info('Create assignment page accessed.');
        return Inertia::render('Teacher/CreateAssignment');
    }
    public function storeAssignment(Request $request) {
    try {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'rating' => 'required|integer',
            'type' => 'required|string',
            'tests' => 'nullable|array',
            'tests.*.question' => 'required|string',
            'tests.*.a' => 'required|string',
            'tests.*.b' => 'required|string',
            'tests.*.c' => 'required|string',
            'tests.*.d' => 'required|string',
            'tests.*.correct_answer' => 'required|string',
            'tasks' => 'nullable|array',
            'tasks.*.question' => 'required|string',
        ]);

        // Create the assignment
        $assignment = Assignment::create($request->only('title', 'description', 'rating', 'type'));

        // Store tests
        if (!empty($request->tests)) {
            foreach ($request->tests as $testData) {
                Test::create([
                    'assignment_id' => $assignment->id,
                    'question' => $testData['question'],
                    'a' => $testData['a'],
                    'b' => $testData['b'],
                    'c' => $testData['c'],
                    'd' => $testData['d'],
                    'correct_answer' => $testData['correct_answer'],
                ]);
            }
        }

        // Store tasks
        if (!empty($request->tasks)) {
            foreach ($request->tasks as $taskData) {
                Task::create([
                    'assignment_id' => $assignment->id,
                    'question' => $taskData['question'],
                ]);
            }
        }

        Log::info('Assignment created successfully.', ['assignment_id' => $assignment->id]);

        return redirect('/')->with('success', 'Assignment created successfully.');
    } catch (\Exception $e) {
        Log::error('Failed to create assignment.', [
            'error' => $e->getMessage(),
            'request_data' => $request->all(),
        ]);
        return redirect()->route('teacher.create-assignment')->withErrors(['error' => 'Failed to create assignment.']);
    }
}

}

