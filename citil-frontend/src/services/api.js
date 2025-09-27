import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // adapte si ton backend tourne sur un autre port
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const mockDelay = (ms) => new Promise(res => setTimeout(res, ms));

const mockProducts = [
    { id: 1, name: 'Arduino Uno R3', price: 12000, image: '/assets/images/arduino_uno.jpg', stock: 15, description: 'Carte de prototypage idéale pour apprendre l’électronique et la programmation.', category: 'Arduino' },
    { id: 2, name: 'Capteur DS18B20', price: 3500, image: '/assets/images/capteur_ds18b20.jpg', stock: 42, description: 'Capteur de température numérique précis pour projets IoT.', category: 'Capteurs' },
    { id: 3, name: 'Kit Robot Éducatif', price: 65000, image: '/assets/images/kit_robot_educatif.jpg', stock: 8, description: 'Kit complet pour découvrir la robotique avec des ateliers pratiques.', category: 'Kits' },
    { id: 4, name: 'Panneau Solaire 100W', price: 120000, image: '/assets/images/panneau_solaire.jpg', stock: 20, description: 'Panneau solaire monocristallin 100W pour installations domestiques.', category: 'Plaques solaires' },
    { id: 5, name: 'Batterie 12V 20Ah', price: 90000, image: '/assets/images/batterie_12v.jpg', stock: 12, description: 'Batterie AGM 12V 20Ah pour systèmes solaires.', category: 'Plaques solaires' },
    { id: 6, name: 'Raspberry Pi 4 (4GB)', price: 150000, image: '/assets/images/rasbarry_pi.jpg', stock: 6, description: 'Mini-ordinateur polyvalent pour projets IoT et IA.', category: 'Cartes & MCU' },
    { id: 7, name: 'ESP32 DevKit', price: 18000, image: '/assets/images/esp32.jpg', stock: 25, description: 'Module Wi-Fi/Bluetooth pour projets IoT avancés.', category: 'Cartes & MCU' },
    { id: 8, name: 'Module Bluetooth HC-05', price: 7000, image: '/assets/images/module_bluetooth.jpg', stock: 30, description: 'Module Bluetooth classique pour communication série avec microcontrôleurs.', category: 'Modules' },
];

const mockTrainings = [
    { id: 1, title: 'Formation Arduino – Débutant', date: '2025-10-05', duration: '2 jours', price: 25000, image: '/assets/images/training-arduino.jpg' },
    { id: 2, title: 'Introduction à l’IoT', date: '2025-10-12', duration: '3 jours', price: 40000, image: '/assets/images/training-iot.jpg' },
];

let mockCategories = [
    { id: 1, name: 'Arduino', slug: 'arduino', description: 'Cartes Arduino et accessoires' },
    { id: 2, name: 'Capteurs', slug: 'capteurs', description: 'Capteurs pour projets IoT' },
    { id: 3, name: 'Kits', slug: 'kits', description: 'Kits éducatifs et de démarrage' },
    { id: 4, name: 'Plaques solaires', slug: 'plaques-solaires', description: 'Solutions solaires' },
];

let mockUsers = [
    { id: 1, name: 'Admin', email: 'admin@citil.tg', phone: '+228 90 00 00 00', role: 'admin', createdAt: '2025-01-10' },
    { id: 2, name: 'Kossi Doe', email: 'kossi@example.com', phone: '+228 91 11 22 33', role: 'client', createdAt: '2025-02-05' },
    { id: 3, name: 'Awa K.', email: 'awa@example.com', phone: '+228 92 22 33 44', role: 'client', createdAt: '2025-03-15' },
];

let mockApplications = [
    { id: 1, name: 'Kodjo A.', email: 'kodjo@exemple.com', cvUrl: '/assets/cv/kodjo.pdf', message: 'Passionné par l’IoT.', status: 'En attente' },
    { id: 2, name: 'Aicha B.', email: 'aicha@exemple.com', cvUrl: '/assets/cv/aicha.pdf', message: 'Développeuse web', status: 'Validé' },
];

let mockBlogCategories = [
    { id: 1, name: 'Actualités', slug: 'actualites' },
    { id: 2, name: 'Tutoriels', slug: 'tutoriels' },
];

const mockPosts = [
    { id: 1, title: 'Démarrer en électronique', excerpt: 'Les bases pour débuter en électronique…', image: '/assets/images/hero-banner.jpg' },
    { id: 2, title: 'IoT au Togo: opportunités', excerpt: 'Pourquoi l’IoT est une chance…', image: '/assets/images/hero-banner.jpg' },
];

function buildFormData(payload = {}, fileKey = 'image') {
  const fd = new FormData();
  for (const [k, v] of Object.entries(payload)) {
    if (k === fileKey) continue;
    if (v !== undefined && v !== null) fd.append(k, v);
  }
  if (payload[`${fileKey}File`] instanceof File) {
    fd.append(fileKey, payload[`${fileKey}File`]);
  }
  return fd;
}

export const ApiService = {
    // Auth Sanctum SPA
    login: async (email, password) => {
        await api.get('/sanctum/csrf-cookie');
        const { data } = await api.post('/login', { email, password });
        const token = data?.token || 'sanctum';
        localStorage.setItem('citil_token', token);
        try { window.dispatchEvent(new Event('authChanged')); } catch {}
        return data || { token };
    },
    logout: async () => {
        try { await api.post('/logout'); } catch {}
        localStorage.removeItem('citil_token');
        try { window.dispatchEvent(new Event('authChanged')); } catch {}
    },

    // PRODUITS
    getProducts: async () => {
        const { data } = await api.get('/products');
        return data;
    },
    getProduct: async (id) => {
        const { data } = await api.get(`/products/${id}`);
        return data;
    },
    createProduct: async (product) => {
        const fd = buildFormData(product, 'image');
        const { data } = await api.post('/admin/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    },
    updateProduct: async (id, updates) => {
        const fd = buildFormData(updates, 'image');
        fd.append('_method', 'PUT');
        const { data } = await api.post(`/admin/products/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    },
    deleteProduct: async (id) => {
        await api.delete(`/admin/products/${id}`);
        return true;
    },

    // FORMATIONS
    getTrainings: async () => {
        const { data } = await api.get('/trainings');
        return data;
    },
    createTraining: async (training) => {
        const fd = buildFormData(training, 'image');
        const { data } = await api.post('/admin/trainings', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    },
    updateTraining: async (id, updates) => {
        const fd = buildFormData(updates, 'image');
        fd.append('_method', 'PUT');
        const { data } = await api.post(`/admin/trainings/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    },
    deleteTraining: async (id) => {
        await api.delete(`/admin/trainings/${id}`);
        return true;
    },

    // BLOG ARTICLES
    getBlogPosts: async () => {
        const { data } = await api.get('/blog-posts');
        return data;
    },
    createBlogPost: async (post) => {
        const fd = buildFormData(post, 'image');
        const { data } = await api.post('/admin/blog-posts', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    },
    updateBlogPost: async (id, updates) => {
        const fd = buildFormData(updates, 'image');
        fd.append('_method', 'PUT');
        const { data } = await api.post(`/admin/blog-posts/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    },
    deleteBlogPost: async (id) => {
        await api.delete(`/admin/blog-posts/${id}`);
        return true;
    },

    // CATEGORIES
    getCategories: async () => {
        const { data } = await api.get('/categories');
        return data;
    },
    createCategory: async (payload) => {
        const { data } = await api.post('/admin/categories', payload);
        return data;
    },
    updateCategory: async (id, updates) => {
        const { data } = await api.post(`/admin/categories/${id}`, { ...updates, _method: 'PUT' });
        return data;
    },
    deleteCategory: async (id) => {
        await api.delete(`/admin/categories/${id}`);
        return true;
    },

    // PUBLIC: Candidature de stage
    submitInternshipApplication: async ({ name, email, message, cvFile }) => {
        const fd = new FormData();
        if (name) fd.append('name', name);
        if (email) fd.append('email', email);
        if (message) fd.append('message', message);
        if (cvFile instanceof File) fd.append('cv', cvFile);
        const { data } = await api.post('/internship-applications', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    },

    // RESTE: Mocks conservés pour pages qui ne sont pas encore basculées totalement
    getUsers: async () => {
        await mockDelay(250);
        return mockUsers;
    },
    getApplications: async () => {
        await mockDelay(250);
        return mockApplications;
    },
    updateApplicationStatus: async (id, status) => {
        await mockDelay(250);
        const idx = mockApplications.findIndex(a => a.id === Number(id));
        if (idx >= 0) {
            mockApplications[idx] = { ...mockApplications[idx], status };
            return mockApplications[idx];
        }
        throw new Error('Candidature introuvable');
    },
    getBlogCategories: async () => {
        await mockDelay(200);
        return mockBlogCategories; // pas d’endpoint côté backend pour le moment
    },
    createOrder: async (order) => {
        await mockDelay(500);
        return { success: true, orderId: Math.floor(Math.random() * 100000) };
    },
};

export default api;