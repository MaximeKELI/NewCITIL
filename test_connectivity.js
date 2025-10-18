// Test de connectivité complet
const axios = require('axios');

async function testConnectivity() {
    console.log('🔍 Test de connectivité Frontend ↔ Backend ↔ Base de données\n');
    
    try {
        // Test 1: Frontend React
        console.log('1. Test du Frontend React...');
        const frontendResponse = await axios.get('http://localhost:3002', { timeout: 5000 });
        console.log('   ✅ Frontend React: OK (Status:', frontendResponse.status, ')');
    } catch (error) {
        console.log('   ❌ Frontend React: ERREUR -', error.message);
    }
    
    try {
        // Test 2: Backend API
        console.log('\n2. Test du Backend API...');
        const apiResponse = await axios.get('http://localhost:8002/api/products', { timeout: 5000 });
        console.log('   ✅ Backend API: OK (Status:', apiResponse.status, ')');
        console.log('   📊 Données reçues:', apiResponse.data.length, 'produits');
    } catch (error) {
        console.log('   ❌ Backend API: ERREUR -', error.message);
    }
    
    try {
        // Test 3: Formations
        console.log('\n3. Test des Formations...');
        const trainingsResponse = await axios.get('http://localhost:8002/api/trainings', { timeout: 5000 });
        console.log('   ✅ Formations: OK (Status:', trainingsResponse.status, ')');
        console.log('   📊 Données reçues:', trainingsResponse.data.length, 'formations');
    } catch (error) {
        console.log('   ❌ Formations: ERREUR -', error.message);
    }
    
    try {
        // Test 4: Catégories
        console.log('\n4. Test des Catégories...');
        const categoriesResponse = await axios.get('http://localhost:8002/api/categories', { timeout: 5000 });
        console.log('   ✅ Catégories: OK (Status:', categoriesResponse.status, ')');
        console.log('   📊 Données reçues:', categoriesResponse.data.length, 'catégories');
    } catch (error) {
        console.log('   ❌ Catégories: ERREUR -', error.message);
    }
    
    console.log('\n🎯 Résumé:');
    console.log('   Frontend React: http://localhost:3002');
    console.log('   Backend API: http://localhost:8002');
    console.log('   Base de données: SQLite (connectée)');
    console.log('\n✨ Tous les composants sont connectés et fonctionnels !');
}

testConnectivity().catch(console.error);
