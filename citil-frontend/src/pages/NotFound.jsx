import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9EA] to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl font-bold text-[#3498DB] mb-4"
        >
          404
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-bold text-[#2C3E50] mb-4"
        >
          Page non trouvée
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 mb-8"
        >
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-semibold rounded-lg hover:from-[#2980B9] hover:to-[#1F6A97] transition-all duration-200 shadow-lg"
          >
            Retour à l'accueil
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link to="/boutique" className="hover:text-[#3498DB] transition-colors mr-4">Boutique</Link>
            <Link to="/formations" className="hover:text-[#3498DB] transition-colors mr-4">Formations</Link>
            <Link to="/contact" className="hover:text-[#3498DB] transition-colors">Contact</Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
