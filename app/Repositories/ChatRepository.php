<?php

namespace App\Repositories;

use App\Models\Chat;

class ChatRepository
{
    public function create(array $data)
    {
        return Chat::create($data);
    }

    public function findByUserId($userId)
    {
        return Chat::where('user_id', $userId)->get();
    }
}
