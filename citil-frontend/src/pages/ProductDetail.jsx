import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { ApiService } from '../services/api.js';
import { useCart } from '../context/CartContext.js';
import { getImageUrl } from '../utils/imageUtils.js';

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [qty, setQty] = useState(1);
	const { addToCart } = useCart();

	useEffect(() => { ApiService.getProduct(id).then(setProduct).finally(() => setLoading(false)); }, [id]);

	if (loading) return <div className="flex justify-center py-10"><LoadingSpinner /></div>;
	if (!product) return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">Produit introuvable.</div>;

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-2">
			<div>
				<motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={getImageUrl(product.image)} alt={product.name} className="w-full rounded-lg border object-cover" />
			</div>
			<div className="space-y-4">
				<h1 className="text-2xl font-bold text-[#2C3E50]">{product.name}</h1>
				<div className="text-[#3498DB] text-xl font-bold">{product.price.toLocaleString()} CFA</div>
				<p className="text-gray-700">{product.description}</p>
				<div className="text-sm text-gray-500">Stock: {product.stock}</div>
				<div className="flex items-center gap-3 pt-2">
					<input type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} className="w-20 rounded border px-3 py-2" />
					<Button onClick={() => addToCart(product, qty)}>Ajouter au panier</Button>
					<Button variant="secondary">Acheter maintenant</Button>
				</div>
			</div>
		</div>
	);
}


