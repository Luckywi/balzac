"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import PrestationsContainer from "../components/PrestationContainer";
import styles from "./prestations.module.css";


export default function PrestationsPage() {
  // Permettre le défilement sur cette page
  useEffect(() => {
    // Sauvegarder les styles originaux
    const originalHtmlStyle = document.documentElement.style.cssText;
    const originalBodyStyle = document.body.style.cssText;
    
    // Activer le défilement pour cette page
    document.documentElement.style.cssText = 'position: relative; height: auto; overflow: auto;';
    document.body.style.cssText = 'position: relative; height: auto; overflow: auto;';
    
    // Restaurer les styles originaux lors du nettoyage
    return () => {
      document.documentElement.style.cssText = originalHtmlStyle;
      document.body.style.cssText = originalBodyStyle;
    };
  }, []);
  return (
    <main
      className={`min-h-screen flex flex-col ${styles.prestationsPage}`}
      style={{
        background: "linear-gradient(to bottom, #333333, #ec8cff)",
        fontFamily: "var(--font-jetbrains-mono)",
      }}
    >
      <motion.div 
        className="w-full py-12 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <div className="w-full flex gap-4 justify-center mb-6">
    <Link
      href="/menu"
      className="py-2 px-4 rounded-lg border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
      aria-label="Retour à l'accueil"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24">
        <path 
          d="M 50 15 L 15 45 L 25 45 L 25 85 L 75 85 L 75 45 L 85 45 Z" 
          stroke="white" 
          strokeWidth="6" 
          fill="none" 
        />
        <rect 
          x="42" y="60" width="16" height="25" 
          stroke="white" 
          strokeWidth="6" 
          fill="none" 
        />
      </svg>
    </Link>
    <Link
    href="/rendez-vous"
    className="py-2 px-4 rounded-lg border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
  >
    PRENDRE RDV
  </Link>
  </div>
        </div>
        
        <div className={styles.prestationsContainer}>
          <PrestationsContainer />
        </div>
      
      </motion.div>
    </main>
  );
}

