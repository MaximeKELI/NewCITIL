import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.js';

export default function AdminLogin() {
	const navigate = useNavigate();
	const { login, logout } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		
		try {
			const result = await login(email, password);
			
			// Vérifier si l'utilisateur est admin
			if (result.user && result.user.role === 'admin') {
				console.log('Connexion admin réussie, redirection vers /admin');
				navigate('/admin');
			} else {
				setError('Accès refusé. Seuls les administrateurs peuvent accéder à cette page.');
				// Déconnecter l'utilisateur non-admin
				await logout();
			}
		} catch (err) {
			setError(err.message || 'Erreur de connexion');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#2C3E50] to-[#34495E] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<div className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-[#2C3E50]">
							<path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
						</svg>
					</div>
					<h2 className="mt-6 text-3xl font-bold text-white">
						Espace Administrateur
					</h2>
					<p className="mt-2 text-sm text-gray-300">
						Connectez-vous pour accéder au tableau de bord
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
				>
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-200 text-sm"
							>
								{error}
							</motion.div>
						)}

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-white mb-2">
								Adresse email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
								placeholder="admin@citil.tg"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-white mb-2">
								Mot de passe
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
								placeholder="••••••••"
							/>
						</div>

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type="submit"
							disabled={loading}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#2C3E50] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
						>
							{loading ? (
								<div className="flex items-center">
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2C3E50] mr-2"></div>
									Connexion...
								</div>
							) : (
								'Se connecter'
							)}
						</motion.button>
					</form>

					<div className="mt-6 text-center">
						<button
							onClick={() => navigate('/')}
							className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
						>
							← Retour à l'accueil
						</button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="text-center text-xs text-gray-400"
				>
					<p>Accès réservé aux administrateurs autorisés</p>
				</motion.div>
			</div>
		</div>
	);
}
