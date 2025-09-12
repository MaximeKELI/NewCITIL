import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockTrainings = [
        { id: 1, title: "Initiation à Arduino", price: 15000, duration_hours: 20, start_date: "2025-04-15", participants: 8, max_participants: 15 },
        { id: 2, title: "Robotique Avancée", price: 25000, duration_hours: 30, start_date: "2025-05-03", participants: 12, max_participants: 20 },
        { id: 3, title: "Programmation Python pour l'IA", price: 30000, duration_hours: 35, start_date: "2025-04-20", participants: 6, max_participants: 15 }
      ];
      setTrainings(mockTrainings);
      setLoading(false);
    }, 800);
  }, []);

  const filteredTrainings = trainings.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id, title) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la formation "${title}" ?`)) {
      setTrainings(trainings.filter(t => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-16">
      <header className="bg-white shadow-sm border-b fixed top-0 left-16 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Gestion des formations</h1>
            <button 
              onClick={() => navigate('/admin/trainings/add')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Ajouter une formation
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Search */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Trainings Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des formations...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix (FCFA)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée (h)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Début</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTrainings.map(training => (
                  <tr key={training.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{training.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{training.price?.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{training.duration_hours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(training.start_date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${(training.participants / training.max_participants) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{training.participants}/{training.max_participants}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <Link to={`/admin/trainings/edit/${training.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(training.id, training.title)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}