import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import Hero from '../components/Hero.jsx';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { ApiService } from '../services/api.js';

export default function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ApiService.getProducts().then(setProducts).finally(() => setLoading(false));
	}, []);

	return (
		<div>
			<Hero />

			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold">Nos services</h2>
					<a href="/services" className="text-[#3498DB] hover:underline">Voir tous les services</a>
				</div>
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
						<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
							{services.map((s) => (
								<motion.div key={s.title} whileHover={{ y: -6 }} className="rounded-2xl bg-white border p-6 shadow-sm">
									<div className="flex items-start gap-4">
										<div className="h-10 w-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: '#F9F9EA' }}>{s.icon}</div>
										<div>
											<h3 className="font-semibold text-[#2C3E50]">{s.title}</h3>
											<p className="text-sm text-gray-600 mt-2">Étude, installation et accompagnement par nos experts.</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					);
				})()}
			</section>

			{/* À propos de nous */}
			<section className="bg-white border-t">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid gap-8 lg:grid-cols-2 items-center">
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-[#2C3E50]">À propos de nous</h2>
							<p className="mt-3 text-base text-gray-700 leading-relaxed">
								CITIL conçoit et déploie des solutions technologiques accessibles et durables: solaire, électricité,
								IoT, GPS, et accompagnement technique. Notre équipe combine expertise locale et standards
								internationaux pour accélérer vos projets, de l'étude au service après-vente.
							</p>
							<ul className="mt-5 grid gap-3 sm:grid-cols-2 text-base text-[#2C3E50]">
								<li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: '#3498DB' }} /> Interventions garanties et support réactif</li>
								<li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: '#F1C40F' }} /> Solutions adaptées à votre budget</li>
								<li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: '#2ECC71' }} /> Équipe pluridisciplinaire certifiée</li>
								<li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: '#9B59B6' }} /> Engagement qualité et sécurité</li>
							</ul>
							<div className="mt-6 flex flex-wrap gap-3">
								<a href="/contact" className="px-5 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#3498DB' }}>Nous contacter</a>
								<a href="/services" className="px-5 py-3 rounded-lg font-semibold" style={{ borderWidth: 2, borderColor: '#3498DB', color: '#3498DB' }}>Découvrir nos services</a>
							</div>
						</div>
						<div className="relative">
							<div className="rounded-2xl border overflow-hidden">
								<div className="aspect-[16/10] bg-[#F9F9EA] flex items-center justify-center">
									<span className="text-sm text-gray-600">Image / Illustration CITIL</span>
								</div>
							</div>
							<div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-70" style={{ background: 'radial-gradient(600px 200px at 30% 20%, rgba(52,152,219,0.12), transparent), radial-gradient(500px 200px at 80% 70%, rgba(241,196,15,0.12), transparent)' }} />
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold">Produits vedettes</h2>
					<Link to="/boutique" className="text-[#3498DB] hover:underline">Tout voir</Link>
				</div>
				{loading ? (
					<div className="flex justify-center py-10"><LoadingSpinner /></div>
				) : (
					<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
						{products.map(p => <ProductCard key={p.id} product={p} />)}
					</div>
				)}
			</section>

			<section className="bg-white border-t">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold">Témoignages</h2>
					</div>

					{(() => {
						const testimonials = [
							{ q: 'Des formations de qualité et très pratiques !', a: 'Afi, étudiante' },
							{ q: 'Le kit robot est parfait pour débuter.', a: 'Kossi, maker' },
							{ q: 'Super accompagnement pour mon projet IoT.', a: 'Ama, entrepreneure' },
							{ q: 'Installation solaire impeccable et dans les délais.', a: 'Jean, entrepreneur' },
							{ q: 'Le service après‑vente est au top.', a: 'Mireille, cliente' },
							{ q: 'Le suivi GPS a sécurisé ma flotte.', a: 'Sena, logisticien' },
						];

						const row = [...testimonials, ...testimonials];

						return (
							<div className="relative overflow-hidden">
								<motion.div
									className="flex gap-6"
									initial={{ x: 0 }}
									animate={{ x: ['0%', '-50%'] }}
									transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
									style={{ width: '200%' }}
								>
									{row.map((t, idx) => (
										<blockquote
											key={`${t.q}-${idx}`}
											className="w-[80%] sm:w-[50%] md:w-[33%] lg:w-[28%] shrink-0 rounded-2xl bg-[#F9F9EA] p-6 border shadow-sm"
										>
											<p className="text-[#2C3E50] leading-relaxed">“{t.q}”</p>
											<footer className="mt-3 text-sm text-gray-600">— {t.a}</footer>
										</blockquote>
									))}
								</motion.div>
							</div>
						);
					})()}
				</div>
			</section>
		</div>
	);
}


