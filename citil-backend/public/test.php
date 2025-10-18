<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Test simple
$data = [
    'message' => 'API fonctionne',
    'timestamp' => date('Y-m-d H:i:s'),
    'trainings' => [
        [
            'id' => 1,
            'title' => 'Formation Arduino Débutant',
            'description' => 'Apprenez les bases de l\'Arduino',
            'price' => 25000,
            'is_active' => true
        ]
    ]
];

echo json_encode($data);
?>
