// Script de test pour vérifier la connexion admin
const axios = require('axios');

const API_URL = 'http://localhost:8000';

async function testAdminLogin() {
    try {
        console.log('🔍 Test de connexion admin...');
        
        // Test de connexion admin
        const loginResponse = await axios.post(`${API_URL}/api/login`, {
            email: 'admin@citil.tg',
            password: 'password123'
        });
        
        console.log('✅ Connexion réussie!');
        console.log('Token:', loginResponse.data.token ? 'Présent' : 'Absent');
        console.log('User info:', loginResponse.data.user_info);
        
        const token = loginResponse.data.token;
        
        // Test d'accès aux routes admin
        console.log('\n🔍 Test d\'accès aux routes admin...');
        
        try {
            const productsResponse = await axios.get(`${API_URL}/api/admin/products`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            console.log('✅ Accès aux produits admin réussi:', productsResponse.data);
        } catch (error) {
            console.log('❌ Erreur accès produits admin:', error.response?.status, error.response?.data);
        }
        
        try {
            const categoriesResponse = await axios.get(`${API_URL}/api/admin/categories`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            console.log('✅ Accès aux catégories admin réussi:', categoriesResponse.data);
        } catch (error) {
            console.log('❌ Erreur accès catégories admin:', error.response?.status, error.response?.data);
        }
        
        // Test de la route utilisateur
        try {
            const userResponse = await axios.get(`${API_URL}/api/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            console.log('✅ Accès utilisateur réussi:', userResponse.data);
        } catch (error) {
            console.log('❌ Erreur accès utilisateur:', error.response?.status, error.response?.data);
        }
        
    } catch (error) {
        console.log('❌ Erreur de connexion:', error.response?.status, error.response?.data);
    }
}

testAdminLogin();
