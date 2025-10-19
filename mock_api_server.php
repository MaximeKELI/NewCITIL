<?php
/**
 * Serveur API Mock pour la soutenance
 * Solution de contournement stable
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request_uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Données mock pour la démonstration
$mock_data = [
    'categories' => [
        ['id' => 1, 'name' => 'Arduino', 'description' => 'Cartes Arduino et accessoires', 'slug' => 'arduino'],
        ['id' => 2, 'name' => 'Électronique', 'description' => 'Composants électroniques', 'slug' => 'electronique']
    ],
    'products' => [
        ['id' => 1, 'name' => 'Arduino Uno R3', 'description' => 'Carte Arduino Uno R3', 'price' => 15000, 'stock' => 10, 'category' => ['id' => 1, 'name' => 'Arduino'], 'image' => '/assets/images/hero-banner.jpg', 'reference' => 'REF-001'],
        ['id' => 2, 'name' => 'Capteur Ultrason HC-SR04', 'description' => 'Capteur de distance ultrason', 'price' => 2500, 'stock' => 25, 'category' => ['id' => 2, 'name' => 'Électronique'], 'image' => '/assets/images/hero-banner.jpg', 'reference' => 'REF-002'],
        ['id' => 3, 'name' => 'LED RGB', 'description' => 'LED RGB 5mm', 'price' => 500, 'stock' => 100, 'category' => ['id' => 2, 'name' => 'Électronique'], 'image' => '/assets/images/hero-banner.jpg', 'reference' => 'REF-003']
    ],
    'trainings' => [
        ['id' => 1, 'title' => 'Formation Arduino Débutant', 'description' => 'Apprenez les bases de l\'Arduino', 'price' => 50000, 'duration_hours' => 20, 'start_date' => '2025-12-01', 'schedule' => 'Lun-Ven 18h-20h', 'is_active' => true],
        ['id' => 2, 'title' => 'Formation Électronique Avancée', 'description' => 'Circuits complexes et microcontrôleurs', 'price' => 75000, 'duration_hours' => 30, 'start_date' => '2025-12-15', 'schedule' => 'Sam 9h-17h', 'is_active' => true]
    ],
    'blog_posts' => [
        ['id' => 1, 'title' => 'Introduction à l\'Arduino', 'excerpt' => 'Découvrez les bases de la programmation Arduino', 'content' => 'Contenu complet de l\'article...', 'author' => 'Admin', 'published' => true, 'created_at' => '2025-10-19'],
        ['id' => 2, 'title' => 'Projets Électroniques', 'excerpt' => 'Idées de projets pour débuter', 'content' => 'Contenu complet de l\'article...', 'author' => 'Admin', 'published' => false, 'created_at' => '2025-10-18']
    ],
    'users' => [
        ['id' => 1, 'name' => 'Admin', 'email' => 'admin@citil.com', 'role' => 'admin', 'phone' => '+225 07 12 34 56', 'created_at' => '2025-10-01'],
        ['id' => 2, 'name' => 'Jean Dupont', 'email' => 'jean@example.com', 'role' => 'client', 'phone' => '+225 07 98 76 54', 'created_at' => '2025-10-15']
    ]
];

// Fonction pour répondre avec les données
function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

// Fonction pour l'authentification
function authenticate() {
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? '';
    
    if (strpos($auth_header, 'Bearer ') === 0) {
        $token = substr($auth_header, 7);
        // Token valide pour la démonstration
        if (strlen($token) > 10) {
            return true;
        }
    }
    
    respond(['error' => 'Non autorisé'], 401);
}

// Router simple
switch ($request_uri) {
    case '/api/test':
        respond([
            'message' => 'API Mock fonctionne parfaitement',
            'timestamp' => date('c'),
            'status' => 'success'
        ]);
        
    case '/api/categories':
        respond($mock_data['categories']);
        
    case '/api/products':
        respond($mock_data['products']);
        
    case '/api/trainings':
        respond($mock_data['trainings']);
        
    case '/api/blog-posts':
        respond($mock_data['blog_posts']);
        
    case '/api/auth/login':
        if ($method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            if ($input['email'] === 'admin@citil.com' && $input['password'] === 'password') {
                respond([
                    'response_code' => 200,
                    'status' => 'success',
                    'message' => 'Connexion réussie !',
                    'user_info' => $mock_data['users'][0],
                    'token' => 'mock_token_' . time(),
                    'token_type' => 'Bearer'
                ]);
            } else {
                respond(['error' => 'Identifiants incorrects'], 401);
            }
        }
        respond(['error' => 'Méthode non autorisée'], 405);
        
    case '/api/auth/me':
        authenticate();
        respond([
            'response_code' => 200,
            'status' => 'success',
            'message' => 'Informations utilisateur récupérées avec succès',
            'user_info' => $mock_data['users'][0]
        ]);
        
    case '/api/admin/categories':
        authenticate();
        respond($mock_data['categories']);
        
    case '/api/admin/products':
        authenticate();
        respond($mock_data['products']);
        
    case '/api/admin/trainings':
        authenticate();
        respond($mock_data['trainings']);
        
    case '/api/admin/blog-posts':
        authenticate();
        respond($mock_data['blog_posts']);
        
    case '/api/admin/users':
        authenticate();
        respond($mock_data['users']);
        
    default:
        respond(['error' => 'Endpoint non trouvé'], 404);
}
?>
