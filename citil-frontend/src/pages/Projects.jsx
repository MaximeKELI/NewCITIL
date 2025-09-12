import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Trophy, Rocket, Lightbulb } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockProjects = [
        {
          id: 1,
          title: "Robot Autonome de Surveillance",
          description: "Robot mobile équipé de caméra et IA pour la détection d'intrusion, utilisé dans des sites sensibles.",
          technologies: ["Arduino", "Python", "OpenCV", "MQTT"],
          is_published: true,
          image: "https://placehold.co/400x250/06B6D4/FFFFFF?text=Robot+Surveillance",
          video_url: "https://youtube.com/demo-robot"
        },
        {
          id: 2,
          title: "Système d'Irrigation Intelligent",
          description: "Contrôle automatique de l'arrosage basé sur les capteurs d'humidité du sol et les prévisions météo.",
          technologies: ["ESP32", "IoT", "Firebase", "Node-RED"],
          is_published: true,
          image: "https://placehold.co/400x250/10B981/FFFFFF?text=Irrigation+Intelligent",
          video_url: "https://youtube.com/demo-irrigation"
        },
        {
          id: 3,
          title: "Bras Robotique 3D Imprimé",
          description: "Bras articulé contrôlé par interface tactile, utilisé pour des démonstrations pédagogiques.",
          technologies: ["Raspberry Pi", "C++", "ROS", "3D Printing"],
          is_published: true,
          image: "https://placehold.co/400x250/EC4899/FFFFFF?text=Bras+Robotique",
          video_url: "https://youtube.com/demo-bras"
        },
        {
          id: 4,
          title: "Station Météo Connectée",
          description: "Station qui mesure température, humidité, pression et transmet les données en temps réel sur le cloud.",
          technologies: ["ESP8266", "BME280", "InfluxDB", "Grafana"],
          is_published: true,
          image: "https://placehold.co/400x250/8B5CF6/FFFFFF?text=Station+Météo",
          video_url: "https://youtube.com/demo-meteo"
        }
      ];
      setProjects(mockProjects);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nos Projets Innovants</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Découvrez les réalisations concrètes de CITIL dans les domaines de la robotique, de l'IA et de l'Internet des Objets.
        </p>
      </div>

      {/* Badges de reconnaissance */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Reconnaissance & Partenariats</h3>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-green-700">
            <Trophy size={16} /> Participation au programme national VaRRIWA
          </div>
          <div className="flex items-center gap-2 text-blue-700">
            <Rocket size={16} /> Partenaire de l'innovation technologique
          </div>
          <div className="flex items-center gap-2 text-purple-700">
            <Lightbulb size={16} /> Membre du réseau KIDS in TECH
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des projets...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}