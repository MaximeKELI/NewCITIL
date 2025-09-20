<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Crée les catégories avec slug
        $arduino = Category::firstOrCreate(
            ['name' => 'Arduino'],
            ['slug' => 'arduino']
        );

        $capteurs = Category::firstOrCreate(
            ['name' => 'Capteurs'],
            ['slug' => 'capteurs']
        );

        $kits = Category::firstOrCreate(
            ['name' => 'Kits'],
            ['slug' => 'kits']
        );

        // Liste des produits
        $products = [
            [
                'name' => 'Arduino Uno R3',
                'description' => 'Microcontrôleur idéal pour les débutants.',
                'price' => 8000,
                'stock' => 25,
                'image' => 'images/arduino-uno.jpg',
                'reference' => 'ARDUINO-UNO-R3',
                'category_id' => $arduino->id,
            ],
            [
                'name' => 'Capteur DS18B20',
                'description' => 'Capteur de température numérique.',
                'price' => 1500,
                'stock' => 50,
                'image' => 'images/ds18b20.jpg',
                'reference' => 'DS18B20',
                'category_id' => $capteurs->id,
            ],
            [
                'name' => 'Kit Robot Éducatif',
                'description' => 'Kit complet pour apprendre la robotique.',
                'price' => 25000,
                'stock' => 10,
                'image' => 'images/kit-robot.jpg',
                'reference' => 'KIT-ROBOT-JR',
                'category_id' => $kits->id,
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}