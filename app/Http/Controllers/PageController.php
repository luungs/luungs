<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index() {
        $assignments = Assignment::all();

        return Inertia::render('Welcome', [
            'assignments' => $assignments,
        ]);
    }
}
