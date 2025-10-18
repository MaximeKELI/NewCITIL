<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Arduino',
                'slug' => 'arduino',
                'description' => 'Cartes Arduino et accessoires',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Capteurs',
                'slug' => 'capteurs',
                'description' => 'Capteurs pour projets IoT',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kits',
                'slug' => 'kits',
                'description' => 'Kits éducatifs et de démarrage',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Plaques solaires',
                'slug' => 'plaques-solaires',
                'description' => 'Solutions solaires',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cartes & MCU',
                'slug' => 'cartes-mcu',
                'description' => 'Microcontrôleurs et cartes de développement',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Modules',
                'slug' => 'modules',
                'description' => 'Modules électroniques',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}