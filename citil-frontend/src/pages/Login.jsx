import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	// const [success, setSuccess] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		// setSuccess('');
		setLoading(true);
		
		// Validation côté client
		if (!email || !password) {
			setError('Veuillez remplir tous les champs');
			setLoading(false);
			return;
		}
		
		try {
			const result = await login(email, password);
			// setSuccess('Connexion réussie !');
			
			// Rediriger selon le rôle de l'utilisateur connecté
			if (result.user && result.user.role === 'admin') {
				console.log('Connexion admin, redirection vers /admin-login');
				navigate('/admin-login');
			} else {
				console.log('Connexion client, redirection vers /');
				navigate('/');
			}
		} catch (err) {
			setError(err.message || 'Erreur de connexion');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto py-10 px-4">
			<h1 className="text-2xl font-semibold mb-6">Connexion</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<div>
					<label className="block text-sm mb-1">Email</label>
					<input type="email" className="w-full border rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div>
					<label className="block text-sm mb-1">Mot de passe</label>
					<input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>
				<button type="submit" disabled={loading} className="w-full bg-[#2980B9] text-white py-2 rounded hover:bg-[#1F6A97]">
					{loading ? 'Connexion…' : 'Se connecter'}
				</button>
			</form>
			<p className="mt-4 text-sm">Pas de compte ? <Link to="/register" className="text-[#2980B9] underline">Créer un compte</Link></p>
		</div>
	);
}


