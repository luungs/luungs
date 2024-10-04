<?php

namespace App\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return response()->json($this->userService->getAllUsers());
    }

    public function show($id)
    {
        return response()->json($this->userService->getUserById($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        return response()->json($this->userService->createUser($data), 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,'.$id,
            'password' => 'string|min:6',
            'music_taste' => 'string|nullable',
            'movie_taste' => 'string|nullable',
            'university' => 'string|nullable',
            'grade' => 'string|nullable',
        ]);

        return response()->json($this->userService->updateUser($id, $data));
    }

    public function destroy($id)
    {
        $this->userService->deleteUser($id);
        return response()->json(null, 204);
    }
}

