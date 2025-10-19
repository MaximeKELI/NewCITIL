<?php
/**
 * Test Rigoureux des Fonctionnalités Admin
 * Vérification complète frontend ↔ backend ↔ base de données
 */

class AdminRigorousTest {
    private $apiBase = 'http://localhost:8002';
    private $frontendUrl = 'http://localhost:3000';
    private $authToken = null;
    private $results = [];
    
    public function __construct() {
        echo "🔍 TEST RIGOUREUX DES FONCTIONNALITÉS ADMIN\n";
        echo "==========================================\n\n";
    }
    
    private function log($message, $type = 'INFO') {
        $timestamp = date('H:i:s');
        echo "[$timestamp] [$type] $message\n";
    }
    
    private function testEndpoint($url, $method = 'GET', $headers = [], $data = null) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        if ($method === 'POST' && $data) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        return [
            'success' => $httpCode >= 200 && $httpCode < 300,
            'http_code' => $httpCode,
            'response' => $response,
            'error' => $error
        ];
    }
    
    public function testConnectivity() {
        $this->log("Test de connectivité des serveurs...");
        
        // Test Backend
        $backendTest = $this->testEndpoint($this->apiBase . '/api/test');
        if ($backendTest['success']) {
            $this->log("✅ Backend API accessible", 'SUCCESS');
            $this->results['backend'] = true;
        } else {
            $this->log("❌ Backend API inaccessible: " . $backendTest['error'], 'ERROR');
            $this->results['backend'] = false;
            return false;
        }
        
        // Test Frontend
        $frontendTest = $this->testEndpoint($this->frontendUrl, 'GET', [], null);
        if ($frontendTest['success']) {
            $this->log("✅ Frontend React accessible", 'SUCCESS');
            $this->results['frontend'] = true;
        } else {
            $this->log("❌ Frontend React inaccessible: " . $frontendTest['error'], 'ERROR');
            $this->results['frontend'] = false;
        }
        
        return $this->results['backend'];
    }
    
    public function testAuthentication() {
        $this->log("Test d'authentification admin...");
        
        // Test de connexion
        $loginData = [
            'email' => 'admin@citil.com',
            'password' => 'password'
        ];
        
        $loginTest = $this->testEndpoint(
            $this->apiBase . '/api/auth/login',
            'POST',
            ['Content-Type: application/json'],
            $loginData
        );
        
        if ($loginTest['success']) {
            $response = json_decode($loginTest['response'], true);
            if (isset($response['token'])) {
                $this->authToken = $response['token'];
                $this->log("✅ Connexion admin réussie", 'SUCCESS');
                $this->results['auth'] = true;
                
                // Test de récupération des infos utilisateur
                $userTest = $this->testEndpoint(
                    $this->apiBase . '/api/auth/me',
                    'GET',
                    ['Authorization: Bearer ' . $this->authToken]
                );
                
                if ($userTest['success']) {
                    $this->log("✅ Récupération des infos utilisateur réussie", 'SUCCESS');
                } else {
                    $this->log("❌ Erreur récupération infos utilisateur", 'ERROR');
                }
                
                return true;
            }
        }
        
        $this->log("❌ Échec de l'authentification admin", 'ERROR');
        $this->results['auth'] = false;
        return false;
    }
    
    public function testPublicEndpoints() {
        $this->log("Test des endpoints publics...");
        
        $endpoints = [
            'categories' => '/api/categories',
            'products' => '/api/products',
            'trainings' => '/api/trainings',
            'blog-posts' => '/api/blog-posts'
        ];
        
        foreach ($endpoints as $name => $endpoint) {
            $test = $this->testEndpoint($this->apiBase . $endpoint);
            if ($test['success']) {
                $data = json_decode($test['response'], true);
                $count = is_array($data) ? count($data) : 0;
                $this->log("✅ $name: $count éléments récupérés", 'SUCCESS');
                $this->results["public_$name"] = true;
            } else {
                $this->log("❌ $name: Erreur " . $test['http_code'], 'ERROR');
                $this->results["public_$name"] = false;
            }
        }
    }
    
    public function testAdminEndpoints() {
        if (!$this->authToken) {
            $this->log("⚠️ Token d'authentification manquant", 'WARNING');
            return;
        }
        
        $this->log("Test des endpoints admin...");
        
        $adminEndpoints = [
            'admin_categories' => '/api/admin/categories',
            'admin_products' => '/api/admin/products',
            'admin_trainings' => '/api/admin/trainings',
            'admin_blog_posts' => '/api/admin/blog-posts',
            'admin_users' => '/api/admin/users'
        ];
        
        $headers = ['Authorization: Bearer ' . $this->authToken];
        
        foreach ($adminEndpoints as $name => $endpoint) {
            $test = $this->testEndpoint($this->apiBase . $endpoint, 'GET', $headers);
            if ($test['success']) {
                $data = json_decode($test['response'], true);
                $count = is_array($data) ? count($data) : 0;
                $this->log("✅ $name: $count éléments récupérés", 'SUCCESS');
                $this->results["admin_$name"] = true;
            } else {
                $this->log("❌ $name: Erreur " . $test['http_code'] . " - " . $test['error'], 'ERROR');
                $this->results["admin_$name"] = false;
            }
        }
    }
    
    public function testCRUDOperations() {
        if (!$this->authToken) {
            $this->log("⚠️ Token d'authentification manquant pour les tests CRUD", 'WARNING');
            return;
        }
        
        $this->log("Test des opérations CRUD...");
        $headers = ['Authorization: Bearer ' . $this->authToken, 'Content-Type: application/json'];
        
        // Test création de catégorie
        $categoryData = [
            'name' => 'Test Catégorie ' . time(),
            'description' => 'Catégorie de test créée via audit rigoureux'
        ];
        
        $createTest = $this->testEndpoint(
            $this->apiBase . '/api/admin/categories',
            'POST',
            $headers,
            $categoryData
        );
        
        if ($createTest['success']) {
            $this->log("✅ Création de catégorie réussie", 'SUCCESS');
            $this->results['crud_create'] = true;
            
            // Récupérer l'ID de la catégorie créée
            $response = json_decode($createTest['response'], true);
            $categoryId = $response['category']['id'] ?? null;
            
            if ($categoryId) {
                // Test création de produit
                $productData = [
                    'name' => 'Test Produit ' . time(),
                    'description' => 'Produit de test créé via audit rigoureux',
                    'price' => 1000,
                    'stock' => 10,
                    'category_id' => $categoryId,
                    'reference' => 'TEST-' . time(),
                    'is_active' => true
                ];
                
                $productTest = $this->testEndpoint(
                    $this->apiBase . '/api/admin/products',
                    'POST',
                    $headers,
                    $productData
                );
                
                if ($productTest['success']) {
                    $this->log("✅ Création de produit réussie", 'SUCCESS');
                    $this->results['crud_products'] = true;
                } else {
                    $this->log("❌ Erreur création produit: " . $productTest['error'], 'ERROR');
                    $this->results['crud_products'] = false;
                }
            }
        } else {
            $this->log("❌ Erreur création catégorie: " . $createTest['error'], 'ERROR');
            $this->results['crud_create'] = false;
        }
    }
    
    public function testDataPersistence() {
        $this->log("Test de persistance des données...");
        
        // Vérifier que les données sont bien en base
        $endpoints = [
            'categories' => '/api/categories',
            'products' => '/api/products',
            'trainings' => '/api/trainings'
        ];
        
        $persistenceOk = true;
        
        foreach ($endpoints as $name => $endpoint) {
            $test = $this->testEndpoint($this->apiBase . $endpoint);
            if ($test['success']) {
                $data = json_decode($test['response'], true);
                if (is_array($data) && count($data) > 0) {
                    $this->log("✅ $name: Données persistées (" . count($data) . " éléments)", 'SUCCESS');
                } else {
                    $this->log("⚠️ $name: Aucune donnée trouvée", 'WARNING');
                }
            } else {
                $this->log("❌ $name: Erreur de persistance", 'ERROR');
                $persistenceOk = false;
            }
        }
        
        $this->results['persistence'] = $persistenceOk;
    }
    
    public function generateReport() {
        $this->log("Génération du rapport final...");
        
        echo "\n" . str_repeat("=", 50) . "\n";
        echo "📊 RAPPORT FINAL DE L'AUDIT RIGOUREUX\n";
        echo str_repeat("=", 50) . "\n\n";
        
        $totalTests = count($this->results);
        $passedTests = array_sum($this->results);
        $successRate = round(($passedTests / $totalTests) * 100, 1);
        
        echo "Résultats par catégorie:\n";
        echo "------------------------\n";
        
        foreach ($this->results as $test => $result) {
            $status = $result ? '✅ RÉUSSI' : '❌ ÉCHEC';
            echo sprintf("%-25s: %s\n", $test, $status);
        }
        
        echo "\nStatistiques globales:\n";
        echo "---------------------\n";
        echo "Tests réussis: $passedTests/$totalTests\n";
        echo "Taux de réussite: $successRate%\n";
        
        if ($successRate >= 90) {
            echo "\n🎉 EXCELLENT! Toutes les fonctionnalités admin fonctionnent parfaitement.\n";
        } elseif ($successRate >= 70) {
            echo "\n✅ BON! La plupart des fonctionnalités fonctionnent, quelques améliorations nécessaires.\n";
        } elseif ($successRate >= 50) {
            echo "\n⚠️ MOYEN! Plusieurs fonctionnalités nécessitent des corrections.\n";
        } else {
            echo "\n❌ CRITIQUE! De nombreuses fonctionnalités ne fonctionnent pas.\n";
        }
        
        echo "\n" . str_repeat("=", 50) . "\n";
    }
    
    public function runCompleteTest() {
        $this->log("Démarrage de l'audit rigoureux complet...");
        
        // 1. Test de connectivité
        if (!$this->testConnectivity()) {
            $this->log("❌ Impossible de continuer sans connectivité backend", 'ERROR');
            return;
        }
        
        // 2. Test d'authentification
        if (!$this->testAuthentication()) {
            $this->log("⚠️ Tests admin limités sans authentification", 'WARNING');
        }
        
        // 3. Test des endpoints publics
        $this->testPublicEndpoints();
        
        // 4. Test des endpoints admin
        $this->testAdminEndpoints();
        
        // 5. Test des opérations CRUD
        $this->testCRUDOperations();
        
        // 6. Test de persistance
        $this->testDataPersistence();
        
        // 7. Génération du rapport
        $this->generateReport();
    }
}

// Exécution du test
$test = new AdminRigorousTest();
$test->runCompleteTest();
?>
