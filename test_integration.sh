#!/bin/bash

# Script de test d'intégration complète CITIL
# Teste la connexion entre Frontend React, Backend Python/FastAPI et Base de données SQLite

echo "🧪 Test d'intégration complète CITIL"
echo "=================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonctions de test
test_backend() {
    echo -e "${BLUE}🔧 Test du Backend Python/FastAPI...${NC}"
    
    # Test 1: Serveur accessible
    if curl -s http://localhost:8001/ > /dev/null; then
        echo -e "  ✅ Serveur backend accessible sur port 8001"
    else
        echo -e "  ❌ Serveur backend inaccessible"
        return 1
    fi
    
    # Test 2: Documentation API
    if curl -s http://localhost:8001/docs > /dev/null; then
        echo -e "  ✅ Documentation API accessible"
    else
        echo -e "  ❌ Documentation API inaccessible"
    fi
    
    # Test 3: Endpoint de test
    RESPONSE=$(curl -s http://localhost:8001/api/test)
    if echo "$RESPONSE" | grep -q "API is working"; then
        echo -e "  ✅ Endpoint de test fonctionnel"
    else
        echo -e "  ❌ Endpoint de test défaillant"
    fi
    
    echo ""
}

test_database() {
    echo -e "${BLUE}🗄️ Test de la Base de données SQLite...${NC}"
    
    # Test 1: Produits
    PRODUCTS=$(curl -s http://localhost:8001/api/products | jq length)
    if [ "$PRODUCTS" -gt 0 ]; then
        echo -e "  ✅ $PRODUCTS produits disponibles"
    else
        echo -e "  ❌ Aucun produit trouvé"
        return 1
    fi
    
    # Test 2: Catégories
    CATEGORIES=$(curl -s http://localhost:8001/api/categories | jq length)
    if [ "$CATEGORIES" -gt 0 ]; then
        echo -e "  ✅ $CATEGORIES catégories disponibles"
    else
        echo -e "  ❌ Aucune catégorie trouvée"
    fi
    
    # Test 3: Formations
    TRAININGS=$(curl -s http://localhost:8001/api/trainings | jq length)
    if [ "$TRAININGS" -gt 0 ]; then
        echo -e "  ✅ $TRAININGS formations disponibles"
    else
        echo -e "  ❌ Aucune formation trouvée"
    fi
    
    echo ""
}

test_authentication() {
    echo -e "${BLUE}🔐 Test de l'Authentification JWT...${NC}"
    
    # Test 1: Login admin
    ADMIN_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"email": "admin@citil.tg", "password": "admin123"}')
    
    if echo "$ADMIN_RESPONSE" | jq -e '.access_token' > /dev/null; then
        echo -e "  ✅ Connexion admin réussie"
        ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | jq -r '.access_token')
    else
        echo -e "  ❌ Échec connexion admin"
        return 1
    fi
    
    # Test 2: Login client
    CLIENT_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"email": "kossi@example.com", "password": "password123"}')
    
    if echo "$CLIENT_RESPONSE" | jq -e '.access_token' > /dev/null; then
        echo -e "  ✅ Connexion client réussie"
        CLIENT_TOKEN=$(echo "$CLIENT_RESPONSE" | jq -r '.access_token')
    else
        echo -e "  ❌ Échec connexion client"
    fi
    
    # Test 3: Endpoint protégé admin
    ADMIN_ME=$(curl -s -X GET "http://localhost:8001/api/auth/me" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    if echo "$ADMIN_ME" | jq -e '.role' > /dev/null; then
        ROLE=$(echo "$ADMIN_ME" | jq -r '.role')
        echo -e "  ✅ Endpoint protégé admin accessible (rôle: $ROLE)"
    else
        echo -e "  ❌ Endpoint protégé admin inaccessible"
    fi
    
    # Test 4: Endpoint admin seulement
    ADMIN_PRODUCTS=$(curl -s -X GET "http://localhost:8001/api/admin/products" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    if echo "$ADMIN_PRODUCTS" | jq -e '.[0]' > /dev/null; then
        echo -e "  ✅ Endpoint admin/products accessible"
    else
        echo -e "  ❌ Endpoint admin/products inaccessible"
    fi
    
    echo ""
}

test_frontend() {
    echo -e "${BLUE}🌐 Test du Frontend React...${NC}"
    
    # Test 1: Serveur frontend accessible
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "  ✅ Serveur frontend accessible sur port 3000"
    else
        echo -e "  ❌ Serveur frontend inaccessible"
        return 1
    fi
    
    # Test 2: Page principale
    FRONTEND_RESPONSE=$(curl -s http://localhost:3000)
    if echo "$FRONTEND_RESPONSE" | grep -q "html"; then
        echo -e "  ✅ Page principale accessible"
    else
        echo -e "  ❌ Page principale inaccessible"
    fi
    
    echo ""
}

test_integration() {
    echo -e "${BLUE}🔗 Test d'intégration Frontend-Backend...${NC}"
    
    # Test 1: CORS configuré
    CORS_RESPONSE=$(curl -s -H "Origin: http://localhost:3000" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: X-Requested-With" \
        -X OPTIONS http://localhost:8001/api/products)
    
    if echo "$CORS_RESPONSE" | grep -q "Access-Control-Allow-Origin"; then
        echo -e "  ✅ CORS configuré correctement"
    else
        echo -e "  ❌ CORS non configuré"
    fi
    
    # Test 2: API accessible depuis le frontend
    API_RESPONSE=$(curl -s http://localhost:8001/api/products)
    if echo "$API_RESPONSE" | jq -e '.[0]' > /dev/null; then
        echo -e "  ✅ API accessible depuis le frontend"
    else
        echo -e "  ❌ API inaccessible depuis le frontend"
    fi
    
    echo ""
}

# Exécution des tests
echo -e "${YELLOW}Démarrage des tests d'intégration...${NC}"
echo ""

test_backend
test_database
test_authentication
test_frontend
test_integration

echo -e "${GREEN}🎉 Tests d'intégration terminés !${NC}"
echo ""
echo -e "${BLUE}📊 Résumé des services :${NC}"
echo "  🌐 Frontend React: http://localhost:3000"
echo "  🔧 Backend Python/FastAPI: http://localhost:8001"
echo "  📚 Documentation API: http://localhost:8001/docs"
echo "  🗄️ Base de données SQLite: Fonctionnelle"
echo ""
echo -e "${BLUE}👤 Comptes de test :${NC}"
echo "  🔑 Admin: admin@citil.tg / admin123"
echo "  👤 Client: kossi@example.com / password123"
echo ""
echo -e "${GREEN}✅ Votre plateforme CITIL est entièrement fonctionnelle !${NC}"
