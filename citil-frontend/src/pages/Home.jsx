import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import TrainingCard from '../components/TrainingCard';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import { Code, Brain, Cpu, BookOpen, Briefcase, MessageCircle } from 'lucide-react';

// Données simulées (remplacées par l'API plus tard)
const featuredProducts = [
  { id: 1, name: "Kit Robotique Éducationnel", price: 25000, image: "https://placehold.co/300x200/3B82F6/FFFFFF?text=Kit+Robotique" },
  { id: 2, name: "Capteur Ultrason HC-SR04", price: 8000, image: "https://placehold.co/300x200/10B981/FFFFFF?text=Capteur+HC-SR04" },
  { id: 3, name: "Arduino Uno R3", price: 22000, image: "https://placehold.co/300x200/F59E0B/FFFFFF?text=Arduino+Uno" }
];

const services = [
  { icon: <Cpu size={24} />, title: "Vente de composants", desc: "Composants électroniques et kits pour makers, étudiants et professionnels." },
  { icon: <Brain size={24} />, title: "Intelligence Artificielle", desc: "Formations et projets en IA appliquée à la robotique." },
  { icon: <Code size={24} />, title: "Programmation embarquée", desc: "Apprenez Arduino, Raspberry Pi et langages embarqués." },
  { icon: <BookOpen size={24} />, title: "Formations spécialisées", desc: "Stages pratiques en robotique, IoT et développement." }
];

const recentTrainings = [
  { id: 1, title: "Initiation à Arduino", price: 15000, duration_hours: 20, start_date: "2025-04-15", schedule: "Lun-Ven 18h-20h", image: "https://placehold.co/400x200/8B5CF6/FFFFFF?text=Formation+Arduino" },
  { id: 2, title: "Robotique Avancée", price: 25000, duration_hours: 30, start_date: "2025-05-03", schedule: "Sam-Dim 9h-12h", image: "https://placehold.co/400x200/EC4899/FFFFFF?text=Robotique+Avancée" }
];

const recentProjects = [
  { id: 1, title: "Robot Autonome", description: "Robot capable de naviguer dans un environnement inconnu.", technologies: ["Arduino", "Python", "OpenCV"], is_published: true, image: "https://placehold.co/400x250/06B6D4/FFFFFF?text=Robot+Autonome" },
  { id: 2, title: "Système d'Irrigation Intelligent", description: "Contrôle automatique de l'arrosage basé sur les capteurs d'humidité.", technologies: ["ESP32", "IoT", "MQTT"], is_published: true, image: "https://placehold.co/400x250/10B981/FFFFFF?text=Irrigation+Intelligent" }
];

const recentPosts = [
  { id: 1, title: "Introduction à TensorFlow.js", excerpt: "Découvrez comment implémenter l'intelligence artificielle dans vos navigateurs web.", author: "Nanga Ditorga", created_at: "2025-04-01", category: { name: "IA" }, image: "https://placehold.co/400x200/EF4444/FFFFFF?text=TensorFlow.js" },
  { id: 2, title: "Les bases de MQTT pour l'IoT", excerpt: "Guide complet sur le protocole de communication pour objets connectés.", author: "M. Padaboh", created_at: "2025-03-28", category: { name: "IoT" }, image: "https://placehold.co/400x200/8B5CF6/FFFFFF?text=MQTT+IoT" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                <div className="text-indigo-600 mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits populaires */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Produits populaires</h2>
            <Link to="/shop" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1">
              Voir tout le catalogue <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Prochaines formations</h2>
            <Link to="/trainings" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1">
              Voir toutes les formations <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {recentTrainings.map(training => (
              <TrainingCard key={training.id} training={training} />
            ))}
          </div>
        </div>
      </section>

      {/* Projets */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Nos projets innovants</h2>
            <Link to="/projects" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1">
              Voir tous les projets <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {recentProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Blog & Tutoriels</h2>
            <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1">
              Lire tous les articles <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Briefcase size={48} className="mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-6">Devenez stagiaire chez CITIL</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez notre équipe et participez à des projets technologiques innovants. 
            Apprenez auprès des meilleurs experts en robotique, IA et IoT.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Candidater maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}