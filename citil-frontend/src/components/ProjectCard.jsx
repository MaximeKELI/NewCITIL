import { Link } from 'react-router-dom';
import { Trophy, Rocket, Lightbulb } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, i) => (
          <span key={i} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Link to={`/projects/${project.id}`} className="text-indigo-600 hover:text-indigo-900 font-semibold">
          Voir le projet
        </Link>
        {project.is_published && (
          <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            Publié
          </button>
        )}
      </div>
    </div>
  );
}