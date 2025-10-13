import React, { useState, useCallback, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { getAvatarUrl } from '../utils/avatarUtils.js';

export default function Navbar() {
	const { cartItems } = useCart();
	const { user, logout, isAdmin } = useAuth();
	const [open, setOpen] = useState(false);
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);
	const navigate = useNavigate();
	const count = cartItems.reduce((s, i) => s + i.quantity, 0);

	const onKeyDown = useCallback((e) => {
		if (open && e.key === 'Escape') setOpen(false);
	}, [open]);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [onKeyDown]);

	const navItem = (to, label) => (
		<NavLink
			to={to}
			className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-white bg-[#3498DB]' : 'text-[#2C3E50] hover:text-white hover:bg-[#2980B9]'}`}
			onClick={() => setOpen(false)}
		>
			{label}
		</NavLink>
	);

	return (
		<header className="bg-white/90 backdrop-blur sticky top-0 z-50 border-b">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-36 items-center justify-between">
					<Link to="/" className="flex items-center gap-3">
						<img src="/assets/images/Logo CITIL.png" alt="CITIL" className="h-32 w-80 object-contain" />
					</Link>
					<nav className="hidden md:flex items-center gap-2">
						{navItem('/', 'Accueil')}
						{navItem('/boutique', 'Boutique')}
						{navItem('/services', 'Services')}
						{navItem('/formations', 'Formations')}
						{navItem('/stages', 'Stages')}
						{navItem('/blog', 'Blog')}
						{navItem('/contact', 'Contact')}
						<Link to="/panier" className="relative px-3 py-2 rounded-md text-lg font-medium text-[#2C3E50] hover:text-white hover:bg-[#2980B9]">
							Panier
							{count > 0 && (
								<motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-[#3498DB] text-white text-xs h-5 min-w-[20px] px-1">
									{count}
								</motion.span>
							)}
						</Link>
						{user ? (
							<div className="relative">
								<button
									onClick={() => setProfileMenuOpen(!profileMenuOpen)}
									className="px-3 py-2 rounded-md text-sm font-medium text-[#2C3E50] hover:text-white hover:bg-[#2980B9] flex items-center gap-2 transition-all duration-200"
									aria-label="Menu profil"
								>
									<div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3498DB] to-[#2980B9] flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
										{user?.avatar ? (
											<img 
												src={getAvatarUrl(user.avatar)} 
												alt="Avatar" 
												className="w-full h-full object-cover"
											/>
										) : (
											user?.name ? user.name.charAt(0).toUpperCase() : 'U'
										)}
									</div>
									<span className="hidden sm:block">{user?.name || 'Utilisateur'}</span>
									<motion.svg 
										xmlns="http://www.w3.org/2000/svg" 
										viewBox="0 0 24 24" 
										fill="currentColor" 
										className="w-4 h-4"
										animate={{ rotate: profileMenuOpen ? 180 : 0 }}
										transition={{ duration: 0.2 }}
									>
										<path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
									</motion.svg>
								</button>
								
								<AnimatePresence>
									{profileMenuOpen && (
										<motion.div
											initial={{ opacity: 0, y: -10, scale: 0.95 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: -10, scale: 0.95 }}
											transition={{ duration: 0.2 }}
											className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
										>
											<div className="px-4 py-3 border-b border-gray-100">
												<p className="text-sm font-medium text-gray-900">{user?.name}</p>
												<p className="text-sm text-gray-500">{user?.email}</p>
												{user?.role === 'admin' && (
													<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#3498DB] text-white mt-1">
														Administrateur
													</span>
												)}
											</div>
											<div className="py-1">
												<Link
													to="/profil"
													onClick={() => setProfileMenuOpen(false)}
													className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
												>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-3">
														<path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
													</svg>
													Mon profil
												</Link>
												<button
													onClick={() => { logout(); setProfileMenuOpen(false); navigate('/'); }}
													className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
												>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-3">
														<path fillRule="evenodd" d="M3.75 4.5A2.25 2.25 0 0 1 6 2.25h6A2.25 2.25 0 0 1 14.25 4.5v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 0 12 3.75H6a.75.75 0 0 0-.75.75v12a.75.75 0 0 0 .75.75h6a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 1 1.5 0v3A2.25 2.25 0 0 1 12 19.5H6A2.25 2.25 0 0 1 3.75 17.25v-12Zm12.53 3.22a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h9.97l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
													</svg>
													Déconnexion
												</button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-[#2C3E50] hover:text-white hover:bg-[#2980B9] flex items-center gap-2 transition-all duration-200">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM3.75 20.1a8.25 8.25 0 1 1 16.5 0 .9.9 0 0 1-.9.9H4.65a.9.9 0 0 1-.9-.9Z" clipRule="evenodd" /></svg>
									<span>Connexion</span>
								</Link>
								<Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium bg-[#3498DB] text-white hover:bg-[#2980B9] flex items-center gap-2 transition-all duration-200">
									<span>Inscription</span>
								</Link>
							</div>
						)}
					</nav>
					<button onClick={() => setOpen(true)} className="md:hidden p-2 rounded hover:bg-[#AED5E6]" aria-label="Menu">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
					</button>
				</div>
			</div>

			{/* Mobile full-screen overlay menu */}
			<AnimatePresence>
				{open && (
					<>
						{/* Backdrop */}
						<motion.div
							key="backdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/40 z-40 md:hidden"
							onClick={() => setOpen(false)}
							aria-hidden="true"
						/>
						{/* Panel */}
						<motion.div
							key="panel"
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
							transition={{ type: 'spring', stiffness: 260, damping: 28 }}
							className="fixed inset-0 z-50 md:hidden bg-white flex flex-col"
							role="dialog"
							aria-modal="true"
						>
							<div className="flex items-center justify-between p-4 border-b">
								<div className="flex items-center gap-2">
									<img src="/assets/images/Logo CITIL.png" alt="CITIL" className="h-8 w-8 object-contain" />
									<span className="font-semibold text-[#2C3E50]">CITIL</span>
								</div>
								<button
									onClick={() => setOpen(false)}
									className="p-2 rounded-md hover:bg-[#AED5E6]/40"
									aria-label="Fermer le menu"
								>
									✕
								</button>
							</div>
							<div className="flex-1 overflow-y-auto">
								<div className="px-4 py-6">
									{/* Navigation principale - ordre vertical */}
									<div className="space-y-1">
										{navItem('/', 'Accueil')}
										{navItem('/boutique', 'Boutique')}
										{navItem('/services', 'Services')}
										{navItem('/formations', 'Formations')}
										{navItem('/stages', 'Stages')}
										{navItem('/blog', 'Blog')}
										{navItem('/contact', 'Contact')}
									</div>
									
									{/* Séparateur */}
									<div className="border-t my-4"></div>
									
									{/* Panier */}
									<div className="mb-4">
										<Link to="/panier" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-[#2C3E50] hover:text-white hover:bg-[#2980B9] flex items-center gap-3">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
												<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.318.114.362.278l2.558 9.64a.75.75 0 0 0 .706.522H17.25a.75.75 0 0 0 0-1.5H7.5l-.5-1.5h10.5a.75.75 0 0 0 .706-.522l2.558-9.64a.75.75 0 0 0-.362-.278H2.25Z" />
												<path d="M3.75 20.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM12.75 20.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
											</svg>
											Panier ({count})
										</Link>
									</div>
									
									
									{/* Séparateur */}
									<div className="border-t my-4"></div>
									
									{/* Compte/Déconnexion */}
									<div>
										{user ? (
											<button onClick={() => { logout(); setOpen(false); navigate('/'); }} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-[#2C3E50] hover:text-white hover:bg-[#2980B9] flex items-center gap-3">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
													<path fillRule="evenodd" d="M3.75 4.5A2.25 2.25 0 0 1 6 2.25h6A2.25 2.25 0 0 1 14.25 4.5v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 0 12 3.75H6a.75.75 0 0 0-.75.75v12a.75.75 0 0 0 .75.75h6a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 1 1.5 0v3A2.25 2.25 0 0 1 12 19.5H6A2.25 2.25 0 0 1 3.75 17.25v-12Zm12.53 3.22a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h9.97l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
												</svg>
												Déconnexion
											</button>
										) : (
											<Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-[#2C3E50] hover:text-white hover:bg-[#2980B9] flex items-center gap-3">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
													<path fillRule="evenodd" d="M12 2.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM3.75 20.1a8.25 8.25 0 1 1 16.5 0 .9.9 0 0 1-.9.9H4.65a.9.9 0 0 1-.9-.9Z" clipRule="evenodd" />
												</svg>
												Compte
											</Link>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
