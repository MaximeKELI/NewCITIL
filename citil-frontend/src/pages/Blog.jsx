import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { Search, BookOpen, PenTool } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Simuler un appel API
  useEffect(() => {
    setTimeout(() => {
      const mockPosts = [
        {
          id: 1,
          title: "Introduction à TensorFlow.js : IA dans le navigateur",
          excerpt: "Découvrez comment implémenter l'intelligence artificielle directement dans vos applications web sans serveur.",
          author: "Nanga Ditorga",
          created_at: "2025-04-01",
          published: true,
          category: { name: "IA" },
          image: "https://placehold.co/400x200/EF4444/FFFFFF?text=TensorFlow.js"
        },
        {
          id: 2,
          title: "Les bases de MQTT pour l'IoT",
          excerpt: "Guide complet sur le protocole de communication léger utilisé pour connecter des objets intelligents.",
          author: "M. Padaboh",
          created_at: "2025-03-28",
          published: true,
          category: { name: "IoT" },
          image: "https://placehold.co/400x200/8B5CF6/FFFFFF?text=MQTT+IoT"
        },
        {
          id: 3,
          title: "Programmation Arduino : Premier projet électronique",
          excerpt: "Un tutoriel pas à pas pour créer votre premier circuit avec une LED clignotante.",
          author: "Équipe CITIL",
          created_at: "2025-03-20",
          published: true,
          category: { name: "Arduino" },
          image: "https://placehold.co/400x200/F59E0B/FFFFFF?text=Arduino+LED"
        },
        {
          id: 4,
          title: "KIDS in TECH : Stimuler la créativité technologique",
          excerpt: "Comment nous formons les jeunes à la robotique et à la programmation dès le plus jeune âge.",
          author: "CITIL Team",
          created_at: "2025-03-15",
          published: true,
          category: { name: "Éducation" },
          image: "https://placehold.co/400x200/10B981/FFFFFF?text=KIDS+in+TECH"
        }
      ];
      setPosts(mockPosts);
      setLoading(false);
    }, 800);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog & Tutoriels</h1>
        <p className="text-gray-600">Découvrez nos articles techniques, tutoriels et actualités sur la technologie.</p>
      </div>

      {/* Bannière KIDS in TECH */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 p-4 rounded-full">
            <BookOpen size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">🎓 KIDS in TECH</h2>
            <p className="text-lg opacity-90">Nos ateliers éducatifs transforment les jeunes en makers et développeurs.</p>
            <button className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
              En savoir plus
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
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Liste des articles */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des articles...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {filteredPosts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun article ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}