/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: '#3498DB',
				secondary: '#F9F9EA',
				text: '#2C3E50',
				accent: '#AED5E6',
				hover: '#2980B9',
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Arial", "Noto Sans", "sans-serif"],
			},
		},
	},
	plugins: [],
};
