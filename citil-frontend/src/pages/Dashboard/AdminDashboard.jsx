import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Home, Package, BookOpen, Users, MessageCircle, BarChart, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Produits', value: '48', icon: Package, color: 'bg-blue-500' },
    { name: 'Formations', value: '12', icon: BookOpen, color: 'bg-green-500' },
    { name: 'Commandes', value: '23', icon: Users, color: 'bg-purple-500' },
    { name: 'Candidatures', value: '17', icon: MessageCircle, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Admin CITIL</span>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/admin/products"
              className="group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <Package className="mx-auto text-indigo-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-800">Gérer les produits</h3>
              <p className="text-sm text-gray-600 mt-1">Ajouter, modifier ou supprimer</p>
            </Link>

            <Link
              to="/admin/trainings"
              className="group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <BookOpen className="mx-auto text-green-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-800">Gérer les formations</h3>
              <p className="text-sm text-gray-600 mt-1">Planifier et suivre</p>
            </Link>

            <Link
              to="/admin/applications"
              className="group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <MessageCircle className="mx-auto text-purple-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-800">Voir les candidatures</h3>
              <p className="text-sm text-gray-600 mt-1">Trier et répondre</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Activité récente</h2>
          <div className="space-y-4">
            {[
              "Nouvelle commande #ORD-2025-045",
              "Inscription à la formation Arduino",
              "Nouvelle candidature reçue",
              "Produit 'Kit Robotique' mis à jour",
              "Blog post publié : 'IA dans le navigateur'"
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <BarChart size={20} className="text-gray-400" />
                <span className="text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
   
<nav className="fixed top-0 left-0 h-full w-16 bg-white shadow-lg border-r z-40 flex flex-col items-center pt-4 space-y-6">
  <Link to="/" className="text-gray-400 hover:text-indigo-600 transition-colors">
    <Home size={24} />
  </Link>
  <Link to="/admin/products" className="text-gray-400 hover:text-indigo-600 transition-colors">
    <Package size={24} />
  </Link>
  <Link to="/admin/categories" className="text-gray-400 hover:text-indigo-600 transition-colors">
    <Tag size={24} />
  </Link>
  <Link to="/admin/trainings" className="text-gray-400 hover:text-indigo-600 transition-colors">
    <BookOpen size={24} />
  </Link>
  <Link to="/admin/applications" className="text-gray-400 hover:text-indigo-600 transition-colors">
    <MessageCircle size={24} />
  </Link>
  <div className="mt-auto text-gray-400 hover:text-indigo-600 transition-colors">
    <Settings size={24} />
  </div>
</nav>
    </div>
  );
}