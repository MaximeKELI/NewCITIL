// import axios from 'axios';

// const API_URL = 'http://localhost:8000'; // adapte si ton backend tourne sur un autre port
// const api = axios.create({
//   baseURL: 'http://localhost:8000', // adapte si ton backend tourne sur un autre port
//   //timeout: 15000,
//   withCredentials: true,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// //const mockDelay = (ms) => new Promise(res => setTimeout(res, ms));

// // const mockProducts = [
// //     { id: 1, name: 'Arduino Uno R3', price: 12000, image: '/assets/images/arduino_uno.jpg', stock: 15, description: 'Carte de prototypage idéale pour apprendre l’électronique et la programmation.', category: 'Arduino' },
// //     { id: 2, name: 'Capteur DS18B20', price: 3500, image: '/assets/images/capteur_ds18b20.jpg', stock: 42, description: 'Capteur de température numérique précis pour projets IoT.', category: 'Capteurs' },
// //     { id: 3, name: 'Kit Robot Éducatif', price: 65000, image: '/assets/images/kit_robot_educatif.jpg', stock: 8, description: 'Kit complet pour découvrir la robotique avec des ateliers pratiques.', category: 'Kits' },
// //     { id: 4, name: 'Panneau Solaire 100W', price: 120000, image: '/assets/images/panneau_solaire.jpg', stock: 20, description: 'Panneau solaire monocristallin 100W pour installations domestiques.', category: 'Plaques solaires' },
// //     { id: 5, name: 'Batterie 12V 20Ah', price: 90000, image: '/assets/images/batterie_12v.jpg', stock: 12, description: 'Batterie AGM 12V 20Ah pour systèmes solaires.', category: 'Plaques solaires' },
// //     { id: 6, name: 'Raspberry Pi 4 (4GB)', price: 150000, image: '/assets/images/rasbarry_pi.jpg', stock: 6, description: 'Mini-ordinateur polyvalent pour projets IoT et IA.', category: 'Cartes & MCU' },
// //     { id: 7, name: 'ESP32 DevKit', price: 18000, image: '/assets/images/esp32.jpg', stock: 25, description: 'Module Wi-Fi/Bluetooth pour projets IoT avancés.', category: 'Cartes & MCU' },
// //     { id: 8, name: 'Module Bluetooth HC-05', price: 7000, image: '/assets/images/module_bluetooth.jpg', stock: 30, description: 'Module Bluetooth classique pour communication série avec microcontrôleurs.', category: 'Modules' },
// // ];

// // const mockTrainings = [
// //     { id: 1, title: 'Formation Arduino – Débutant', date: '2025-10-05', duration: '2 jours', price: 25000, image: '/assets/images/training-arduino.jpg' },
// //     { id: 2, title: 'Introduction à l’IoT', date: '2025-10-12', duration: '3 jours', price: 40000, image: '/assets/images/training-iot.jpg' },
// // ];

// // let mockCategories = [
// //     { id: 1, name: 'Arduino', slug: 'arduino', description: 'Cartes Arduino et accessoires' },
// //     { id: 2, name: 'Capteurs', slug: 'capteurs', description: 'Capteurs pour projets IoT' },
// //     { id: 3, name: 'Kits', slug: 'kits', description: 'Kits éducatifs et de démarrage' },
// //     { id: 4, name: 'Plaques solaires', slug: 'plaques-solaires', description: 'Solutions solaires' },
// // ];

// let mockUsers = [
//     { id: 1, name: 'Admin', email: 'admin@citil.tg', phone: '+228 90 00 00 00', role: 'admin', createdAt: '2025-01-10' },
//     { id: 2, name: 'Kossi Doe', email: 'kossi@example.com', phone: '+228 91 11 22 33', role: 'client', createdAt: '2025-02-05' },
//     { id: 3, name: 'Awa K.', email: 'awa@example.com', phone: '+228 92 22 33 44', role: 'client', createdAt: '2025-03-15' },
// ];

// let mockApplications = [
//     { id: 1, name: 'Kodjo A.', email: 'kodjo@exemple.com', cvUrl: '/assets/cv/kodjo.pdf', message: 'Passionné par l’IoT.', status: 'En attente' },
//     { id: 2, name: 'Aicha B.', email: 'aicha@exemple.com', cvUrl: '/assets/cv/aicha.pdf', message: 'Développeuse web', status: 'Validé' },
// ];

// let mockBlogCategories = [
//     { id: 1, name: 'Actualités', slug: 'actualites' },
//     { id: 2, name: 'Tutoriels', slug: 'tutoriels' },
// ];

// const mockPosts = [
//     { id: 1, title: 'Démarrer en électronique', excerpt: 'Les bases pour débuter en électronique…', image: '/assets/images/hero-banner.jpg' },
//     { id: 2, title: 'IoT au Togo: opportunités', excerpt: 'Pourquoi l’IoT est une chance…', image: '/assets/images/hero-banner.jpg' },
// ];

// function buildFormData(payload = {}, fileKey = 'image') {
//   const fd = new FormData();
//   for (const [k, v] of Object.entries(payload)) {
//     if (k === fileKey) continue;
//     if (v !== undefined && v !== null) fd.append(k, v);
//   }
//   if (payload[`${fileKey}File`] instanceof File) {
//     fd.append(fileKey, payload[`${fileKey}File`]);
//   }
//   return fd;
// }

// export const ApiService = {
//     // Auth Sanctum SPA
//     login: async (email, password) => {
//         await api.get('/sanctum/csrf-cookie');
//         const { data } = await api.post('/login', { email, password });
//         const token = data?.token || 'sanctum';
//         localStorage.setItem('citil_token', token);
//         try { window.dispatchEvent(new Event('authChanged')); } catch {}
//         return data || { token };
//     },
    
//     // AJOUTE CETTE FONCTION POUR L'INSCRIPTION
//     register: async (name, email, password, password_confirmation) => {
//         // Obtenir le cookie CSRF avant la requête POST
//         await api.get('http://localhost:8000/api/sanctum/csrf-cookie');
//         // Envoyer la requête d'inscription à l'endpoint de Laravel
//         const { data } = await api.post('http://localhost:8000/api/register', { 
//             name, 
//             email, 
//             password, 
//             password_confirmation 
//         });
//         // Gérer la réponse après l'inscription
//         const token = data?.token || 'sanctum';
//         localStorage.setItem('citil_token', token);
//         try { window.dispatchEvent(new Event('authChanged')); } catch(error) {
//             console.error('Erreur de l\'inscription :', error);
//         }
//         return data || { token };
//     },

//     logout: async () => {
//         try { await api.post('/logout'); } catch {}
//         localStorage.removeItem('citil_token');
//         try { window.dispatchEvent(new Event('authChanged')); } catch {}
//     },

//     // PRODUITS
//     getProducts: async () => {
//         const { data } = await api.get('/products');
//         return data;
//     },
//     getProduct: async (id) => {
//         const { data } = await api.get(`/products/${id}`);
//         return data;
//     },
//     createProduct: async (product) => {
//         const fd = buildFormData(product, 'image');
//         const { data } = await api.post('/admin/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//         return data;
//     },
//     updateProduct: async (id, updates) => {
//         const fd = buildFormData(updates, 'image');
//         fd.append('_method', 'PUT');
//         const { data } = await api.post(`/admin/products/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//         return data;
//     },
//     deleteProduct: async (id) => {
//         await api.delete(`/admin/products/${id}`);
//         return true;
//     },

//     // FORMATIONS
//     getTrainings: async () => {
//         const { data } = await api.get('/api/trainings');
//         return data;
//     },
//     createTraining: async (training) => {
//         const fd = buildFormData(training, 'image');
//         const { data } = await api.post('/admin/trainings', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//         return data;
//     },
//     updateTraining: async (id, updates) => {
//         const fd = buildFormData(updates, 'image');
//         fd.append('_method', 'PUT');
//         const { data } = await api.post(`/admin/trainings/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//         return data;
//     },
//     deleteTraining: async (id) => {
//         await api.delete(`/admin/trainings/${id}`);
//         return true;
//     },

//     // BLOG ARTICLES
//     getBlogPosts: async () => {
//     const { data } = await api.get('/api/blog-posts');
//     return data;
//   },
//   createBlogPost: async (post) => {
//     const fd = buildFormData(post, 'image');
//     const { data } = await api.post('/api/admin/blog-posts', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//     return data;
//   },
//   updateBlogPost: async (id, updates) => {
//     const fd = buildFormData(updates, 'image');
//     fd.append('_method', 'PUT');
//     const { data } = await api.post(`/api/admin/blog-posts/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//     return data;
//   },
//   deleteBlogPost: async (id) => {
//     await api.delete(`/api/admin/blog-posts/${id}`);
//     return true;
//   },

//     // CATEGORIES
//     getCategories: async () => {
//         const { data } = await api.get('/api/categories');
//         return data;
//     },
//     createCategory: async (payload) => {
//         const { data } = await api.post('/api/admin/categories', payload);
//         return data;
//     },
//     updateCategory: async (id, updates) => {
//         const { data } = await api.post(`/api/admin/categories/${id}`, { ...updates, _method: 'PUT' });
//         return data;
//     },
//     deleteCategory: async (id) => {
//         await api.delete(`/api/admin/categories/${id}`);
//         return true;
//     },

//     // PUBLIC: Candidature de stage
//     submitInternshipApplication: async ({ name, email, message, cvFile }) => {
//         const fd = new FormData();
//         if (name) fd.append('name', name);
//         if (email) fd.append('email', email);
//         if (message) fd.append('message', message);
//         if (cvFile instanceof File) fd.append('cv', cvFile);
//         const { data } = await api.post('/api/internship-applications', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//         return data;
//     },

//     // RESTE: Mocks conservés pour pages qui ne sont pas encore basculées totalement
//     getUsers: async () => {
//         await mockDelay(250);
//         return mockUsers;
//     },
//     getApplications: async () => {
//         await mockDelay(250);
//         return mockApplications;
//     },
//     updateApplicationStatus: async (id, status) => {
//         await mockDelay(250);
//         const idx = mockApplications.findIndex(a => a.id === Number(id));
//         if (idx >= 0) {
//             mockApplications[idx] = { ...mockApplications[idx], status };
//             return mockApplications[idx];
//         }
//         throw new Error('Candidature introuvable');
//     },
//     getBlogCategories: async () => {
//         await mockDelay(200);
//         return mockBlogCategories; // pas d’endpoint côté backend pour le moment
//     },
//     createOrder: async (order) => {
//         await mockDelay(500);
//         return { success: true, orderId: Math.floor(Math.random() * 100000) };
//     },
// };

// export default api;




// SERVICE API RÉEL POUR CONNEXION AVEC LARAVEL

import axios from 'axios';

const API_URL = 'http://localhost:8000';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('citil_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('citil_token');
      window.dispatchEvent(new Event('authChanged'));
    }
    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------------
// 1. FONCTIONS ET DONNÉES DE MOCK
// ----------------------------------------------------------------------

// Simule un délai réseau pour une meilleure expérience de chargement
const mockDelay = (ms = 500) => new Promise(res => setTimeout(res, ms));

// Structure des données moquées pour toutes les interfaces

// PRODUITS
let mockProducts = [
    { id: 1, name: 'Arduino Uno R3', price: 12000, image: '/assets/images/arduino_uno.jpg', stock: 15, description: 'Carte de prototypage idéale pour apprendre l’électronique et la programmation.', category: 'Arduino' },
    { id: 2, name: 'Capteur DS18B20', price: 3500, image: '/assets/images/capteur_ds18b20.jpg', stock: 42, description: 'Capteur de température numérique précis pour projets IoT.', category: 'Capteurs' },
    { id: 3, name: 'Kit Robot Éducatif', price: 65000, image: '/assets/images/kit_robot_educatif.jpg', stock: 8, description: 'Kit complet pour découvrir la robotique avec des ateliers pratiques.', category: 'Kits' },
    { id: 4, name: 'Panneau Solaire 100W', price: 120000, image: '/assets/images/panneau_solaire.jpg', stock: 20, description: 'Panneau solaire monocristallin 100W pour installations domestiques.', category: 'Plaques solaires' },
    { id: 5, name: 'Batterie 12V 20Ah', price: 90000, image: '/assets/images/batterie_12v.jpg', stock: 12, description: 'Batterie AGM 12V 20Ah pour systèmes solaires.', category: 'Plaques solaires' },
    { id: 6, name: 'Raspberry Pi 4 (4GB)', price: 150000, image: '/assets/images/rasbarry_pi.jpg', stock: 6, description: 'Mini-ordinateur polyvalent pour projets IoT et IA.', category: 'Cartes & MCU' },
];

// FORMATIONS
let mockTrainings = [
    { id: 1, title: 'Formation Arduino – Débutant', date: '2025-10-05', duration: '2 jours', price: 25000, image: '/assets/images/training-arduino.jpg' },
    { id: 2, title: 'Introduction à l’IoT', date: '2025-10-12', duration: '3 jours', price: 40000, image: '/assets/images/training-iot.jpg' },
    { id: 3, title: 'Robotique Avancée', date: '2025-11-01', duration: '5 jours', price: 75000, image: '/assets/images/training-robotics.jpg' },
];

// UTILISATEURS
let mockUsers = [
    { id: 1, name: 'Admin', email: 'admin@citil.tg', phone: '+228 90 00 00 00', role: 'admin', createdAt: '2025-01-10' },
    { id: 2, name: 'Kossi Doe', email: 'kossi@gmail.com', phone: '+228 91 11 22 33', role: 'client', createdAt: '2025-02-05' },
    { id: 3, name: 'Awa K.', email: 'awa@gmail.com', phone: '+228 92 22 33 44', role: 'client', createdAt: '2025-03-15' },
];

// CANDIDATURES
let mockApplications = [
    { id: 1, name: 'Kodjo A.', email: 'kodjo@exemple.com', cvUrl: '/assets/cv/kodjo.pdf', message: 'Passionné par l’IoT.', status: 'En attente' },
    { id: 2, name: 'Aicha B.', email: 'aicha@exemple.com', cvUrl: '/assets/cv/aicha.pdf', message: 'Développeuse web', status: 'Validé' },
];

// CATÉGORIES PRODUITS
let mockCategories = [
    { id: 1, name: 'Arduino', slug: 'arduino', description: 'Cartes Arduino et accessoires' },
    { id: 2, name: 'Capteurs', slug: 'capteurs', description: 'Capteurs pour projets IoT' },
    { id: 3, name: 'Kits', slug: 'kits', description: 'Kits éducatifs et de démarrage' },
    { id: 4, name: 'Plaques solaires', slug: 'plaques-solaires', description: 'Solutions solaires' },
];

// ARTICLES DE BLOG
let mockPosts = [
    { id: 1, title: 'Démarrer en électronique', excerpt: 'Les bases pour débuter en électronique…', image: '/assets/images/post-1.jpg', content: 'Contenu détaillé de l\'article 1...' },
    { id: 2, title: 'IoT au Togo: opportunités', excerpt: 'Pourquoi l’IoT est une chance…', image: '/assets/images/post-2.jpg', content: 'Contenu détaillé de l\'article 2...' },
    { id: 3, title: 'Tutoriel : Programmer votre ESP32', excerpt: 'Guide pas-à-pas pour les débutants.', image: '/assets/images/post-3.jpg', content: 'Contenu détaillé de l\'article 3...' },
];

// CATÉGORIES BLOG
let mockBlogCategories = [
    { id: 1, name: 'Actualités', slug: 'actualites' },
    { id: 2, name: 'Tutoriels', slug: 'tutoriels' },
    { id: 3, name: 'Études de cas', slug: 'etudes-de-cas' },
];

// ----------------------------------------------------------------------
// 2. SERVICE API MOQUÉ
// ----------------------------------------------------------------------

export const ApiService = {
    // --- AUTHENTIFICATION ---
    login: async (email, password) => {
        try {
            const response = await api.post('/api/login', { email, password });
            const { token, user_info } = response.data;
            
            localStorage.setItem('citil_token', token);
            localStorage.setItem('citil_user', JSON.stringify(user_info));
            window.dispatchEvent(new Event('authChanged'));
            
            return { token, user: user_info };
        } catch (error) {
            const message = error.response?.data?.message || 'Erreur de connexion';
            throw new Error(message);
        }
    },
    
    register: async (name, email, password, password_confirmation) => {
        try {
            console.log('Envoi des données d\'inscription:', { name, email, password, password_confirmation });
            const response = await api.post('/api/register', { 
                name, 
                email, 
                password, 
                password_confirmation 
            });
            console.log('Réponse d\'inscription:', response.data);
            const { token, user_info } = response.data;
            
            localStorage.setItem('citil_token', token);
            localStorage.setItem('citil_user', JSON.stringify(user_info));
            window.dispatchEvent(new Event('authChanged'));
            
            return { token, user: user_info };
        } catch (error) {
            console.error('Erreur API d\'inscription:', error.response?.data);
            const message = error.response?.data?.message || 'Erreur d\'inscription';
            const errors = error.response?.data?.errors;
            if (errors) {
                const errorMessages = Object.values(errors).flat().join(', ');
                throw new Error(errorMessages);
            }
            throw new Error(message);
        }
    },

    logout: async () => {
        try {
            await api.post('/api/logout');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            localStorage.removeItem('citil_token');
            localStorage.removeItem('citil_user');
            window.dispatchEvent(new Event('authChanged'));
        }
        return true;
    },

    getUserInfo: async () => {
        try {
            const response = await api.get('/api/user');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Erreur lors de la récupération des informations utilisateur';
            throw new Error(message);
        }
    },

    updateProfile: async (profileData) => {
        try {
            // Créer FormData pour gérer les fichiers
            const formData = new FormData();
            
            // Ajouter les champs texte
            if (profileData.name) formData.append('name', profileData.name);
            if (profileData.email) formData.append('email', profileData.email);
            if (profileData.phone) formData.append('phone', profileData.phone);
            if (profileData.current_password) formData.append('current_password', profileData.current_password);
            if (profileData.new_password) formData.append('new_password', profileData.new_password);
            if (profileData.new_password_confirmation) formData.append('new_password_confirmation', profileData.new_password_confirmation);
            
            // Ajouter le fichier avatar s'il existe
            if (profileData.avatar) {
                formData.append('avatar', profileData.avatar);
            }
            
            const response = await api.post('/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            const { user_info } = response.data;
            
            // Mettre à jour les données utilisateur dans le localStorage
            localStorage.setItem('citil_user', JSON.stringify(user_info));
            window.dispatchEvent(new Event('authChanged'));
            
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Erreur lors de la mise à jour du profil';
            throw new Error(message);
        }
    },

    // --- PRODUITS ---
    getProducts: async () => {
        try {
            const response = await api.get('/api/products');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            // Fallback vers les données mockées en cas d'erreur
            return mockProducts;
        }
    },
    getProduct: async (id) => {
        try {
            const response = await api.get(`/api/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération du produit:', error);
            // Fallback vers les données mockées en cas d'erreur
            const product = mockProducts.find(p => p.id === Number(id));
            if (!product) throw new Error('Produit non trouvé');
            return product;
        }
    },
    createProduct: async (product) => {
        await mockDelay();
        const newId = mockProducts.length + 1;
        const newProduct = { id: newId, ...product, stock: 1, image: product.imageFile ? '/assets/images/new_product.jpg' : null };
        mockProducts.push(newProduct);
        return newProduct;
    },
    updateProduct: async (id, updates) => {
        await mockDelay();
        const index = mockProducts.findIndex(p => p.id === Number(id));
        if (index === -1) throw new Error('Produit non trouvé (Mock)');
        const updatedProduct = { ...mockProducts[index], ...updates };
        mockProducts[index] = updatedProduct;
        return updatedProduct;
    },
    deleteProduct: async (id) => {
        await mockDelay();
        mockProducts = mockProducts.filter(p => p.id !== Number(id));
        return true;
    },

    // --- FORMATIONS ---
    getTrainings: async () => {
        await mockDelay();
        return mockTrainings;
    },
    createTraining: async (training) => {
        await mockDelay();
        const newId = mockTrainings.length + 1;
        const newTraining = { id: newId, ...training, image: training.imageFile ? '/assets/images/new_training.jpg' : null };
        mockTrainings.push(newTraining);
        return newTraining;
    },
    updateTraining: async (id, updates) => {
        await mockDelay();
        const index = mockTrainings.findIndex(t => t.id === Number(id));
        if (index === -1) throw new Error('Formation non trouvée (Mock)');
        const updatedTraining = { ...mockTrainings[index], ...updates };
        mockTrainings[index] = updatedTraining;
        return updatedTraining;
    },
    deleteTraining: async (id) => {
        await mockDelay();
        mockTrainings = mockTrainings.filter(t => t.id !== Number(id));
        return true;
    },

    // --- BLOG ARTICLES (POSTS) ---
    getBlogPosts: async () => {
        await mockDelay();
        return mockPosts;
    },
    createBlogPost: async (post) => {
        await mockDelay();
        const newId = mockPosts.length + 1;
        const newPost = { id: newId, ...post, image: post.imageFile ? '/assets/images/new_post.jpg' : null };
        mockPosts.push(newPost);
        return newPost;
    },
    updateBlogPost: async (id, updates) => {
        await mockDelay();
        const index = mockPosts.findIndex(p => p.id === Number(id));
        if (index === -1) throw new Error('Article non trouvé (Mock)');
        const updatedPost = { ...mockPosts[index], ...updates };
        mockPosts[index] = updatedPost;
        return updatedPost;
    },
    deleteBlogPost: async (id) => {
        await mockDelay();
        mockPosts = mockPosts.filter(p => p.id !== Number(id));
        return true;
    },

    // --- CATÉGORIES PRODUITS ---
    getCategories: async () => {
        await mockDelay();
        return mockCategories;
    },
    createCategory: async (payload) => {
        await mockDelay();
        const newId = mockCategories.length + 1;
        const newCategory = { id: newId, ...payload };
        mockCategories.push(newCategory);
        return newCategory;
    },
    updateCategory: async (id, updates) => {
        await mockDelay();
        const index = mockCategories.findIndex(c => c.id === Number(id));
        if (index === -1) throw new Error('Catégorie non trouvée (Mock)');
        const updatedCategory = { ...mockCategories[index], ...updates };
        mockCategories[index] = updatedCategory;
        return updatedCategory;
    },
    deleteCategory: async (id) => {
        await mockDelay();
        mockCategories = mockCategories.filter(c => c.id !== Number(id));
        return true;
    },

    // --- CANDIDATURES/UTILISATEURS/DIVERS ADMIN ---
    submitInternshipApplication: async ({ name, email, message, cvFile }) => {
        await mockDelay();
        const newId = mockApplications.length + 1;
        const newApp = { id: newId, name, email, message, cvUrl: cvFile ? '/assets/cv/nouveau.pdf' : null, status: 'En attente' };
        mockApplications.push(newApp);
        return { message: 'Candidature soumise avec succès (Mock) !', application: newApp };
    },
    
    // Fonctions de l'admin déjà moquées
    getUsers: async () => {
        await mockDelay(300);
        return mockUsers;
    },
    getApplications: async () => {
        await mockDelay(300);
        return mockApplications;
    },
    updateApplicationStatus: async (id, status) => {
        await mockDelay(300);
        const idx = mockApplications.findIndex(a => a.id === Number(id));
        if (idx >= 0) {
            mockApplications[idx] = { ...mockApplications[idx], status };
            return mockApplications[idx];
        }
        throw new Error('Candidature introuvable (Mock)');
    },
    getBlogCategories: async () => {
        await mockDelay(200);
        return mockBlogCategories; 
    },
    createOrder: async (order) => {
        await mockDelay(500);
        return { success: true, orderId: Math.floor(Math.random() * 100000) };
    },
};

//export default api;