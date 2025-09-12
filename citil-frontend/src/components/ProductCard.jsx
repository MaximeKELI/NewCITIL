import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image || "https://placehold.co/300x200/6366f1/ffffff?text=Produit+CITIL"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {product.category?.name || "Électronique"}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description || "Composant électronique de haute qualité"}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">
            {product.price?.toLocaleString()} FCFA
          </span>
          
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}