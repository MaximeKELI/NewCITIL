import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', as: Component = 'button', ...props }) {
	const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors';
	const variants = {
		primary: 'bg-[#3498DB] text-white hover:bg-[#2980B9]',
		secondary: 'border border-[#3498DB] text-[#3498DB] hover:bg-[#AED5E6] hover:text-[#2C3E50]'
	};

	if (Component === 'button') {
		return (
			<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
				{children}
			</motion.button>
		);
	}

	const MotionComp = motion(Component);
	return (
		<MotionComp whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
			{children}
		</MotionComp>
	);
}


