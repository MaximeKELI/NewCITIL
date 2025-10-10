import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { ApiService } from '../services/api.js';

export default function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ApiService.getProducts().then(setProducts).finally(() => setLoading(false));
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#F9F9EA] via-white to-[#F9F9EA]">
			<Hero />

			<motion.section 
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
			>
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex items-center justify-between mb-12"
				>
					<h2 className="text-4xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#3498DB] bg-clip-text text-transparent">
						Nos services
					</h2>
					<motion.a 
						href="/services" 
						className="text-[#3498DB] hover:text-[#2980B9] font-semibold transition-all duration-300 hover:underline flex items-center gap-2"
						whileHover={{ x: 5 }}
					>
						Voir tous les services
						<motion.svg 
							xmlns="http://www.w3.org/2000/svg" 
							viewBox="0 0 24 24" 
							fill="currentColor" 
							className="w-4 h-4"
							animate={{ x: [0, 5, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							<path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
						</motion.svg>
					</motion.a>
				</motion.div>
				{(() => {
					const services = [
						{ icon: '☀️', title: 'Dimensionnement & installation solaire' },
						{ icon: '📡', title: 'Installation de GPS (sécurité des engins)' },
						{ icon: '🛠️', title: 'Maintenance informatique' },
						{ icon: '⚡', title: "Installation électrique d'habitat et d'industrie" },
						{ icon: '🛒', title: 'Vente d’équipements électroniques & électriques' },
						{ icon: '🤝', title: 'Service après‑vente' },
					];
					return (
						<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
							{services.map((s, index) => (
								<motion.div 
									key={s.title} 
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * index }}
									whileHover={{ 
										y: -8, 
										scale: 1.02,
										transition: { duration: 0.2 }
									}} 
									className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
								>
									<div className="flex items-start gap-6">
										<motion.div 
											className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#3498DB] to-[#2980B9] flex items-center justify-center text-2xl shadow-lg"
											whileHover={{ rotate: 360 }}
											transition={{ duration: 0.6 }}
										>
											{s.icon}
										</motion.div>
										<div className="flex-1">
											<h3 className="font-bold text-[#2C3E50] text-lg mb-3 group-hover:text-[#3498DB] transition-colors duration-300">
												{s.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												Étude, installation et accompagnement par nos experts certifiés.
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					);
				})()}
			</motion.section>

			{/* À propos de nous */}
			<motion.section 
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="relative bg-gradient-to-br from-white via-[#F9F9EA] to-white py-20 overflow-hidden"
			>
				{/* Background decoration */}
				<div className="absolute inset-0 bg-gradient-to-r from-[#3498DB]/5 to-[#2ECC71]/5"></div>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-20 left-20 w-32 h-32 bg-[#3498DB]/10 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 right-20 w-40 h-40 bg-[#2ECC71]/10 rounded-full blur-3xl"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#F1C40F]/5 rounded-full blur-3xl"></div>
				</div>
				
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-2 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<motion.h2 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
								className="text-4xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#3498DB] bg-clip-text text-transparent mb-6"
							>
								À propos de nous
							</motion.h2>
							<motion.p 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
								className="text-lg text-gray-700 leading-relaxed mb-8"
							>
								CITIL conçoit et déploie des solutions technologiques accessibles et durables: solaire, électricité,
								IoT, GPS, et accompagnement technique. Notre équipe combine expertise locale et standards
								internationaux pour accélérer vos projets, de l'étude au service après-vente.
							</motion.p>
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								viewport={{ once: true }}
								className="grid gap-4 sm:grid-cols-2 mb-8"
							>
								{[
									{ color: '#3498DB', text: 'Interventions garanties et support réactif' },
									{ color: '#F1C40F', text: 'Solutions adaptées à votre budget' },
									{ color: '#2ECC71', text: 'Équipe pluridisciplinaire certifiée' },
									{ color: '#9B59B6', text: 'Engagement qualité et sécurité' }
								].map((item, index) => (
									<motion.div 
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5, delay: 0.1 * index }}
										viewport={{ once: true }}
										className="flex items-start gap-3 group"
									>
										<motion.div 
											className="mt-1 h-3 w-3 rounded-full shadow-lg"
											style={{ backgroundColor: item.color }}
											whileHover={{ scale: 1.2 }}
											transition={{ duration: 0.2 }}
										/>
										<span className="text-[#2C3E50] group-hover:text-[#3498DB] transition-colors duration-300">
											{item.text}
										</span>
									</motion.div>
								))}
							</motion.div>
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.5 }}
								viewport={{ once: true }}
								className="flex flex-wrap gap-4"
							>
								<motion.a 
									href="/contact" 
									className="px-8 py-4 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Nous contacter
								</motion.a>
								<motion.a 
									href="/services" 
									className="px-8 py-4 border-2 border-[#3498DB] text-[#3498DB] font-semibold rounded-xl hover:bg-[#3498DB] hover:text-white transition-all duration-300"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Découvrir nos services
								</motion.a>
							</motion.div>
						</motion.div>
						<motion.div 
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="relative"
						>
							<motion.div 
								className="rounded-3xl border border-gray-200 overflow-hidden shadow-2xl"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
							>
								<div className="aspect-[16/10] bg-gradient-to-br from-[#3498DB]/10 to-[#2ECC71]/10 flex items-center justify-center relative">
									<div className="absolute inset-0 bg-gradient-to-br from-[#3498DB]/5 to-[#2ECC71]/5"></div>
									<motion.div
										animate={{ 
											scale: [1, 1.1, 1],
											rotate: [0, 5, -5, 0]
										}}
										transition={{ 
											duration: 4, 
											repeat: Infinity,
											ease: "easeInOut"
										}}
										className="text-center z-10"
									>
										<div className="w-24 h-24 bg-gradient-to-br from-[#3498DB] to-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
											<span className="text-white text-2xl font-bold">C</span>
							</div>
										<span className="text-[#2C3E50] font-semibold">CITIL Solutions</span>
									</motion.div>
								</div>
							</motion.div>
							{/* Floating elements */}
							<motion.div 
								className="absolute -top-4 -right-4 w-8 h-8 bg-[#3498DB] rounded-full"
								animate={{ 
									y: [0, -10, 0],
									rotate: [0, 180, 360]
								}}
								transition={{ 
									duration: 3, 
									repeat: Infinity,
									ease: "easeInOut"
								}}
							/>
							<motion.div 
								className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#2ECC71] rounded-full"
								animate={{ 
									y: [0, 10, 0],
									rotate: [0, -180, -360]
								}}
								transition={{ 
									duration: 4, 
									repeat: Infinity,
									ease: "easeInOut"
								}}
							/>
						</motion.div>
					</div>
				</div>
			</motion.section>

			<motion.section 
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
			>
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="flex items-center justify-between mb-12"
				>
					<h2 className="text-4xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#3498DB] bg-clip-text text-transparent">
						Produits vedettes
					</h2>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link to="/boutique" className="text-[#3498DB] hover:text-[#2980B9] font-semibold transition-all duration-300 hover:underline flex items-center gap-2">
							Tout voir
							<motion.svg 
								xmlns="http://www.w3.org/2000/svg" 
								viewBox="0 0 24 24" 
								fill="currentColor" 
								className="w-4 h-4"
								animate={{ x: [0, 5, 0] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								<path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
							</motion.svg>
						</Link>
					</motion.div>
				</motion.div>
				{loading ? (
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex justify-center py-20"
					>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
							className="w-16 h-16 border-4 border-[#3498DB] border-t-transparent rounded-full"
						/>
					</motion.div>
				) : (
					<motion.div 
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="grid gap-8 sm:grid-cols-2 md:grid-cols-3"
					>
						{products.map((p, index) => (
							<motion.div
								key={p.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 * index }}
								viewport={{ once: true }}
							>
								<ProductCard product={p} />
							</motion.div>
						))}
					</motion.div>
				)}
			</motion.section>

			<motion.section 
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="relative bg-gradient-to-br from-[#F9F9EA] via-white to-[#F9F9EA] py-20 overflow-hidden"
			>
				{/* Background decoration */}
				<div className="absolute inset-0 bg-gradient-to-r from-[#3498DB]/5 to-[#2ECC71]/5"></div>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-10 left-10 w-24 h-24 bg-[#3498DB]/10 rounded-full blur-2xl"></div>
					<div className="absolute bottom-10 right-10 w-32 h-32 bg-[#2ECC71]/10 rounded-full blur-2xl"></div>
					</div>
				
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#3498DB] bg-clip-text text-transparent mb-4">
							Témoignages clients
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Découvrez ce que nos clients disent de nos services et solutions
						</p>
					</motion.div>

					{(() => {
						const testimonials = [
							{ q: 'Des formations de qualité et très pratiques !', a: 'Afi, étudiante', rating: 5 },
							{ q: 'Le kit robot est parfait pour débuter.', a: 'Kossi, maker', rating: 5 },
							{ q: 'Super accompagnement pour mon projet IoT.', a: 'Ama, entrepreneure', rating: 5 },
							{ q: 'Installation solaire impeccable et dans les délais.', a: 'Jean, entrepreneur', rating: 5 },
							{ q: 'Le service après‑vente est au top.', a: 'Mireille, cliente', rating: 5 },
							{ q: 'Le suivi GPS a sécurisé ma flotte.', a: 'Sena, logisticien', rating: 5 },
						];

						const row = [...testimonials, ...testimonials];

						return (
							<div className="relative overflow-hidden">
								<motion.div
									className="flex gap-8"
									initial={{ x: 0 }}
									animate={{ x: ['0%', '-50%'] }}
									transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
									style={{ width: '200%' }}
								>
									{row.map((t, idx) => (
										<motion.div
											key={`${t.q}-${idx}`}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.6, delay: idx * 0.1 }}
											className="w-[80%] sm:w-[50%] md:w-[33%] lg:w-[28%] shrink-0"
										>
											<div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
												<div className="flex items-center mb-4">
													{[...Array(t.rating)].map((_, i) => (
														<motion.svg
															key={i}
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															fill="currentColor"
															className="w-5 h-5 text-[#F1C40F]"
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															transition={{ delay: i * 0.1 }}
														>
															<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
														</motion.svg>
													))}
												</div>
												<blockquote className="text-[#2C3E50] leading-relaxed text-lg mb-6">
													"{t.q}"
										</blockquote>
												<footer className="flex items-center gap-3">
													<div className="w-10 h-10 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full flex items-center justify-center text-white font-semibold">
														{t.a.charAt(0)}
													</div>
													<span className="text-gray-600 font-medium">— {t.a}</span>
												</footer>
											</div>
										</motion.div>
									))}
								</motion.div>
							</div>
						);
					})()}
				</div>
			</motion.section>
		</div>
	);
}


