import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}
			className="relative h-[85vh] sm:h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F9F9EA] via-white to-[#F9F9EA]"
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-20 left-20 w-32 h-32 bg-[#3498DB]/10 rounded-full blur-3xl"
					animate={{
						x: [0, 100, 0],
						y: [0, -50, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className="absolute top-40 right-20 w-40 h-40 bg-[#2ECC71]/10 rounded-full blur-3xl"
					animate={{
						x: [0, -80, 0],
						y: [0, 60, 0],
						scale: [1, 0.8, 1],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className="absolute bottom-20 left-1/3 w-24 h-24 bg-[#F1C40F]/10 rounded-full blur-3xl"
					animate={{
						x: [0, 60, 0],
						y: [0, -40, 0],
						scale: [1, 1.3, 1],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className="absolute bottom-40 right-1/3 w-36 h-36 bg-[#9B59B6]/10 rounded-full blur-3xl"
					animate={{
						x: [0, -40, 0],
						y: [0, 80, 0],
						scale: [1, 0.9, 1],
					}}
					transition={{
						duration: 14,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
			</div>

			{/* Main content */}
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2, duration: 0.8 }}
				className="relative z-10 text-center px-6 max-w-6xl mx-auto"
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="mb-8"
				>
					<div className="w-20 h-20 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
						<span className="text-white text-2xl font-bold">C</span>
					</div>
				</motion.div>

				<motion.h1 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.6, duration: 0.8 }}
					className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8"
				>
					<div className="text-center">
						<span className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4 bg-gradient-to-r from-[#2C3E50] via-[#3498DB] to-[#2ECC71] bg-clip-text text-transparent">
							Votre Survie Dépend De La Technologie
						</span>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1, duration: 0.5 }}
						>
							<span className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#3498DB] to-[#2980B9] bg-clip-text text-transparent">
								Et CITIL Est Votre Meilleur Partenaire
							</span>
						</motion.div>
					</div>
				</motion.h1>

				<motion.p 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.8, duration: 0.6 }}
					className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
				>
					Solutions technologiques innovantes : solaire, électricité, IoT, GPS et formations expertes. 
					Accompagnement complet de l'étude à la maintenance.
				</motion.p>

				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 1, duration: 0.6 }}
					className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
				>
					<motion.div 
						whileHover={{ scale: 1.05, y: -2 }} 
						whileTap={{ scale: 0.95 }}
						className="w-full sm:w-auto"
					>
						<Link
							to="/boutique"
							className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#3498DB] to-[#2980B9] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
						>
							<span className="relative z-10 flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
									<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.318.114.362.278l2.558 9.64a.75.75 0 0 0 .706.522H17.25a.75.75 0 0 0 0-1.5H7.5l-.5-1.5h10.5a.75.75 0 0 0 .706-.522l2.558-9.64a.75.75 0 0 0-.362-.278H2.25Z" />
									<path d="M3.75 20.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM12.75 20.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
								</svg>
							Voir la boutique
							</span>
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-[#2980B9] to-[#1F6A97]"
								initial={{ x: "-100%" }}
								whileHover={{ x: 0 }}
								transition={{ duration: 0.3 }}
							/>
						</Link>
					</motion.div>

					<motion.div 
						whileHover={{ scale: 1.05, y: -2 }} 
						whileTap={{ scale: 0.95 }}
						className="w-full sm:w-auto"
					>
						<Link
							to="/formations"
							className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#3498DB] border-2 border-[#3498DB] rounded-2xl hover:bg-[#3498DB] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							<span className="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
									<path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 1-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 1 7.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.129 56.129 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
									<path d="M13.06 15.473a48.45 48.45 0 0 1-9.9 3.914m0 0A48.5 48.5 0 0 1 3 12.489V8.706c0-1.081.768-2.014 1.837-2.163a48.5 48.5 0 0 1 3.913-.963m0 0c1.018.144 2.01.317 2.985.517m-2.985-.517a48.5 48.5 0 0 0-2.985.517m0 0c-1.018.144-2.01.317-2.985.517m0 0a48.5 48.5 0 0 1 3.913-.963M15 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
								</svg>
							S'inscrire aux formations
							</span>
						</Link>
					</motion.div>
				</motion.div>

				{/* Floating stats */}
				<motion.div 
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 1.2, duration: 0.8 }}
					className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
				>
					{[
						{ number: "500+", label: "Projets réalisés", icon: "🚀" },
						{ number: "98%", label: "Satisfaction client", icon: "⭐" },
						{ number: "24/7", label: "Support technique", icon: "🛠️" }
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
							whileHover={{ scale: 1.05, y: -5 }}
							className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
						>
							<div className="text-3xl mb-2">{stat.icon}</div>
							<div className="text-3xl font-bold text-[#2C3E50] mb-1">{stat.number}</div>
							<div className="text-gray-600 font-medium">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ delay: 2, duration: 0.6 }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="w-6 h-10 border-2 border-[#3498DB] rounded-full flex justify-center"
				>
					<motion.div
						animate={{ y: [0, 12, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="w-1 h-3 bg-[#3498DB] rounded-full mt-2"
					/>
				</motion.div>
			</motion.div>
		</motion.section>
	);
}


