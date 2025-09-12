import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="text-red-600" size={40} />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
          <p className="text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a peut-être été déplacée.
          </p>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Voici quelques liens utiles :
            </p>
            
            <div className="space-y-3">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                <Home size={18} /> Accueil
              </Link>
              
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
              >
                Boutique
              </Link>
              
              <Link
                to="/trainings"
                className="flex items-center justify-center gap-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
              >
                Formations
              </Link>
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CITIL - Cabinet d’Ingénierie des Technologies et Innovation le Leader
          </p>
        </div>
      </div>
    </div>
  );
}