<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return Inertia::render('Users', [
            'users' => $users
        ]);
    }

    public function register(Request $request) {
    }
}
