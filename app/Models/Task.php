<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [ 'question', 'assignment_id' ];

    public function userAnswers()
    {
        return $this->hasMany(UserAnswers::class); // Assuming UserAnswer model exists
    }
}
