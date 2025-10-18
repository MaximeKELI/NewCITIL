<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$path = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Simuler les endpoints API
if (strpos($path, '/api/trainings') !== false && $method === 'GET') {
    $data = [
        [
            'id' => 1,
            'title' => 'Formation Arduino Débutant',
            'description' => 'Apprenez les bases de l\'Arduino',
            'price' => 25000,
            'is_active' => true,
            'duration_hours' => 16,
            'start_date' => '2025-11-01',
            'schedule' => '2025-11-01'
        ],
        [
            'id' => 2,
            'title' => 'Formation IoT Avancé',
            'description' => 'Développement d\'applications IoT',
            'price' => 45000,
            'is_active' => true,
            'duration_hours' => 24,
            'start_date' => '2025-11-15',
            'schedule' => '2025-11-15'
        ]
    ];
    echo json_encode($data);
} elseif (strpos($path, '/api/products') !== false && $method === 'GET') {
    $data = [
        [
            'id' => 1,
            'name' => 'Arduino Uno R3',
            'description' => 'Carte de prototypage idéale pour apprendre l\'électronique',
            'price' => 12000,
            'is_active' => true,
            'stock' => 15,
            'category_id' => 1
        ],
        [
            'id' => 2,
            'name' => 'Capteur DS18B20',
            'description' => 'Capteur de température numérique précis',
            'price' => 3500,
            'is_active' => true,
            'stock' => 42,
            'category_id' => 2
        ]
    ];
    echo json_encode($data);
} elseif (strpos($path, '/api/blog-posts') !== false && $method === 'GET') {
    $data = [
        [
            'id' => 1,
            'title' => 'Démarrer en électronique',
            'excerpt' => 'Les bases pour débuter en électronique...',
            'content' => 'Contenu complet de l\'article...',
            'published' => true,
            'image' => '/assets/images/hero-banner.jpg'
        ],
        [
            'id' => 2,
            'title' => 'IoT au Togo: opportunités',
            'excerpt' => 'Pourquoi l\'IoT est une chance...',
            'content' => 'Contenu complet de l\'article...',
            'published' => true,
            'image' => '/assets/images/hero-banner.jpg'
        ]
    ];
    echo json_encode($data);
} elseif (strpos($path, '/api/blog-categories') !== false && $method === 'GET') {
    $data = [
        [
            'id' => 1,
            'name' => 'Actualités',
            'slug' => 'actualites'
        ],
        [
            'id' => 2,
            'name' => 'Tutoriels',
            'slug' => 'tutoriels'
        ]
    ];
    echo json_encode($data);
} elseif (strpos($path, '/api/categories') !== false && $method === 'GET') {
    $data = [
        [
            'id' => 1,
            'name' => 'Arduino',
            'slug' => 'arduino',
            'description' => 'Cartes Arduino et accessoires'
        ],
        [
            'id' => 2,
            'name' => 'Capteurs',
            'slug' => 'capteurs',
            'description' => 'Capteurs pour projets IoT'
        ]
    ];
    echo json_encode($data);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
