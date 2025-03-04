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
        background: "linear-gradient(to bottom, #000000, #ec8cff)",
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
          <div className="flex items-center justify-center relative py-2">
            <Link
              href="/"
              className="absolute left-0 p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Retour"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            
            <h1 className="text-2xl sm:text-3xl font-medium">Nos Prestations</h1>
          </div>
          
          <p className="text-sm text-center opacity-80 max-w-md mx-auto">
            Découvrez nos prestations et trouvez celle qui vous correspond. 
            Tous nos services sont réalisés par des professionnels qualifiés.
          </p>
        </div>
        
        <div className={styles.prestationsContainer}>
          <PrestationsContainer />
        </div>
        
        <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50 px-4">
  <Link
    href="/rendez-vous"
    className="border border-white rounded-full py-3 px-10 text-white hover:bg-white/10 transition-colors"
  >
    PRENDRE RDV
  </Link>
</div>

      </motion.div>
    </main>
  );
}

