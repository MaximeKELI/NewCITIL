import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ open, onClose, title, children, actions }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-lg rounded-xl bg-white/90 backdrop-blur border border-[#AED5E6] shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#AED5E6]">
              <h3 className="text-lg font-semibold text-[#2C3E50]">{title}</h3>
              <button onClick={onClose} className="text-[#2C3E50]/70 hover:text-[#2980B9]">✕</button>
            </div>
            <div className="p-4">
              {children}
            </div>
            {actions && (
              <div className="flex items-center justify-end gap-2 p-4 border-t border-[#AED5E6] bg-[#F9F9EA] rounded-b-xl">
                {actions}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
