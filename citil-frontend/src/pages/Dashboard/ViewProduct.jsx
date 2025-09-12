import { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash2, Tag, DollarSign, Package } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      const mockProduct = {
        id: 1,
        name: "Kit Robotique Éducationnel",
        description: "Un kit complet pour apprendre la robotique dès le collège. Comprend un microcontrôleur, des capteurs, des moteurs et un guide pas à pas.",
        price: 25000,
        stock: 15,
        category: "Kits de robotique",
        reference: "KIT-ROB-001",
        image: "https://placehold.co/300x200/3B82F6/FFFFFF?text=Kit+Robotique",
        created_at: "2025-04-01T09:00:00Z",
        updated_at: "2025-04-01T09:00:00Z"
      };
      setProduct(mockProduct);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      navigate('/admin/products');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-16">
      <header className="bg-white shadow-sm border-b fixed top-0 left-16 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Détails du produit</h1>
            <button
              onClick={() => navigate('/admin/products')}
              className="flex items-center gap-2 text-indigo-600 hover:text-indipo-800"
            >
              <ArrowLeft size={18} /> Retour à la liste
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="text-gray-500" size={20} />
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign size={18} />
                  <span className="font-bold">{product.price?.toLocaleString()} FCFA</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Package size={18} />
                  <span>Stock : {product.stock}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Tag size={18} />
                  <span>Référence : {product.reference}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Edit size={20} /> Modifier
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Trash2 size={20} /> Supprimer
                </button>
              </div>
            </div>
          </div>

          {/* Métadonnées */}
          <div className="bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Date de création :</strong> {new Date(product.created_at).toLocaleDateString('fr-FR')}</div>
              <div><strong>Dernière modification :</strong> {new Date(product.updated_at).toLocaleDateString('fr-FR')}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}