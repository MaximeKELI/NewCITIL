import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { ApiService } from '../services/api.js';

export default function Shop() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState('');

	useEffect(() => { ApiService.getProducts().then(setProducts).finally(() => setLoading(false)); }, []);

	const categories = useMemo(() => ['Tous', 'Arduino', 'Capteurs', 'Kits', 'Solaire'], []);

	const filtered = useMemo(() => {
		return products.filter(p => (
			(!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
			(!category || category === 'Tous' || (category === 'Arduino' && p.name.toLowerCase().includes('arduino')) || (category === 'Capteurs' && p.name.toLowerCase().includes('capteur')) || (category === 'Solaire' && p.name.toLowerCase().includes('solaire')) || (category === 'Kits' && p.name.toLowerCase().includes('kit')))
		));
	}, [products, query, category]);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-2xl font-bold mb-6">Boutique</h1>
			<div className="flex flex-col sm:flex-row gap-3 mb-6">
				<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un produit…" className="flex-1 rounded border px-3 py-2" />
				<select value={category} onChange={e => setCategory(e.target.value)} className="rounded border px-3 py-2 w-full sm:w-56">
					{categories.map(c => <option key={c} value={c}>{c}</option>)}
				</select>
			</div>
			{loading ? (
				<div className="flex justify-center py-10"><LoadingSpinner /></div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{filtered.map(p => <ProductCard key={p.id} product={p} />)}
				</div>
			)}
		</div>
	);
}


