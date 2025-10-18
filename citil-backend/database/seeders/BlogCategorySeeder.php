<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogCategory;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Actualités',
                'slug' => 'actualites',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tutoriels',
                'slug' => 'tutoriels',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Projets',
                'slug' => 'projets',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Formation',
                'slug' => 'formation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}