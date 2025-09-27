import React from 'react';

export default function LoadingSpinner({ className = '' }) {
	return (
		<div className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent text-[#3498DB] align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`} role="status" aria-label="Chargement" />
	);
}


