<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class TeacherAuthController extends Controller
{
    // Show the teacher registration form
    public function create()
    {
        return Inertia::render('Teacher/Register');
    }

    // Handle teacher registration
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:teachers',
            'password' => 'required|string|min:8|confirmed',
            'university' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Teacher::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'university' => $request->university,
        ]);

        return redirect()->route('teacher.login')->with('success', 'Registration successful! You can now login.');
    }

    // Show the teacher login form
    public function loginForm()
    {
        return Inertia::render('Teacher/Login');
    }

    // Handle teacher login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->guard('teacher')->attempt($credentials)) {
            return redirect()->route('teacher.dashboard');
        }

        return back()->withErrors(['email' => 'Invalid credentials'])->withInput();
    }

    // Handle logout
    public function logout()
    {
        auth()->guard('teacher')->logout();
        return redirect()->route('teacher.login');
    }
}

