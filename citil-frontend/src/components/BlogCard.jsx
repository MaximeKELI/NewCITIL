import { Calendar, User, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="relative">
        <img
          src={post.image || "https://placehold.co/400x200/10b981/ffffff?text=Blog+CITIL"}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {post.category?.name || "Technologie"}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Lire l'article <BookOpen size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}