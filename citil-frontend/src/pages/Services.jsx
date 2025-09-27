import React from 'react';
import { motion } from 'framer-motion';

export default function Services() {
	const services = [
		{ icon: '☀️', title: 'Dimensionnement & installation solaire', desc: 'Étude, dimensionnement et pose de systèmes solaires pour sites résidentiels et professionnels.' },
		{ icon: '📡', title: 'Installation de GPS (sécurité des engins)', desc: 'Traqueurs GPS, géofencing et suivi temps réel pour véhicules et engins.' },
		{ icon: '🛠️', title: 'Maintenance informatique', desc: 'Diagnostic, optimisation, réparation et support préventif/correctif de votre parc.' },
		{ icon: '⚡', title: "Installation électrique d'habitat et d'industrie", desc: 'Conception, câblage, mise en conformité et tableaux électriques.' },
		{ icon: '🛒', title: 'Vente d’équipements électroniques & électriques', desc: 'Composants, capteurs, accessoires et solutions prêtes à l’emploi.' },
		{ icon: '🤝', title: 'Service après‑vente', desc: 'Assistance, garantie, pièces de rechange et accompagnement continu.' },
	];

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
			<header className="mb-10 text-center">
				<h1 className="text-3xl font-extrabold tracking-tight text-[#2C3E50]">Nos Services</h1>
				<p className="mt-2 text-sm text-gray-700">Des solutions fiables et adaptées à vos besoins, de l’étude à la maintenance.</p>
			</header>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{services.map(s => (
					<motion.div
						key={s.title}
						whileHover={{ y: -6, scale: 1.01 }}
						className="group relative rounded-2xl bg-white p-6 border shadow-sm overflow-hidden"
					>
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(52,152,219,0.08), rgba(241,196,15,0.08))' }} />
						<div className="relative z-10 flex items-start gap-4">
							<div className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#F9F9EA' }}>{s.icon}</div>
							<div>
								<h3 className="font-semibold text-[#2C3E50]">{s.title}</h3>
								<p className="text-sm text-gray-700 mt-2 leading-relaxed">{s.desc}</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<section className="mt-12 grid gap-6 lg:grid-cols-3">
				<div className="rounded-2xl border bg-[#F9F9EA] p-6 lg:col-span-2">
					<h2 className="font-semibold text-[#2C3E50]">Pourquoi CITIL ?</h2>
					<ul className="list-disc pl-5 text-sm text-gray-800 mt-2 space-y-1">
						<li>Expertise locale et internationale</li>
						<li>Interventions rapides et garanties</li>
						<li>Accompagnement et maintenance continue</li>
					</ul>
				</div>
				<div className="rounded-2xl border bg-white p-6">
					<h3 className="font-semibold text-[#2C3E50]">Besoin d’un devis ?</h3>
					<p className="text-sm text-gray-700 mt-2">Parlez‑nous de votre projet solaire, électrique ou sécurité.</p>
					<a href="/contact" className="inline-block mt-4 px-4 py-2 rounded-lg font-medium text-white" style={{ backgroundColor: '#3498DB' }}>Nous contacter</a>
				</div>
			</section>
		</div>
	);
}


