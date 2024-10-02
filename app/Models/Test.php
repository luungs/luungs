<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    public function userAnswers()
    {
        return $this->hasMany(UserAnswers::class); // Assuming UserAnswer model exists
    }
}
