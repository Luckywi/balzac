// src/app/components/SplashScreen.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Bloquer le scroll pendant l'animation
    if (typeof document !== 'undefined') {
      // Sauvegarder les styles originaux
      const originalHtmlStyle = document.documentElement.style.cssText;
      const originalBodyStyle = document.body.style.cssText;
      
      // Désactiver le défilement
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Commencer l'animation après un court délai
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 800); // Délai réduit à 1.2 secondes
      
      return () => {
        // Restaurer les styles originaux lors du nettoyage
        document.documentElement.style.cssText = originalHtmlStyle;
        document.body.style.cssText = originalBodyStyle;
        clearTimeout(timer);
      };
    }
    
    // Version simplifiée pour SSR
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {!isAnimating ? (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }} // Animation légèrement plus rapide
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "linear-gradient(to bottom, #333333, #ec8cff)",
          }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            exit={{ 
              scale: 0.5,
              opacity: 0,
              y: -300 // Changé pour disparaître vers le haut
            }}
            transition={{ 
              duration: 1.0, // Animation légèrement plus rapide
              ease: "easeInOut"
            }}
            className="relative w-[260px] h-[128px]"
          >
            <Image 
              src="/images/salon/le-balzac-logo.png" 
              alt="Logo Le Balzac" 
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}