<?php

use App\Api\Controllers\AssignmentController;
use App\Api\Controllers\AuthController;
use App\Api\Controllers\ChatController;
use App\Api\Controllers\UserAnswerController;
use App\Api\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/asignments', [AssignmentController::class, 'index']);
Route::get('/asignments/{id}', [AssignmentController::class, 'show']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);

Route::post('/chat', [ChatController::class, 'store']);
Route::get('/chat', [ChatController::class, 'showByUserId']);

Route::post('/answer', [UserAnswerController::class, 'store']);
