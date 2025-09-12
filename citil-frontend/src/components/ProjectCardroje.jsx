import { Play, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative">
        <img
          src={project.image || "https://placehold.co/400x250/06b6d4/ffffff?text=Projet+CITIL"}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        {project.video_url && (
          <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Play size={48} className="text-white" />
          </a>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 3).map((tech, index) => (
            <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center gap-1"
          >
            <Github size={16} />
            Code source
          </a>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {project.is_published ? 'Publié' : 'Brouillon'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}