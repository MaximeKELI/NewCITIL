import { Calendar, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrainingCard({ training }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative">
        <img
          src={training.image || "https://placehold.co/400x200/8b5cf6/ffffff?text=Formation+Tech"}
          alt={training.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {training.duration_hours}h
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {training.title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-indigo-600" />
            <span>{new Date(training.start_date).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-indigo-600" />
            <span>{training.schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-indigo-600" />
            <span className="font-semibold text-indigo-600">{training.price?.toLocaleString()} FCFA</span>
          </div>
        </div>
        
        <Link
          to={`/trainings/${training.id}`}
          className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
}