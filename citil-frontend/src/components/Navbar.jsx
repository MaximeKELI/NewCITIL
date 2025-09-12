import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-700">CITIL</Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`hover:text-indigo-600 ${isActive('/') ? 'text-indigo-600 font-semibold' : ''}`}>Accueil</Link>
            <Link to="/shop" className={`hover:text-indigo-600 ${isActive('/shop') ? 'text-indigo-600 font-semibold' : ''}`}>Boutique</Link>
            <Link to="/trainings" className={`hover:text-indigo-600 ${isActive('/trainings') ? 'text-indigo-600 font-semibold' : ''}`}>Formations</Link>
            <Link to="/projects" className={`hover:text-indigo-600 ${isActive('/projects') ? 'text-indigo-600 font-semibold' : ''}`}>Projets</Link>
            <Link to="/blog" className={`hover:text-indigo-600 ${isActive('/blog') ? 'text-indigo-600 font-semibold' : ''}`}>Blog</Link>
            <Link to="/contact" className={`hover:text-indigo-600 ${isActive('/contact') ? 'text-indigo-600 font-semibold' : ''}`}>Contact</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-4 relative">
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Accueil</Link>
              <Link to="/shop" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Boutique</Link>
              <Link to="/trainings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Formations</Link>
              <Link to="/projects" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Projets</Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Blog</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
              <Link to="/cart" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Panier</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}