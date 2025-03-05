"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AccesPage() {
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

  // Données des horaires d'ouverture
  const horaires = [
    { jour: "Lundi", heures: "Fermé" },
    { jour: "Mardi", heures: ["08:30 - 11:45", "14:00 - 18:15"] },
    { jour: "Mercredi", heures: "08:30 - 18:15" },
    { jour: "Jeudi", heures: "08:30 - 18:15" },
    { jour: "Vendredi", heures: "08:30 - 18:30" },
    { jour: "Samedi", heures: "08:30 - 16:00" },
    { jour: "Dimanche", heures: "Fermé" },
  ];

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
            <Link
              href="/rendez-vous"
              className="py-2 px-4 rounded-lg border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              PRENDRE RDV
            </Link>
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          
          {/* Carte Google Maps */}
          <motion.div
            className="w-full mb-8 bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-full h-56 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.868!2d4.9684!3d45.7672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c1cb00000001%3A0xb4000f5fc4c6c8f2!2s3%20Rue%20Balzac%2C%2069150%20D%C3%A9cines-Charpieu!5e0!3m2!1sfr!2sfr!4v1709052897012!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-medium text-white mb-3">Adresse</h3>
              <p className="text-white/80 text-sm mb-4">
                3 Rue Balzac<br />
                69150 Décines-Charpieu<br />
                Grand parking gratuit
              </p>
              
              <div className="flex justify-center">
                <motion.a 
                  href="https://goo.gl/maps/8z9XY1zD3XYqRc7Q6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-white rounded-lg py-3 px-10 text-white text-center hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Itinéraire
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Horaires */}
          <motion.div
            className="w-full mb-8 bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="p-5">
              <h3 className="text-xl font-medium text-white mb-4">Horaires d&apos;ouverture</h3>
              
              <div className="divide-y divide-white/10">
                {horaires.map((item) => (
                  <div 
                    key={item.jour} 
                    className="py-3 flex justify-between items-center"
                  >
                    <span className={`text-sm ${item.heures === "Fermé" ? "text-white/60" : "text-white"}`}>
                      {item.jour}
                    </span>
                    
                    <div className="text-right">
                      {Array.isArray(item.heures) ? (
                        item.heures.map((heure, i) => (
                          <div key={i} className="text-sm text-white">
                            {heure}
                          </div>
                        ))
                      ) : (
                        <span className={`text-sm ${item.heures === "Fermé" ? "text-white/60" : "text-white"}`}>
                          {item.heures}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="w-full mb-8 bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="p-5">
              <h3 className="text-xl font-medium text-white mb-3">Contact</h3>
              <p className="text-white/80 text-sm">
                Tél: 04 72 00 00 00
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}