import React from 'react';

export default function StepIndicator({ current = 1, steps = ['Panier', 'Livraison', 'Paiement'] }) {
	return (
		<ol className="flex items-center w-full">
			{steps.map((label, idx) => {
				const step = idx + 1;
				const active = step <= current;
				return (
					<li key={label} className={`flex-1 flex items-center ${idx !== steps.length - 1 ? 'after:content-[" "] after:flex-1 after:h-[2px] after:bg-[#AED5E6]' : ''}`}>
						<div className={`flex items-center gap-2 text-sm ${active ? 'text-[#3498DB]' : 'text-[#2C3E50] opacity-60'}`}>
							<span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${active ? 'bg-[#3498DB] text-white' : 'bg-gray-200 text-gray-600'}`}>{step}</span>
							<span>{label}</span>
						</div>
					</li>
				);
			})}
		</ol>
	);
}


