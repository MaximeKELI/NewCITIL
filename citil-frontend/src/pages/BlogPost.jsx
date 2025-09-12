import { useState } from 'react';
import { ArrowLeft, Calendar, User, BookOpen, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPost() {
  const [liked, setLiked] = useState(false);

  // Simuler un article (remplacé par API plus tard)
  const post = {
    id: 1,
    title: "Introduction à TensorFlow.js : IA dans le navigateur",
    excerpt: "Découvrez comment implémenter l'intelligence artificielle directement dans vos applications web sans serveur.",
    content: `
      <p class="mb-6">TensorFlow.js est une bibliothèque JavaScript qui permet d'entraîner et d'exécuter des modèles d'apprentissage automatique directement dans le navigateur ou sur Node.js.</p>
      
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Pourquoi utiliser TensorFlow.js ?</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-gray-700">
        <li><strong>Accès au GPU :</strong> Utilisation du WebGL pour accélérer les calculs</li>
        <li><strong>Privé et sécurisé :</strong> Les données restent sur l'appareil de l'utilisateur</li>
        <li><strong>Fiable :</strong> Modèles pré-entraînés disponibles (pose detection, reconnaissance vocale, etc.)</li>
        <li><strong>Interactif :</strong> Parfait pour des démonstrations en temps réel</li>
      </ul>

      <img src="https://placehold.co/800x400/EF4444/FFFFFF?text=TensorFlow.js" alt="TensorFlow.js" class="w-full h-64 object-cover rounded-xl mb-6">

      <h3 class="text-xl font-semibold text-gray-800 mb-4">Cas d'utilisation pratiques</h3>
      <p class="mb-4">À CITIL, nous utilisons TensorFlow.js pour :</p>
      <ol class="list-decimal list-inside space-y-2 mb-6 text-gray-700">
        <li>Développer des jeux éducatifs avec reconnaissance gestuelle</li>
        <li>Analyser les expressions faciales dans nos projets de robotique sociale</li>
        <li>Créer des outils pédagogiques interactifs pour nos formations Arduino</li>
      </ol>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p class="text-sm text-yellow-800"><strong>Conseil CITIL :</strong> Commencez par importer un modèle pré-entraîné comme "posenet" ou "handpose" pour voir des résultats immédiats.</p>
      </div>

      <p>Intégrer l'IA dans vos projets web n'a jamais été aussi accessible. Avec TensorFlow.js, même les débutants peuvent créer des expériences technologiques impressionnantes.</p>
    `,
    author: "Nanga Ditorga",
    created_at: "2025-04-01",
    category: { name: "IA" },
    image: "https://placehold.co/800x400/EF4444/FFFFFF?text=TensorFlow.js",
    tags: ["IA", "JavaScript", "Web", "Machine Learning"]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indipo-800 mb-6">
        <ArrowLeft size={18} /> Retour au blog
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
            {post.category.name}
          </span>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              liked 
                ? 'bg-red-100 text-red-600' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
            {liked ? 'Aimé' : 'Aimer'} (12)
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Share2 size={20} />
            Partager
          </button>
        </div>
      </header>

      {/* Content */}
      <article 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mots-clés</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 text-center">
        <BookOpen size={48} className="mx-auto mb-4 opacity-80" />
        <h3 className="text-2xl font-bold mb-4">Recevez nos tutoriels tech</h3>
        <p className="mb-6 opacity-90">Inscrivez-vous à notre newsletter pour recevoir chaque semaine un nouveau tutoriel sur la robotique, l'IA et la programmation embarquée.</p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
          />
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            S'abonner
          </button>
        </div>
      </div>
    </div>
  );
}