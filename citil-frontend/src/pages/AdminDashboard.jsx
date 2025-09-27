import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api.js';

const Stat = ({ label, value }) => (
	<div className="rounded-lg bg-white border shadow-sm p-4">
		<div className="text-sm text-gray-600">{label}</div>
		<div className="text-2xl font-bold text-[#2C3E50]">{value}</div>
	</div>
);

export default function AdminDashboard() {
	const [stats, setStats] = useState({ products: 0, orders: 0, users: 1 });
	const [products, setProducts] = useState([]);

	useEffect(() => {
		ApiService.getProducts().then((p) => {
			setProducts(p);
			setStats(s => ({ ...s, products: p.length }));
		});
	}, []);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
			<h1 className="text-2xl font-bold">Tableau de bord</h1>
			<div className="grid gap-4 md:grid-cols-3">
				<Stat label="Produits" value={stats.products} />
				<Stat label="Commandes" value={stats.orders} />
				<Stat label="Utilisateurs" value={stats.users} />
			</div>
			<section className="bg-white border rounded-lg p-4">
				<h2 className="font-semibold mb-3">Produits</h2>
				<div className="overflow-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="text-left">
								<th className="p-2">Nom</th>
								<th className="p-2">Prix</th>
								<th className="p-2">Stock</th>
								<th className="p-2">Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map(p => (
								<tr key={p.id} className="border-t">
									<td className="p-2">{p.name}</td>
									<td className="p-2">{p.price.toLocaleString()} CFA</td>
									<td className="p-2">{p.stock}</td>
									<td className="p-2">
										<button className="text-[#3498DB] hover:underline mr-2">Modifier</button>
										<button className="text-red-600 hover:underline">Supprimer</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}


