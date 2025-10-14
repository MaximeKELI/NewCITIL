import React, { useState } from 'react';
import Button from '../components/Button.jsx';

export default function Contact() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [sent, setSent] = useState(false);

	const submit = (e) => {
		e.preventDefault();
		setSent(true);
		setTimeout(() => setSent(false), 2500);
	};

	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-2xl font-bold text-[#2C3E50] mb-2">Contact</h1>
			<p className="text-sm text-gray-700 mb-6">Une question ? Écrivez-nous, nous répondons rapidement.</p>
			<form onSubmit={submit} className="bg-white border rounded-lg p-6 space-y-4">
				<div>
					<label className="block text-sm text-[#2C3E50] mb-1">Nom</label>
					<input value={name} onChange={e => setName(e.target.value)} required className="w-full rounded border px-3 py-2" />
				</div>
				<div>
					<label className="block text-sm text-[#2C3E50] mb-1">Email</label>
					<input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded border px-3 py-2" />
				</div>
				<div>
					<label className="block text-sm text-[#2C3E50] mb-1">Message</label>
					<textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" required className="w-full rounded border px-3 py-2" />
				</div>
				<Button type="submit">Envoyer</Button>
				{sent && <p className="text-green-700 text-sm">Message envoyé !</p>}
			</form>
			<section className="mt-8 rounded-lg border bg-[#F9F9EA] p-6">
				<h2 className="font-semibold text-[#2C3E50]">Nos coordonnées</h2>
				<p className="text-sm text-gray-700 mt-2">Lomé, Togo • +228 90 01 38 02/91 12 05 00 • mpad.leadertech@gmail.com</p>
			</section>
		</div>
	);
}


