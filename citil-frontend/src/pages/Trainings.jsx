import { useState, useEffect } from 'react';
import TrainingCard from '../components/TrainingCard';
import { Search, Calendar, Users, BookOpen } from 'lucide-react';

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Simuler un appel API
  useEffect(() => {
    setTimeout(() => {
      const mockTrainings = [
        {
          id: 1,
          title: "Initiation à Arduino",
          description: "Apprenez à programmer des microcontrôleurs Arduino pour créer vos premiers projets électroniques.",
          price: 15000,
          duration_hours: 20,
          start_date: "2025-04-15",
          schedule: "Lun-Ven 18h-20h",
          image: "https://placehold.co/400x200/3B82F6/FFFFFF?text=Arduino+Initiation"
        },
        {
          id: 2,
          title: "Robotique Avancée",
          description: "Concevez et programmez des robots autonomes capables de naviguer et interagir avec leur environnement.",
          price: 25000,
          duration_hours: 30,
          start_date: "2025-05-03",
          schedule: "Sam-Dim 9h-12h",
          image: "https://placehold.co/400x200/10B981/FFFFFF?text=Robotique+Avancée"
        },
        {
          id: 3,
          title: "Programmation Python pour l'IA",
          description: "Maîtrisez Python et ses bibliothèques (TensorFlow, OpenCV) pour développer des applications d'intelligence artificielle.",
          price: 30000,
          duration_hours: 35,
          start_date: "2025-04-20",
          schedule: "Mer-Sam 14h-17h",
          image: "https://placehold.co/400x200/F59E0B/FFFFFF?text=Python+IA"
        },
        {
          id: 4,
          title: "IoT et Systèmes Embarqués",
          description: "Créez des objets connectés avec ESP32, MQTT et cloud, pour des solutions intelligentes en agriculture ou sécurité.",
          price: 28000,
          duration_hours: 28,
          start_date: "2025-05-10",
          schedule: "Lun-Jeu 17h-19h",
          image: "https://placehold.co/400x200/8B5CF6/FFFFFF?text=IoT+ESP32"
        }
      ];
      setTrainings(mockTrainings);
      setLoading(false);
    }, 800);
  }, []);

  const filteredTrainings = trainings.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Formations disponibles</h1>
        <p className="text-gray-600">Rejoignez nos stages pratiques en robotique, intelligence artificielle et programmation embarquée.</p>
      </div>

      {/* Bannière KIDS in TECH */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 p-4 rounded-full">
            <BookOpen size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">🎉 KIDS in TECH</h2>
            <p className="text-lg opacity-90">Des ateliers spécialement conçus pour stimuler la créativité technologique des jeunes.</p>
            <button className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
              Découvrir les ateliers
            </button>
          </div>
        </div>
      </div>

      {/* Filtre de recherche */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="relative">
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

      {/* Liste des formations */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des formations...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredTrainings.map(training => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      )}

      {filteredTrainings.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucune formation ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}