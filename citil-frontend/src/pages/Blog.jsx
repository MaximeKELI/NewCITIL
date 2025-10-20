import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { ApiService } from '../services/api.js';
import { getImageUrl } from '../utils/imageUtils.js';

export default function Blog() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => { ApiService.getBlogPosts().then(setPosts).finally(() => setLoading(false)); }, []);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-2xl font-bold mb-6">Blog</h1>
			{loading ? (
				<div className="flex justify-center py-10"><LoadingSpinner /></div>
			) : posts.length === 0 ? (
				<div className="text-center py-12">
					<div className="text-gray-500 text-lg mb-4">
						Aucun article de blog disponible pour le moment.
					</div>
					<div className="text-sm text-gray-400">
						Les articles seront publiés par l'administrateur.
					</div>
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
					{posts.map(p => (
						<article key={p.id} className="rounded-lg bg-white border shadow-sm overflow-hidden">
							<img src={getImageUrl(p.image)} alt={p.title} className="h-40 w-full object-cover" />
							<div className="p-4 space-y-2">
								<h3 className="font-semibold text-[#2C3E50]">{p.title}</h3>
								<p className="text-sm text-gray-600 line-clamp-3">{p.excerpt}</p>
								<button className="text-[#3498DB] hover:underline text-sm">Lire la suite</button>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
}


