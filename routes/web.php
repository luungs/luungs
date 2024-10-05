<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TeacherAuthController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PageController::class, 'index']);
Route::get('/assignment/{id}', [AssignmentController::class, 'show']);
Route::get('/assignment', [AssignmentController::class, 'index']);

Route::get('/user', [UserController::class, 'index']);

Route::get('/chat', [ChatController::class, 'index']);
Route::post('/chat/send', [ChatController::class, 'send'])->name('chat.send');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::post('/register', [AuthController::class, 'register']);

Route::get('/teacher/', [TeacherController::class, 'index']);
Route::get('/teacher/create-assignment', [TeacherController::class, 'createAssignment'])->name('teacher.create-assignment');
Route::post('/teacher/store-assignment', [TeacherController::class, 'storeAssignment'])->name('teacher.store-assignment');
Route::get('/teacher/tasks', [TeacherController::class, 'assignments']);
Route::get('/teacher/register', [TeacherAuthController::class, 'create'])->name('teacher.register');
Route::post('/teacher/register', [TeacherAuthController::class, 'store']);
Route::get('/teacher/login', [TeacherAuthController::class, 'loginForm'])->name('teacher.login');
Route::post('/teacher/login', [TeacherAuthController::class, 'login']);
Route::post('/teacher/logout', [TeacherAuthController::class, 'logout'])->name('teacher.logout');

Route::post('/assignments/{id}/submit-answers', [AssignmentController::class, 'submitAnswers']);
