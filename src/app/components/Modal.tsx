// src/app/components/Modal.tsx
"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Gestion des touches du clavier (ESC pour fermer)
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Désactiver le défilement du body et cacher tout le contenu
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Création du contenu modal
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999]"
          style={{ 
            background: "linear-gradient(to bottom, #333333, #ec8cff)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh"
          }}
        >
          {/* Entête avec titre et bouton fermer */}
          <div className="p-5 flex justify-between items-center border-b border-white/20">
            <h2 className="text-xl font-medium text-white">{title}</h2>
            
            <button
              className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
              onClick={onClose}
              aria-label="Fermer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Contenu centré */}
          <div className="flex-1 overflow-auto p-5 flex items-center justify-center" style={{ height: "calc(100vh - 70px)" }}>
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // On utilise un portail React pour rendre la modale à la racine du document
  // afin qu'elle puisse recouvrir toute la page
  if (typeof window !== 'undefined') {
    return createPortal(
      modalContent,
      document.body
    );
  }
  
  return null;
};

export default Modal;