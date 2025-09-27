import React, { useState } from 'react';
import StepIndicator from '../components/StepIndicator.jsx';
import Button from '../components/Button.jsx';
import { useCart } from '../context/CartContext.js';
import { ApiService } from '../services/api.js';

export default function Checkout() {
	const { cartItems, clearCart } = useCart();
	const [step, setStep] = useState(1);
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [method, setMethod] = useState('cash');
	const [submitting, setSubmitting] = useState(false);
	const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

	const submitOrder = async () => {
		setSubmitting(true);
		try {
			await ApiService.createOrder({ items: cartItems, address, phone, method, total });
			clearCart();
			alert('Commande passée avec succès !');
		} catch (e) {
			alert("Erreur lors de la commande");
		} finally { setSubmitting(false); }
	};

	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
			<h1 className="text-2xl font-bold">Paiement</h1>
			<StepIndicator current={step} />
			{step === 1 && (
				<section className="bg-white border rounded-lg p-4">
					<h2 className="font-semibold mb-3">Résumé du panier</h2>
					<ul className="divide-y">
						{cartItems.map(i => (
							<li key={i.id} className="flex justify-between py-2 text-sm">
								<span>{i.name} × {i.quantity}</span>
								<span>{(i.price * i.quantity).toLocaleString()} CFA</span>
							</li>
						))}
					</ul>
					<div className="flex justify-between font-semibold pt-3">
						<span>Total</span>
						<span>{total.toLocaleString()} CFA</span>
					</div>
					<div className="pt-4"><Button onClick={() => setStep(2)}>Continuer</Button></div>
				</section>
			)}

			{step === 2 && (
				<section className="bg-white border rounded-lg p-4 space-y-3">
					<h2 className="font-semibold">Adresse de livraison</h2>
					<input value={address} onChange={e => setAddress(e.target.value)} placeholder="Adresse complète" className="w-full rounded border px-3 py-2" />
					<input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone" className="w-full rounded border px-3 py-2" />
					<div className="pt-2 flex gap-2">
						<Button variant="secondary" onClick={() => setStep(1)}>Retour</Button>
						<Button onClick={() => setStep(3)}>Continuer</Button>
					</div>
				</section>
			)}

			{step === 3 && (
				<section className="bg-white border rounded-lg p-4 space-y-3">
					<h2 className="font-semibold">Mode de paiement</h2>
					<label className="flex items-center gap-2"><input type="radio" checked={method==='cash'} onChange={() => setMethod('cash')} /> Espèces (à la livraison)</label>
					<label className="flex items-center gap-2"><input type="radio" checked={method==='tmoney'} onChange={() => setMethod('tmoney')} /> T-Money (simulation succès)</label>
					<label className="flex items-center gap-2"><input type="radio" checked={method==='flooz'} onChange={() => setMethod('flooz')} /> Flooz / Mixx by YAS (simulation succès)</label>
					<div className="pt-2 flex gap-2">
						<Button variant="secondary" onClick={() => setStep(2)}>Retour</Button>
						<Button disabled={submitting} onClick={submitOrder}>{submitting ? 'Envoi…' : 'Valider la commande'}</Button>
					</div>
				</section>
			)}
		</div>
	);
}


