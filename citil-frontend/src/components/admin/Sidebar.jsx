import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/admin/overview', label: 'Accueil' },
  { to: '/admin/produits', label: 'Produits' },
  { to: '/admin/categories', label: 'Catégories' },
  { to: '/admin/formations', label: 'Formations' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/stages', label: 'Stages' },
  { to: '/admin/utilisateurs', label: 'Clients' },
  { to: '/admin/parametres', label: 'Paramètres' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track viewport to determine desktop vs mobile behavior
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Ensure sidebar is visible on desktop
  useEffect(() => {
    if (isDesktop) setOpen(true);
    else setOpen(false);
  }, [isDesktop]);

  const onKeyDown = useCallback((e) => {
    if (!isDesktop && open && e.key === 'Escape') setOpen(false);
  }, [isDesktop, open]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="sticky top-0 z-30">
      {/* Mobile burger */}
      <div className="md:hidden flex items-center justify-between p-3">
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-md bg-[#3498DB] text-white"
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>
      </div>

      {/* Desktop static sidebar */}
      <aside className="hidden md:block md:sticky md:top-0 md:h-screen md:w-64 bg-white/80 backdrop-blur border-r border-[#AED5E6] p-4 shadow-sm">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <img src="/assets/images/Logo CITIL.png" alt="CITIL" className="h-8 w-8 object-contain" />
            <span className="font-semibold text-[#2C3E50]">CITIL Admin</span>
          </div>
        </div>
        <nav className="space-y-1">
          {links.map(l => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-[#3498DB] text-white' : 'text-[#2C3E50] hover:bg-[#AED5E6]/40'}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay + slide-in */}
      <AnimatePresence>
        {!isDesktop && open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            {/* Panel */}
            <motion.aside
              key="panel"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 border-r border-[#AED5E6] p-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/assets/images/Logo CITIL.png" alt="CITIL" className="h-8 w-8 object-contain" />
                  <span className="font-semibold text-[#2C3E50]">CITIL Admin</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-[#AED5E6]/40"
                  aria-label="Fermer le menu"
                >
                  ✕
                </button>
              </div>
              <nav className="space-y-1">
                {links.map(l => {
                  const active = pathname.startsWith(l.to);
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-[#3498DB] text-white' : 'text-[#2C3E50] hover:bg-[#AED5E6]/40'}`}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
