// Script de débogage pour tester l'accès admin
const puppeteer = require('puppeteer');

async function debugAdmin() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    // Écouter les erreurs de console
    page.on('console', msg => {
        console.log('CONSOLE:', msg.text());
    });
    
    page.on('pageerror', error => {
        console.log('ERREUR PAGE:', error.message);
    });
    
    try {
        console.log('🔍 Test de connexion admin...');
        
        // Aller à la page de login
        await page.goto('http://localhost:3000/login');
        await page.waitForSelector('input[type="email"]', { timeout: 10000 });
        
        // Remplir le formulaire de connexion
        await page.type('input[type="email"]', 'admin@citil.tg');
        await page.type('input[type="password"]', 'password123');
        
        // Cliquer sur le bouton de connexion
        await page.click('button[type="submit"]');
        
        // Attendre la redirection
        await page.waitForNavigation({ timeout: 10000 });
        
        console.log('✅ Connexion réussie');
        console.log('URL actuelle:', page.url());
        
        // Vérifier si l'utilisateur est connecté
        const userInfo = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('citil_user') || '{}');
        });
        
        console.log('Utilisateur connecté:', userInfo);
        
        if (userInfo.role === 'admin') {
            console.log('🔍 Test d\'accès à /admin...');
            
            // Aller à la page admin
            await page.goto('http://localhost:3000/admin');
            await page.waitForTimeout(3000);
            
            console.log('URL admin:', page.url());
            
            // Vérifier s'il y a des erreurs
            const errors = await page.evaluate(() => {
                return window.errors || [];
            });
            
            if (errors.length > 0) {
                console.log('❌ Erreurs détectées:', errors);
            } else {
                console.log('✅ Page admin chargée sans erreur');
            }
        } else {
            console.log('❌ Utilisateur non admin');
        }
        
    } catch (error) {
        console.log('❌ Erreur:', error.message);
    } finally {
        await browser.close();
    }
}

debugAdmin();
