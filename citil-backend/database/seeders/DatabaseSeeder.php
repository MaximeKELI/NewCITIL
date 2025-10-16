<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seul l'admin est créé - toutes les autres données sont gérées par l'admin
        $this->call([
            AdminUserSeeder::class,
        ]);
    }
}
