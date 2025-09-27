import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  const onDocClick = useCallback((e) => {
    if (!open) return;
    const t = e.target;
    if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return;
    setOpen(false);
  }, [open]);

  const onKeyDown = useCallback((e) => {
    if (open && e.key === 'Escape') setOpen(false);
  }, [open]);

  useEffect(() => {
    document.addEventListener('click', onDocClick);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onDocClick, onKeyDown]);

  const notifications = [
    { id: 1, title: 'Nouvelle commande', time: 'il y a 2 min' },
    { id: 2, title: 'Candidature reçue', time: 'il y a 15 min' },
    { id: 3, title: 'Stock faible: ESP32', time: 'il y a 1 h' },
  ];

  return (
    <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-[#AED5E6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2 flex-1">
          <input placeholder="Rechercher..." className="w-full max-w-md rounded-lg border border-[#AED5E6] bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3498DB]" />
        </div>
        <div className="flex items-center gap-3 relative">
          <button
            ref={btnRef}
            onClick={() => setOpen(o => !o)}
            className="relative rounded-full p-2 hover:bg-[#AED5E6]/40 transition-colors"
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="Notifications"
          >
            <span>🔔</span>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#3498DB]" />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-10 w-72 bg-white border border-[#AED5E6] rounded-lg shadow-md overflow-hidden"
                role="menu"
                aria-label="Notifications"
              >
                <div className="px-3 py-2 border-b bg-[#F9F9EA] text-[#2C3E50] font-medium">Notifications</div>
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <li key={n.id} className="px-3 py-2 hover:bg-[#AED5E6]/30 cursor-pointer">
                      <div className="text-sm text-[#2C3E50]">{n.title}</div>
                      <div className="text-xs text-[#2C3E50]/70">{n.time}</div>
                    </li>
                  ))}
                  {notifications.length === 0 && (
                    <li className="px-3 py-6 text-center text-sm text-[#2C3E50]/70">Aucune notification</li>
                  )}
                </ul>
                <div className="px-3 py-2 border-t text-right">
                  <button onClick={() => setOpen(false)} className="text-sm text-[#3498DB] hover:underline">Fermer</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 rounded-full border border-[#AED5E6] bg-white/80 px-2 py-1">
            <img src="/assets/images/Logo CITIL.png" alt="Profil" className="h-6 w-6 rounded-full object-cover" />
            <span className="hidden sm:block text-sm text-[#2C3E50] font-medium">Admin</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
