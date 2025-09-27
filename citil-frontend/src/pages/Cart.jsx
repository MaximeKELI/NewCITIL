import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { useCart } from '../context/CartContext.js';

export default function Cart() {
	const { cartItems, removeFromCart, addToCart, clearCart } = useCart();
	const navigate = useNavigate();
	const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-2xl font-bold mb-6">Panier</h1>
			{cartItems.length === 0 ? (
				<div className="text-gray-600">Votre panier est vide. <Link className="text-[#3498DB]" to="/boutique">Voir la boutique</Link></div>
			) : (
				<div className="grid gap-8 md:grid-cols-3">
					<div className="md:col-span-2 space-y-4">
						{cartItems.map(item => (
							<div key={item.id} className="flex items-center gap-4 bg-white border rounded-lg p-4">
								<img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
								<div className="flex-1">
									<h3 className="font-semibold text-[#2C3E50]">{item.name}</h3>
									<div className="text-sm text-gray-600">{item.price.toLocaleString()} CFA</div>
								</div>
								<div className="flex items-center gap-2">
									<button onClick={() => addToCart({ ...item }, -1)} className="px-2 py-1 rounded border">-</button>
									<span className="w-8 text-center">{item.quantity}</span>
									<button onClick={() => addToCart({ ...item }, 1)} className="px-2 py-1 rounded border">+</button>
								</div>
								<button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600 hover:underline">Retirer</button>
							</div>
						))}
					</div>
					<aside className="bg-white border rounded-lg p-4 h-fit">
						<div className="flex items-center justify-between font-semibold text-[#2C3E50]">
							<span>Total</span>
							<span>{total.toLocaleString()} CFA</span>
						</div>
						<div className="mt-4 flex flex-col gap-2">
							<Button onClick={() => navigate('/checkout')}>Procéder au paiement</Button>
							<Button variant="secondary" onClick={clearCart}>Vider le panier</Button>
						</div>
					</aside>
				</div>
			)}
		</div>
	);
}


