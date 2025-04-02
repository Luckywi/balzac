"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AdmClient() {
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
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #333333, #ec8cff)",
        fontFamily: "var(--font-jetbrains-mono)",
        overflow: "auto",
        position: "relative"
      }}
    >
      <motion.div 
        className="w-full py-12 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full max-w-md mx-auto mb-8">
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
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          {/* Card principale pour le backlink */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="p-5 text-center">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/images/salon/adm-logo.png" 
                  alt="ADMLAB Logo" 
                  width={160}
                  height={64}
                  priority
                  className="h-16 w-auto"
                />
              </div>
              
              <p className="text-white/80 text-sm mb-5">
                Agence digitale spécialisée en sites web optimisés SEO, applications mobiles et solutions métiers sur mesure.
              </p>
              
              <p className="text-white/80 text-sm mb-5">
                <strong>Sites vitrines professionnels à partir de 30€/mois</strong>
              </p>

              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-lg p-5 mb-5 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-2xl font-medium text-white mb-4">Le Balzac & ADMLAB</h1>
                
                <p className="text-white/80 text-sm">
                  Le salon de coiffure Le Balzac a choisi l&apos;agence web ADMLAB pour développer sa présence digitale. 
                  Cette collaboration a permis de créer une expérience en ligne élégante, un système de réservation 
                  sur mesure et une identité visuelle moderne qui reflète l&apos;expertise du salon.
                </p>
              </motion.div>
              
              <div className="flex justify-center">
                <motion.a
                  href="https://admlab.fr"
                  target="_blank"
                  rel="follow"
                  className="border border-white rounded-lg py-3 px-8 text-white text-center hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Découvrir ADMLAB
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Réalisations ADMLAB */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="p-5">
              <h2 className="text-2xl font-medium text-white mb-6 text-center">
                <span className="inline-block border-b-2 border-white/30 pb-1">Réalisations ADMLAB</span>
              </h2>
              
              {/* Réalisation Franck Lebeurre */}
              <div className="mb-6">
                <div className="w-full h-48 overflow-hidden rounded-lg mb-5 border border-white/10">
                  <iframe 
                    src="https://www.francklebeurre-expertise.fr/" 
                    title="Franck Lebeurre - Expert Comptable"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      pointerEvents: 'none'
                    }}
                  ></iframe>
                </div>
                
                <h3 className="text-white text-lg font-medium mb-3 text-center">
                  Cabinet Franck Lebeurre Expert-Comptable
                </h3>
                
                <p className="text-white/80 text-sm mb-5 text-center">
                  Expert comptable spécialisé en professions libérales.<br />
                  Site vitrine avec prise de rendez-vous intégrée.
                </p>
    
                <div className="flex justify-center">
                  <motion.a
                    href="https://www.francklebeurre-expertise.fr/"
                    target="_blank"
                    rel="follow"
                    className="border border-white rounded-lg py-2 px-6 text-white text-sm hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Visiter le site
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}