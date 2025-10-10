import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ApiService } from '../services/api.js';

export default function Register() {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		
		if (password !== passwordConfirmation) {
			setError('Les mots de passe ne correspondent pas');
			setLoading(false);
			return;
		}
		
		try {
			await ApiService.register(name, email, password, passwordConfirmation);
			navigate('/');
		} catch (err) {
			setError(err.message || 'Erreur d\'inscription');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto py-10 px-4">
			<h1 className="text-2xl font-semibold mb-6">Créer un compte</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<div>
					<label className="block text-sm mb-1">Nom</label>
					<input type="text" className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
				</div>
				<div>
					<label className="block text-sm mb-1">Email</label>
					<input type="email" className="w-full border rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div>
					<label className="block text-sm mb-1">Mot de passe</label>
					<input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>
				<div>
					<label className="block text-sm mb-1">Confirmer le mot de passe</label>
					<input type="password" className="w-full border rounded px-3 py-2" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
				</div>
				<button type="submit" disabled={loading} className="w-full bg-[#2980B9] text-white py-2 rounded hover:bg-[#1F6A97]">
					{loading ? 'Création…' : 'Créer le compte'}
				</button>
			</form>
			<p className="mt-4 text-sm">Déjà inscrit ? <Link to="/login" className="text-[#2980B9] underline">Se connecter</Link></p>
		</div>
	);
}


