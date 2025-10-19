<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3002');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
header('Access-Control-Allow-Credentials: true');

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
            'category_id' => 1,
            'reference' => 'ARDUINO-UNO-001'
        ],
        [
            'id' => 2,
            'name' => 'Capteur DS18B20',
            'description' => 'Capteur de température numérique précis',
            'price' => 3500,
            'is_active' => true,
            'stock' => 42,
            'category_id' => 1,
            'reference' => 'DS18B20-001'
        ],
        [
            'id' => 3,
            'name' => 'Raspberry Pi 4',
            'description' => 'Mini-ordinateur polyvalent pour projets IoT',
            'price' => 150000,
            'is_active' => true,
            'stock' => 6,
            'category_id' => 1,
            'reference' => 'RPI4-001'
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
} elseif (strpos($path, '/api/auth/login') !== false && $method === 'POST') {
    // Endpoint de connexion admin
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['email']) && isset($input['password'])) {
        // Identifiants administrateur
        if ($input['email'] === 'admin@citil.com' && $input['password'] === 'admin123') {
            $response = [
                'success' => true,
                'message' => 'Connexion réussie',
                'user' => [
                    'id' => 1,
                    'name' => 'Administrateur CITIL',
                    'email' => 'admin@citil.com',
                    'role' => 'admin',
                    'avatar' => null
                ],
                'token' => 'mock_admin_token_' . time()
            ];
            echo json_encode($response);
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Identifiants incorrects'
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email et mot de passe requis'
        ]);
    }
} elseif (strpos($path, '/api/auth/me') !== false && $method === 'GET') {
    // Endpoint pour récupérer les infos de l'utilisateur connecté
    $response = [
        'success' => true,
        'user' => [
            'id' => 1,
            'name' => 'Administrateur CITIL',
            'email' => 'admin@citil.com',
            'role' => 'admin',
            'avatar' => null
        ]
    ];
    echo json_encode($response);
} elseif (strpos($path, '/api/admin/users') !== false && $method === 'GET') {
    // Endpoint pour récupérer les utilisateurs (admin)
    $data = [
        [
            'id' => 1,
            'name' => 'Administrateur CITIL',
            'email' => 'admin@citil.com',
            'role' => 'admin',
            'created_at' => '2025-01-01'
        ],
        [
            'id' => 2,
            'name' => 'Client Test',
            'email' => 'client@test.com',
            'role' => 'client',
            'created_at' => '2025-01-15'
        ]
    ];
    echo json_encode($data);
} elseif (strpos($path, '/api/admin/internship-applications') !== false && $method === 'GET') {
    // Endpoint pour récupérer les candidatures (admin)
    $data = [
        [
            'id' => 1,
            'full_name' => 'Kodjo A.',
            'email' => 'kodjo@exemple.com',
            'phone' => '+228 90 00 00 00',
            'message' => 'Passionné par l\'IoT',
            'status' => 'En attente',
            'created_at' => '2025-01-10'
        ],
        [
            'id' => 2,
            'full_name' => 'Aicha B.',
            'email' => 'aicha@exemple.com',
            'phone' => '+228 91 11 22 33',
            'message' => 'Développeuse web',
            'status' => 'Validé',
            'created_at' => '2025-01-12'
        ]
    ];
    echo json_encode($data);
} elseif (strpos($path, '/api/admin/products') !== false && $method === 'POST') {
    // Endpoint pour créer un produit (admin)
    $input = json_decode(file_get_contents('php://input'), true);
    $response = [
        'success' => true,
        'message' => 'Produit créé avec succès',
        'product' => [
            'id' => rand(100, 999),
            'name' => $input['name'],
            'description' => $input['description'],
            'price' => $input['price'],
            'stock' => $input['stock'],
            'is_active' => $input['is_active'] ?? true,
            'category_id' => $input['category_id'] ?? 1,
            'reference' => $input['reference'] ?? 'REF-' . rand(1000, 9999)
        ]
    ];
    echo json_encode($response);
} elseif (strpos($path, '/api/admin/trainings') !== false && $method === 'POST') {
    // Endpoint pour créer une formation (admin)
    $input = json_decode(file_get_contents('php://input'), true);
    $response = [
        'success' => true,
        'message' => 'Formation créée avec succès',
        'training' => [
            'id' => rand(100, 999),
            'title' => $input['title'],
            'description' => $input['description'],
            'price' => $input['price'],
            'duration_hours' => $input['duration_hours'] ?? 8,
            'start_date' => $input['start_date'] ?? date('Y-m-d'),
            'schedule' => $input['schedule'] ?? '9h-17h',
            'is_active' => $input['is_active'] ?? true
        ]
    ];
    echo json_encode($response);
} elseif (strpos($path, '/api/admin/categories') !== false && $method === 'POST') {
    // Endpoint pour créer une catégorie (admin)
    $input = json_decode(file_get_contents('php://input'), true);
    $response = [
        'success' => true,
        'message' => 'Catégorie créée avec succès',
        'category' => [
            'id' => rand(100, 999),
            'name' => $input['name'],
            'slug' => strtolower(str_replace(' ', '-', $input['name'])),
            'description' => $input['description'] ?? ''
        ]
    ];
    echo json_encode($response);
} elseif (strpos($path, '/api/admin/blog-posts') !== false && $method === 'POST') {
    // Endpoint pour créer un article de blog (admin)
    $input = json_decode(file_get_contents('php://input'), true);
    $response = [
        'success' => true,
        'message' => 'Article créé avec succès',
        'post' => [
            'id' => rand(100, 999),
            'title' => $input['title'],
            'excerpt' => $input['excerpt'],
            'content' => $input['content'],
            'author' => $input['author'] ?? 'Admin',
            'published' => $input['published'] ?? false,
            'image' => $input['image'] ?? '/assets/images/hero-banner.jpg',
            'blog_category_id' => $input['blog_category_id'],
            'created_at' => date('Y-m-d H:i:s')
        ]
    ];
    echo json_encode($response);
} elseif (strpos($path, '/api/admin/blog-categories') !== false && $method === 'POST') {
    // Endpoint pour créer une catégorie de blog (admin)
    $input = json_decode(file_get_contents('php://input'), true);
    $response = [
        'success' => true,
        'message' => 'Catégorie de blog créée avec succès',
        'category' => [
            'id' => rand(100, 999),
            'name' => $input['name'],
            'slug' => strtolower(str_replace(' ', '-', $input['name'])),
            'description' => $input['description'] ?? ''
        ]
    ];
    echo json_encode($response);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
