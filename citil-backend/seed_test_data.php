<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Category;
use App\Models\Product;
use App\Models\Training;

// Créer une catégorie si elle n'existe pas
$category = Category::first();
if (!$category) {
    $category = Category::create([
        'name' => 'Électronique',
        'slug' => 'electronique',
        'description' => 'Composants électroniques'
    ]);
    echo "Catégorie créée: {$category->name}\n";
} else {
    echo "Catégorie existante: {$category->name}\n";
}

// Créer des produits de test
$products = [
    [
        'name' => 'Arduino Uno R3',
        'description' => 'Carte de prototypage idéale pour apprendre l\'électronique',
        'price' => 12000,
        'stock' => 15,
        'reference' => 'ARDUINO-UNO-001',
        'category_id' => $category->id,
        'is_active' => true
    ],
    [
        'name' => 'Capteur DS18B20',
        'description' => 'Capteur de température numérique précis',
        'price' => 3500,
        'stock' => 42,
        'reference' => 'DS18B20-001',
        'category_id' => $category->id,
        'is_active' => true
    ]
];

foreach ($products as $productData) {
    $existingProduct = Product::where('reference', $productData['reference'])->first();
    if (!$existingProduct) {
        $product = Product::create($productData);
        echo "Produit créé: {$product->name}\n";
    } else {
        echo "Produit existant: {$existingProduct->name}\n";
    }
}

// Créer des formations de test
$trainings = [
    [
        'title' => 'Formation Arduino Débutant',
        'description' => 'Apprenez les bases de l\'Arduino',
        'price' => 25000,
        'duration_hours' => 16,
        'start_date' => '2025-11-01',
        'schedule' => '2025-11-01',
        'is_active' => true
    ],
    [
        'title' => 'Formation IoT Avancé',
        'description' => 'Développement d\'applications IoT',
        'price' => 45000,
        'duration_hours' => 24,
        'start_date' => '2025-11-15',
        'schedule' => '2025-11-15',
        'is_active' => true
    ]
];

foreach ($trainings as $trainingData) {
    $existingTraining = Training::where('title', $trainingData['title'])->first();
    if (!$existingTraining) {
        $training = Training::create($trainingData);
        echo "Formation créée: {$training->title}\n";
    } else {
        echo "Formation existante: {$existingTraining->title}\n";
    }
}

echo "\nDonnées de test ajoutées avec succès!\n";
echo "Produits: " . Product::count() . "\n";
echo "Formations: " . Training::count() . "\n";
echo "Catégories: " . Category::count() . "\n";
