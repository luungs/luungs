<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function getAllUsers()
    {
        return $this->userRepo->all();
    }

    public function getUserById($id)
    {
        return $this->userRepo->find($id);
    }

    public function createUser(array $data)
    {
        return $this->userRepo->create($data);
    }

    public function updateUser($id, array $data)
    {
        return $this->userRepo->update($id, $data);
    }

    public function deleteUser($id)
    {
        return $this->userRepo->delete($id);
    }
}

