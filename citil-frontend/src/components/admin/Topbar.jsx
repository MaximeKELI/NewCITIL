import React from 'react';
import { motion } from 'framer-motion';

export default function Topbar() {

  return (
    <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-[#AED5E6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2 flex-1">
          <input placeholder="Rechercher..." className="w-full max-w-md rounded-lg border border-[#AED5E6] bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3498DB]" />
        </div>
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 rounded-full border border-[#AED5E6] bg-white/80 px-2 py-1">
            <img src="/assets/images/Logo CITIL.png" alt="Profil" className="h-6 w-6 rounded-full object-cover" />
            <span className="hidden sm:block text-sm text-[#2C3E50] font-medium">Admin</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
