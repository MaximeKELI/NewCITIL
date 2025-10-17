<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer des catégories si elles n'existent pas
        $categories = [
            ['name' => 'Arduino', 'slug' => 'arduino', 'description' => 'Cartes Arduino et accessoires'],
            ['name' => 'Capteurs', 'slug' => 'capteurs', 'description' => 'Capteurs pour projets IoT'],
            ['name' => 'Kits', 'slug' => 'kits', 'description' => 'Kits éducatifs et de démarrage'],
            ['name' => 'Plaques solaires', 'slug' => 'plaques-solaires', 'description' => 'Solutions solaires'],
        ];

        foreach ($categories as $categoryData) {
            Category::firstOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );
        }

        // Créer des produits de test
        $products = [
            [
                'name' => 'Arduino Uno R3',
                'description' => 'Carte de prototypage idéale pour apprendre l\'électronique et la programmation.',
                'price' => 12000,
                'stock' => 15,
                'image' => '/assets/images/arduino_uno.jpg',
                'reference' => 'ARDUINO-UNO-R3',
                'category_id' => Category::where('slug', 'arduino')->first()->id,
            ],
            [
                'name' => 'Capteur DS18B20',
                'description' => 'Capteur de température numérique précis pour projets IoT.',
                'price' => 3500,
                'stock' => 42,
                'image' => '/assets/images/capteur_ds18b20.jpg',
                'reference' => 'DS18B20-TEMP',
                'category_id' => Category::where('slug', 'capteurs')->first()->id,
            ],
            [
                'name' => 'Kit Robot Éducatif',
                'description' => 'Kit complet pour découvrir la robotique avec des ateliers pratiques.',
                'price' => 65000,
                'stock' => 8,
                'image' => '/assets/images/kit_robot_educatif.jpg',
                'reference' => 'KIT-ROBOT-EDU',
                'category_id' => Category::where('slug', 'kits')->first()->id,
            ],
            [
                'name' => 'Panneau Solaire 100W',
                'description' => 'Panneau solaire monocristallin 100W pour installations domestiques.',
                'price' => 120000,
                'stock' => 20,
                'image' => '/assets/images/panneau_solaire.jpg',
                'reference' => 'SOLAR-100W',
                'category_id' => Category::where('slug', 'plaques-solaires')->first()->id,
            ],
            [
                'name' => 'Batterie 12V 20Ah',
                'description' => 'Batterie AGM 12V 20Ah pour systèmes solaires.',
                'price' => 90000,
                'stock' => 12,
                'image' => '/assets/images/batterie_12v.jpg',
                'reference' => 'BAT-12V-20AH',
                'category_id' => Category::where('slug', 'plaques-solaires')->first()->id,
            ],
            [
                'name' => 'Raspberry Pi 4 (4GB)',
                'description' => 'Mini-ordinateur polyvalent pour projets IoT et IA.',
                'price' => 150000,
                'stock' => 6,
                'image' => '/assets/images/raspberry_pi.jpg',
                'reference' => 'RPI4-4GB',
                'category_id' => Category::where('slug', 'kits')->first()->id,
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}
