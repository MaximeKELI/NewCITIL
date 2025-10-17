
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.js';
import { ApiService } from '../services/api.js';
import { getAvatarUrl } from '../utils/avatarUtils.js';

export default function Profile() {
	const { user: authUser, logout: authLogout } = useAuth();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	});
	const [avatarFile, setAvatarFile] = useState(null);
	const [avatarPreview, setAvatarPreview] = useState(null);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		const loadUser = async () => {
			try {
				// Utiliser les données de l'AuthContext d'abord
				if (authUser) {
					setUser(authUser);
					setFormData({
						name: authUser.name || '',
						email: authUser.email || '',
						phone: authUser.phone || '',
						currentPassword: '',
						newPassword: '',
						confirmPassword: ''
					});
					setAvatarPreview(getAvatarUrl(authUser.avatar));
					setLoading(false);
					return;
				}

				// Fallback vers l'API si pas de données dans le contexte
				const response = await ApiService.getUserInfo();
				if (response.user_info) {
					const userInfo = response.user_info;
					setUser(userInfo);
					setFormData({
						name: userInfo.name || '',
						email: userInfo.email || '',
						phone: userInfo.phone || '',
						currentPassword: '',
						newPassword: '',
						confirmPassword: ''
					});
					setAvatarPreview(getAvatarUrl(userInfo.avatar));
				}
				setLoading(false);
			} catch (error) {
				console.error('Erreur lors du chargement du profil:', error);
				
				// Gestion spécifique des erreurs réseau
				if (error.isNetworkError) {
					setError('Erreur de connexion au serveur. Vérifiez que le serveur backend est démarré.');
				} else {
					setError(error.message || 'Erreur lors du chargement du profil');
				}
				
				// Fallback vers localStorage si l'API échoue
				const userData = localStorage.getItem('citil_user');
				if (userData) {
					const userInfo = JSON.parse(userData);
					setUser(userInfo);
					setFormData({
						name: userInfo.name || '',
						email: userInfo.email || '',
						phone: userInfo.phone || '',
						currentPassword: '',
						newPassword: '',
						confirmPassword: ''
					});
					setAvatarPreview(getAvatarUrl(userInfo.avatar));
				}
				setLoading(false);
			}
		};
		loadUser();
	}, [authUser]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Vérifier la taille du fichier (max 2MB)
			if (file.size > 2 * 1024 * 1024) {
				setError('La taille du fichier ne doit pas dépasser 2MB');
				return;
			}
			
			// Vérifier le type de fichier
			if (!file.type.startsWith('image/')) {
				setError('Veuillez sélectionner un fichier image valide');
				return;
			}
			
			setAvatarFile(file);
			
			// Créer un aperçu de l'image
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatarPreview(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
			setError('Les nouveaux mots de passe ne correspondent pas');
			return;
		}

		try {
			const updateData = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
			};

			// Ajouter les données de mot de passe seulement si un nouveau mot de passe est fourni
			if (formData.newPassword) {
				updateData.current_password = formData.currentPassword;
				updateData.new_password = formData.newPassword;
				updateData.new_password_confirmation = formData.confirmPassword;
			}

			// Ajouter l'avatar s'il a été sélectionné
			if (avatarFile) {
				updateData.avatar = avatarFile;
			}

			const response = await ApiService.updateProfile(updateData);
			setSuccess('Profil mis à jour avec succès !');
			setEditing(false);
			
			// Mettre à jour les données utilisateur locales avec la réponse de l'API
			const updatedUserInfo = response.user_info;
			
			// Mettre à jour le state local
			setUser(updatedUserInfo);
			
			// Réinitialiser l'avatar preview avec l'URL de l'avatar sauvegardé
			setAvatarPreview(getAvatarUrl(updatedUserInfo.avatar));
			
			// Réinitialiser le fichier avatar
			setAvatarFile(null);
		} catch (err) {
			setError(err.message || 'Erreur lors de la mise à jour du profil');
		}
	};

	const handleLogout = async () => {
		try {
			await authLogout();
			// La redirection sera gérée par le ProtectedRoute
		} catch (err) {
			console.error('Erreur lors de la déconnexion:', err);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-[#F9F9EA] to-white flex items-center justify-center">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					className="w-12 h-12 border-4 border-[#3498DB] border-t-transparent rounded-full"
				/>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-[#F9F9EA] to-white flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-[#2C3E50] mb-4">Utilisateur non trouvé</h1>
					<p className="text-gray-600">Veuillez vous reconnecter.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#F9F9EA] to-white py-12">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<div className="relative inline-block">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
							className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#3498DB] to-[#2980B9] flex items-center justify-center text-white text-4xl font-bold shadow-2xl overflow-hidden"
						>
							{avatarPreview ? (
								<img 
									src={avatarPreview} 
									alt="Avatar" 
									className="w-full h-full object-cover"
								/>
							) : (
								user.name ? user.name.charAt(0).toUpperCase() : 'U'
							)}
						</motion.div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
							className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
								<path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
							</svg>
						</motion.div>
					</div>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.6 }}
						className="text-4xl font-bold text-[#2C3E50] mt-6 mb-2"
					>
						{user.name}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="text-lg text-gray-600 mb-4"
					>
						{user.email}
					</motion.p>
					{user.role === 'admin' && (
						<motion.span
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
							className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white shadow-lg"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
								<path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
							</svg>
							Administrateur
						</motion.span>
					)}
				</motion.div>

				{/* Profile Form */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.6 }}
					className="bg-white rounded-2xl shadow-xl p-8"
				>
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-bold text-[#2C3E50]">
							Informations du profil
						</h2>
						<div className="flex gap-3">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setEditing(!editing)}
								className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
									editing 
										? 'bg-gray-500 text-white hover:bg-gray-600' 
										: 'bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white hover:from-[#2980B9] hover:to-[#1F6A97]'
								}`}
							>
								{editing ? 'Annuler' : 'Modifier le profil'}
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleLogout}
								className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-red-500 text-white hover:bg-red-600"
							>
								Déconnexion
							</motion.button>
						</div>
					</div>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
						>
							{error}
						</motion.div>
					)}

					{success && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
						>
							{success}
						</motion.div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Champ Avatar */}
						<div className="text-center">
							<label className="block text-sm font-medium text-gray-700 mb-4">
								Photo de profil
							</label>
							<div className="flex flex-col items-center space-y-4">
								<div className="relative">
									<input
										type="file"
										accept="image/*"
										onChange={handleAvatarChange}
										disabled={!editing}
										className="hidden"
										id="avatar-upload"
									/>
									<label
										htmlFor="avatar-upload"
										className={`cursor-pointer inline-flex items-center px-4 py-2 rounded-lg border-2 border-dashed transition-all duration-200 ${
											editing
												? 'border-[#3498DB] text-[#3498DB] hover:bg-[#3498DB]/5'
												: 'border-gray-300 text-gray-400 cursor-not-allowed'
										}`}
									>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
											<path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-4.03-4.03a1.5 1.5 0 0 0-2.122 0l-5.06 5.061a1.5 1.5 0 0 1-2.122 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
										</svg>
										{avatarFile ? 'Changer la photo' : 'Choisir une photo'}
									</label>
								</div>
								<p className="text-xs text-gray-500">
									Formats acceptés: JPG, PNG, GIF (max 2MB)
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Nom complet
								</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									disabled={!editing}
									className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
										editing 
											? 'border-gray-300 focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20' 
											: 'border-gray-200 bg-gray-50'
									}`}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									disabled={!editing}
									className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
										editing 
											? 'border-gray-300 focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20' 
											: 'border-gray-200 bg-gray-50'
									}`}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Téléphone
								</label>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									disabled={!editing}
									className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
										editing 
											? 'border-gray-300 focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20' 
											: 'border-gray-200 bg-gray-50'
									}`}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Rôle
								</label>
								<input
									type="text"
									value={user.role === 'admin' ? 'Administrateur' : 'Client'}
									disabled
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
								/>
							</div>
						</div>

						{editing && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								className="border-t pt-6"
							>
								<h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Changer le mot de passe</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Mot de passe actuel
										</label>
										<input
											type="password"
											name="currentPassword"
											value={formData.currentPassword}
											onChange={handleInputChange}
											className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all duration-200"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Nouveau mot de passe
										</label>
										<input
											type="password"
											name="newPassword"
											value={formData.newPassword}
											onChange={handleInputChange}
											className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all duration-200"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Confirmer le mot de passe
										</label>
										<input
											type="password"
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleInputChange}
											className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all duration-200"
										/>
									</div>
								</div>
							</motion.div>
						)}

						{editing && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="flex justify-end pt-6"
							>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									type="submit"
									className="px-8 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-semibold rounded-lg hover:from-[#27AE60] hover:to-[#229954] transition-all duration-200 shadow-lg"
								>
									Sauvegarder les modifications
								</motion.button>
							</motion.div>
						)}
					</form>
				</motion.div>

			</div>
		</div>
	);
}
