<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAnswerRequest extends FormRequest
{
    public function authorize()
    {
        return true;  // Allow all users to submit this request (you can add additional checks here)
    }

    public function rules()
    {
        return [
            'user_id' => 'required',
            'task_id' => 'nullable|exists:tasks,id',
            'test_id' => 'nullable|exists:tests,id',
            'answer' => 'required|string|max:255',
        ];
    }
}

