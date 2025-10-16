import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';
import { ApiService } from '../services/api.js';

export default function Trainings() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => { ApiService.getTrainings().then(setItems).finally(() => setLoading(false)); }, []);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-2xl font-bold mb-6">Catalogue de formations</h1>
			{loading ? (
				<div className="flex justify-center py-10"><LoadingSpinner /></div>
			) : items.length === 0 ? (
				<div className="text-center py-12">
					<div className="text-gray-500 text-lg mb-4">
						Aucune formation disponible pour le moment.
					</div>
					<div className="text-sm text-gray-400">
						Les formations seront ajoutées par l'administrateur.
					</div>
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
					{items.map(t => (
						<div key={t.id} className="rounded-lg bg-white border shadow-sm overflow-hidden">
							<img src={t.image} alt={t.title} className="h-40 w-full object-cover" />
							<div className="p-4 space-y-2">
								<h3 className="font-semibold text-[#2C3E50]">{t.title}</h3>
								<p className="text-sm text-gray-600">Date: {t.start_date} • Durée: {t.duration_hours}h</p>
								<p className="text-[#3498DB] font-bold">{t.price.toLocaleString()} CFA</p>
								<Button className="text-sm">S'inscrire</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}


