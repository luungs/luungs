<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignmentController extends Controller
{
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
}

