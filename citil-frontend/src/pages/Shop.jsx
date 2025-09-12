import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Simuler un appel API
  useEffect(() => {
    setTimeout(() => {
      const mockProducts = [
        { id: 1, name: "Kit Robotique Éducationnel", price: 25000, image: "https://placehold.co/300x200/3B82F6/FFFFFF?text=Kit+Robotique", category: { name: "Kits" } },
        { id: 2, name: "Capteur Ultrason HC-SR04", price: 8000, image: "https://placehold.co/300x200/10B981/FFFFFF?text=Capteur+HC-SR04", category: { name: "Capteurs" } },
        { id: 3, name: "Arduino Uno R3", price: 22000, image: "https://placehold.co/300x200/F59E0B/FFFFFF?text=Arduino+Uno", category: { name: "Microcontrôleurs" } },
        { id: 4, name: "Module WiFi ESP8266", price: 12000, image: "https://placehold.co/300x200/8B5CF6/FFFFFF?text=ESP8266", category: { name: "Modules" } },
        { id: 5, name: "Servomoteur SG90", price: 5000, image: "https://placehold.co/300x200/EC4899/FFFFFF?text=Servomoteur", category: { name: "Actionneurs" } },
        { id: 6, name: "Écran OLED 0.96\"", price: 7500, image: "https://placehold.co/300x200/14B8A6/FFFFFF?text=OLED", category: { name: "Affichage" } }
      ];
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const categories = [...new Set(products.map(p => p.category.name))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Boutique en ligne</h1>
        <p className="text-gray-600">Découvrez notre catalogue de composants électroniques et kits de robotique.</p>
      </div>

      {/* Filtres */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des produits...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun produit ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}