import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState(() => {
		try {
			const raw = localStorage.getItem('citil_cart');
			return raw ? JSON.parse(raw) : [];
		} catch (e) {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem('citil_cart', JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (product, quantity = 1) => {
		setCartItems(prev => {
			const existing = prev.find(item => item.id === product.id);
			if (existing) {
				const next = prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
				return next.filter(i => i.quantity > 0);
			}
			return [...prev, { ...product, quantity }];
		});
	};

	const removeFromCart = (productId) => {
		setCartItems(prev => prev.filter(item => item.id !== productId));
	};

	const clearCart = () => setCartItems([]);

	const value = useMemo(() => ({ cartItems, addToCart, removeFromCart, clearCart }), [cartItems]);

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
};


