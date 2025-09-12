import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Simuler un produit (remplacé par API plus tard)
  const product = {
    id: 1,
    name: "Kit Robotique Éducationnel",
    price: 25000,
    description: "Un kit complet pour apprendre la robotique dès le collège. Comprend un microcontrôleur, des capteurs, des moteurs et un guide pas à pas.",
    image: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Kit+Robotique",
    category: "Kits",
    inStock: true,
    features: [
      "Microcontrôleur Arduino intégré",
      "Capteurs ultrason, IR et luminosité",
      "Moteurs DC avec roues",
      "Guide pédagogique inclus",
      "Compatible Scratch et Python"
    ],
    specs: {
      "Poids": "850g",
      "Dimensions": "30 x 20 x 10 cm",
      "Niveau": "Débutant à intermédiaire",
      "Âge recommandé": "12 ans et +"
    }
  };

  const handleAddToCart = () => {
    const item = { ...product, quantity };
    addToCart(item);
    alert(`${quantity} ${product.name}(s) ajouté(s) au panier !`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indipo-800 mb-6">
        <ArrowLeft size={18} /> Retour à la boutique
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Infos */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
              {product.category}
            </span>
            {product.inStock ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                En stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                Rupture
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-indigo-600">{product.price?.toLocaleString()} FCFA</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-gray-600 ml-2">(12 avis)</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          {/* Quantité */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium">Quantité :</label>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <ShoppingCart size={20} /> Ajouter au panier
            </button>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-green-700">
                <ShieldCheck size={16} /> Sécurisé
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <Truck size={16} /> Livraison rapide
              </div>
              <div className="flex items-center gap-2 text-orange-700">
                <Zap size={16} /> Support technique
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Détails techniques */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Caractéristiques techniques</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Fonctionnalités principales</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Spécifications</h3>
            <dl className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="text-gray-600">{key} :</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}