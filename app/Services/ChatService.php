<?php

namespace App\Services;

use App\Repositories\ChatRepository;

class ChatService
{
    protected $chatRepository;

    public function __construct(ChatRepository $chatRepository)
    {
        $this->chatRepository = $chatRepository;
    }

    public function createChat(array $data)
    {
        return $this->chatRepository->create($data);
    }

    public function getChatsByUserId($userId)
    {
        return $this->chatRepository->findByUserId($userId);
    }
}

