<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return Inertia::render('Users', [
            'users' => $users
        ]);
    }

    public function show($id) {
        $user = User::find($id);

        return Inertia::render('User', [
            'user' => $user,
        ]);
    }
}
