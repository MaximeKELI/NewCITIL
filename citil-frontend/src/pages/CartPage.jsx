import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, CreditCard, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(true);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6 opacity-50" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Votre panier est vide</h2>
        <p className="text-gray-600 mb-8">Ajoutez des produits depuis la boutique pour commencer.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Aller à la boutique <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Votre panier</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-semibold"
        >
          Vider le panier
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Liste des articles */}
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg flex gap-6">
              <img
                src={item.image || "https://placehold.co/80x80/6366f1/ffffff?text=P"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-indigo-600 font-bold">{item.price?.toLocaleString()} FCFA</p>
                
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                  
                  <span className="ml-4 font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} FCFA
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Résumé de la commande */}
        <div className="bg-white p-8 rounded-xl shadow-lg sticky top-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Récapitulatif</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total</span>
              <span>{getTotalPrice()?.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frais de livraison</span>
              <span>Gratuit</span>
            </div>
            <div className="border-t pt-2 font-bold flex justify-between text-lg">
              <span>Total</span>
              <span className="text-indigo-600">{getTotalPrice()?.toLocaleString()} FCFA</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
          >
            <CreditCard size={20} /> Passer la commande
          </Link>
        </div>
      </div>
    </div>
  );
}