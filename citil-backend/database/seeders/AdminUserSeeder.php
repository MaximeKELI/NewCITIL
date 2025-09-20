<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin CITIL',
            'email' => 'admin@citil.tg',
            'password' => Hash::make('password'), // Le mot de passe sera haché
            'role' => 'admin',
            'phone' => '98000000'
        ]);
    }
}