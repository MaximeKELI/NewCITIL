import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import './styles/responsive.css';
import DebugAuth from './components/DebugAuth.jsx';
import AdminTestButton from './components/AdminTestButton.jsx';
import ResponsiveTest from './components/ResponsiveTest.jsx';
import ResponsiveDemo from './components/ResponsiveDemo.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Trainings from './pages/Trainings.jsx';
import Blog from './pages/Blog.jsx';
import Stages from './pages/Stages.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Overview from './pages/admin/Overview.jsx';
import Stats from './pages/admin/Stats.jsx';
import ProductsAdmin from './pages/admin/Products.jsx';
import CategoriesAdmin from './pages/admin/Categories.jsx';
import TrainingsAdmin from './pages/admin/Trainings.jsx';
import BlogAdmin from './pages/admin/Blog.jsx';
import StagesAdmin from './pages/admin/Stages.jsx';
import UsersAdmin from './pages/admin/Users.jsx';
import SettingsAdmin from './pages/admin/Settings.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';

const PageWrapper = ({ children }) => (
	<motion.main
		initial={{ opacity: 0, y: 12 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -12 }}
		transition={{ duration: 0.25 }}
		className="min-h-screen bg-[#F9F9EA] text-[#2C3E50]"
	>
		{children}
	</motion.main>
);

const ProtectedRoute = ({ children, requireAdmin = false }) => {
	const { user, loading } = useAuth();
	
	console.log('ProtectedRoute - Loading:', loading, 'User:', user, 'RequireAdmin:', requireAdmin);
	
	if (loading) {
		console.log('ProtectedRoute - En cours de chargement...');
		return (
			<div className="min-h-screen bg-[#F9F9EA] flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2980B9] mx-auto"></div>
					<p className="mt-4 text-[#2C3E50]">Chargement...</p>
				</div>
			</div>
		);
	}
	
	if (!user) {
		console.log('ProtectedRoute - Aucun utilisateur, redirection vers login');
		return <Navigate to="/login" replace />;
	}
	
	if (requireAdmin && user.role !== 'admin') {
		console.log('ProtectedRoute - Utilisateur non admin, rôle:', user.role);
		return (
			<div className="min-h-screen bg-[#F9F9EA] flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-red-600 mb-4">Accès Refusé</h1>
					<p className="text-[#2C3E50] mb-4">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
					<p className="text-sm text-gray-500">Rôle actuel: {user.role}</p>
					<Navigate to="/" replace />
				</div>
			</div>
		);
	}
	
	console.log('ProtectedRoute - Accès autorisé');
	return children;
};

const ScrollToTop = () => {
	const { pathname } = useLocation();
	useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
	return null;
};

function AppContent() {
	const location = useLocation();
	return (
		<div className="flex min-h-screen flex-col">
			<DebugAuth />
			<AdminTestButton />
			<ResponsiveTest />
			<ResponsiveDemo />
			<Navbar />
			<ScrollToTop />
			<AnimatePresence mode="wait">
				<PageWrapper key={location.pathname}>
					<Routes location={location}>
						<Route path="/" element={<Home />} />
						<Route path="/boutique" element={<Shop />} />
						<Route path="/produit/:id" element={<ProductDetail />} />
						<Route path="/formations" element={<Trainings />} />
						<Route path="/stages" element={<Stages />} />
						<Route path="/services" element={<Services />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/panier" element={<Cart />} />
						<Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
						<Route path="/contact" element={<Contact />} />
						{/* Routes admin séparées */}
						<Route path="/admin-login" element={<AdminLogin />} />
						<Route path="/admin/*" element={<ProtectedRoute requireAdmin={true}><AdminLayout /></ProtectedRoute>}>
							<Route index element={<Navigate to="overview" replace />} />
							<Route path="overview" element={<Overview />} />
							<Route path="statistiques" element={<Stats />} />
							<Route path="produits" element={<ProductsAdmin />} />
							<Route path="categories" element={<CategoriesAdmin />} />
							<Route path="formations" element={<TrainingsAdmin />} />
							<Route path="blog" element={<BlogAdmin />} />
							<Route path="stages" element={<StagesAdmin />} />
							<Route path="utilisateurs" element={<UsersAdmin />} />
							<Route path="parametres" element={<SettingsAdmin />} />
						</Route>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</PageWrapper>
			</AnimatePresence>
			<Footer />
		</div>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}
