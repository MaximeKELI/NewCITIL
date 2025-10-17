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

	const categories = useMemo(() => {
		const uniqueCategories = ['Tous', ...new Set(products.map(p => p.category?.name).filter(Boolean))];
		return uniqueCategories;
	}, [products]);

	const filtered = useMemo(() => {
		return products.filter(p => (
			(!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
			(!category || category === 'Tous' || p.category?.name === category)
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
			) : filtered.length === 0 ? (
				<div className="text-center py-12">
					<div className="text-gray-500 text-lg mb-4">
						{products.length === 0 ? 'Aucun produit disponible pour le moment.' : 'Aucun produit ne correspond à votre recherche.'}
					</div>
					{products.length === 0 && (
						<div className="text-sm text-gray-400">
							Les produits seront ajoutés par l'administrateur.
						</div>
					)}
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{filtered.map(p => <ProductCard key={p.id} product={p} />)}
				</div>
			)}
		</div>
	);
}


