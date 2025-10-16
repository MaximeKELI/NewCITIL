import React from 'react';

export default function Footer() {
	return (
		<footer className="bg-[#2C3E50] text-white mt-auto">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
				<div>
					<h4 className="text-lg font-semibold mb-2">CITIL</h4>
					<p className="text-sm opacity-80">Cabinet d’Ingénierie des Technologies et Innovation le Leader</p>
				</div>
				<div>
					<h4 className="text-lg font-semibold mb-2">Contact</h4>
					<p className="text-sm opacity-90">Lomé, Togo</p>
					<a href="tel:+22890013802" className="text-sm opacity-90 hover:text-[#3498DB] transition-colors">+228 90 01 38 02/91 12 05 00</a>
					<a href="mailto:mpad.leadertech@gmail.com" className="text-sm opacity-90 hover:text-[#3498DB] transition-colors">mpad.leadertech@gmail.com</a>
				</div>
				<div>
					<h4 className="text-lg font-semibold mb-2">Suivez-nous</h4>
					<div className="flex gap-3 opacity-90 text-sm">
						<a href="https://facebook.com/citil.tg" target="_blank" rel="noopener noreferrer" className="hover:text-[#3498DB] transition-colors">Facebook</a>
						<a href="https://tiktok.com/@citil.tg" target="_blank" rel="noopener noreferrer" className="hover:text-[#3498DB] transition-colors">Tiktok</a>
						<a href="https://linkedin.com/company/citil-tg" target="_blank" rel="noopener noreferrer" className="hover:text-[#3498DB] transition-colors">LinkedIn</a>
					</div>
				</div>
			</div>
			<div className="text-center text-xs py-4 bg-black/20">© {new Date().getFullYear()} CITIL. Tous droits réservés.</div>
		</footer>
	);
}


