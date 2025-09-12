import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Image, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockProjects = [
        {
          id: 1,
          title: "Robot Autonome de Surveillance",
          description: "Robot mobile équipé de caméra et IA pour la détection d'intrusion.",
          technologies: ["Arduino", "Python", "OpenCV"],
          is_published: true,
          image: "https://placehold.co/100x100/06B6D4/FFFFFF?text=Robot",
          video_url: "https://youtube.com/demo-robot"
        },
        {
          id: 2,
          title: "Système d'Irrigation Intelligent",
          description: "Contrôle automatique basé sur les capteurs d'humidité du sol.",
          technologies: ["ESP32", "IoT", "MQTT"],
          is_published: false,
          image: "https://placehold.co/100x100/10B981/FFFFFF?text=Irrigation",
          video_url: null
        }
      ];
      setProjects(mockProjects);
      setLoading(false);
    }, 800);
  }, []);

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (id) => {
    navigate(`/admin/projects/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const togglePublish = (id) => {
    setProjects(projects.map(p =>
      p.id === id ? { ...p, is_published: !p.is_published } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-16">
      <header className="bg-white shadow-sm border-b fixed top-0 left-16 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Gestion des projets</h1>
            <button 
              onClick={() => navigate('/admin/projects/add')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Ajouter un projet
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
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Projects Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des projets...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technologies</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={project.image} alt={project.title} className="h-12 w-12 object-cover rounded-lg" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{project.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {project.technologies.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePublish(project.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.is_published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {project.is_published ? 'Publié' : 'Brouillon'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleEdit(project.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                        {project.video_url && (
                          <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-900">
                            <Play size={18} />
                          </a>
                        )}
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