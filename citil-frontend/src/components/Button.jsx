import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', as: Component = 'button', loading = false, disabled = false, ...props }) {
	const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors';
	const variants = {
		primary: 'bg-[#3498DB] text-white hover:bg-[#2980B9] disabled:bg-gray-400 disabled:cursor-not-allowed',
		secondary: 'border border-[#3498DB] text-[#3498DB] hover:bg-[#AED5E6] hover:text-[#2C3E50] disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed'
	};

	const isDisabled = disabled || loading;

	if (Component === 'button') {
		return (
			<motion.button 
				whileHover={!isDisabled ? { scale: 1.02 } : {}} 
				whileTap={!isDisabled ? { scale: 0.98 } : {}} 
				className={`${base} ${variants[variant]} ${className}`} 
				disabled={isDisabled}
				{...props}
			>
				{loading && (
					<svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				)}
				{children}
			</motion.button>
		);
	}

	const MotionComp = motion(Component);
	return (
		<MotionComp 
			whileHover={!isDisabled ? { scale: 1.02 } : {}} 
			whileTap={!isDisabled ? { scale: 0.98 } : {}} 
			className={`${base} ${variants[variant]} ${className}`} 
			{...props}
		>
			{loading && (
				<svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			)}
			{children}
		</MotionComp>
	);
}


