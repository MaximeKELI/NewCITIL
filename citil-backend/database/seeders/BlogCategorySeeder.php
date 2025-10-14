<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Actualités',
                'slug' => 'actualites',
            ],
            [
                'name' => 'Tutoriels',
                'slug' => 'tutoriels',
            ],
            [
                'name' => 'Études de cas',
                'slug' => 'etudes-de-cas',
            ],
            [
                'name' => 'Technologie',
                'slug' => 'technologie',
            ],
            [
                'name' => 'Formation',
                'slug' => 'formation',
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }
    }
}
