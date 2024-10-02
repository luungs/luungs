<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswers extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "task_id",
        "test_id",
        "is_correct",
        "answer",
    ];
}
