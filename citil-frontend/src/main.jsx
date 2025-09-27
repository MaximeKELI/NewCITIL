import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.js';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<CartProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</CartProvider>
	</React.StrictMode>
);


