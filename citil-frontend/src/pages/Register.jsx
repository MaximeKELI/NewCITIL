import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export default function Register() {
	const navigate = useNavigate();
	const { register } = useAuth();
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
		
		// Validation côté client
		if (name.length < 4) {
			setError('Le nom doit contenir au moins 4 caractères');
			setLoading(false);
			return;
		}
		
		if (password.length < 8) {
			setError('Le mot de passe doit contenir au moins 8 caractères');
			setLoading(false);
			return;
		}
		
		if (password !== passwordConfirmation) {
			setError('Les mots de passe ne correspondent pas');
			setLoading(false);
			return;
		}
		
		try {
			console.log('Tentative d\'inscription:', { name, email, password, passwordConfirmation });
			const result = await register(name, email, password, passwordConfirmation);
			
			// Rediriger selon le rôle de l'utilisateur créé
			if (result.user && result.user.role === 'admin') {
				console.log('Utilisateur admin créé, redirection vers /admin-login');
				navigate('/admin-login');
			} else {
				console.log('Utilisateur client créé, redirection vers /');
				navigate('/');
			}
		} catch (err) {
			console.error('Erreur d\'inscription:', err);
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


