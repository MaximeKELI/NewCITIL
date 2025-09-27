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
			className="relative h-[80vh] sm:h-[90vh] flex items-start justify-center pt-4 sm:pt-6 pb-0 mb-0 bg-cover bg-center"
			style={{
				backgroundImage: "url('/assets/images/hero.jpg')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="absolute inset-0 bg-white/80" />
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2, duration: 0.7 }}
				className="relative z-10 text-center px-6 max-w-4xl mx-auto"
			>
				<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-tight lg:leading-tight tracking-tight mx-auto" style={{ color: '#1A1A1A' }}>
					...Votre Survie Dépend De La Technologie Et CITIL Est Votre Meilleur Partenaire
				</h1>
				{/*<p className="mt-4 text-base md:text-xl" style={{ color: '#1A1A1A' }}>
					Vente de composants électroniques et programmes de formation en robotique, IA et IoT.
				</p>*/}
				<div className="mt-8 flex flex-col gap-4 justify-center items-center max-w-md mx-auto">
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full">
						<Link
							to="/boutique"
							className="block w-full px-6 py-3 rounded-lg font-semibold text-white text-center"
							style={{ backgroundColor: '#3498DB' }}
						>
							Voir la boutique
						</Link>
					</motion.div>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full">
						<Link
							to="/formations"
							className="block w-full px-6 py-3 rounded-lg font-semibold text-center"
							style={{ borderWidth: 2, borderColor: '#3498DB', color: '#3498DB' }}
						>
							S'inscrire aux formations
						</Link>
					</motion.div>
				</div>
			</motion.div>
		</motion.section>
	);
}


