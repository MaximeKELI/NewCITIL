import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button.jsx';
import { useCart } from '../context/CartContext.js';

export default function ProductCard({ product }) {
	const { addToCart } = useCart();
	return (
		<motion.div whileHover={{ y: -4 }} className="rounded-lg overflow-hidden bg-white border shadow-sm">
			<Link to={`/produit/${product.id}`}>
				<img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
			</Link>
			<div className="p-4 space-y-2">
				<Link to={`/produit/${product.id}`} className="block font-semibold text-[#2C3E50]">{product.name}</Link>
				<div className="text-sm text-gray-600 line-clamp-2">{product.description}</div>
				<div className="flex items-center justify-between pt-2">
					<span className="text-lg font-bold text-[#3498DB]">{product.price.toLocaleString()} CFA</span>
					<Button onClick={() => addToCart(product)} className="text-sm">Ajouter au panier</Button>
				</div>
			</div>
		</motion.div>
	);
}


