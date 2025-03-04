"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { avis } from "./data";

export default function AvisPage() {
  const [filteredAvis, setFilteredAvis] = useState(avis);
  const [activeFilter, setActiveFilter] = useState("tous");
  const [showMoreCount, setShowMoreCount] = useState(6);

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

  // Fonction pour filtrer les avis par coiffeur
  const filterByCoiffeur = (coiffeur: string) => {
    setActiveFilter(coiffeur);
    if (coiffeur === "tous") {
      setFilteredAvis(avis);
    } else {
      setFilteredAvis(avis.filter(item => item.coiffeur === coiffeur));
    }
    setShowMoreCount(6); // Réinitialiser le nombre d'avis affichés
  };

  // Fonction pour afficher plus d'avis
  const handleShowMore = () => {
    setShowMoreCount(prev => prev + 6);
  };

  // Fonction pour rendre les étoiles
  const renderStars = (note: number) => {
    const fullStars = Math.floor(note);
    const halfStar = note % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {/* Étoiles pleines */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg
            key={`full-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            className="mr-0.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        
        {/* Demi-étoile */}
        {halfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            className="mr-0.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="black"
              opacity="0.5"
              clipPath="inset(0 0 0 50%)"
            />
          </svg>
        )}
        
        {/* Étoiles vides */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg
            key={`empty-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="mr-0.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #000000, #ec8cff)",
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
              className="py-2 px-4 rounded-xl border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
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
              className="py-2 px-4 rounded-xl border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              PRENDRE RDV
            </Link>
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-lg p-5 mb-8 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Note et étoiles */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {/* 4 étoiles pleines */}
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="mx-0.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                
                {/* 5ème étoile 60% remplie */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mx-0.5"
                >
                  <defs>
                    <linearGradient id="partialFill" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="80%" stopColor="white" />
                      <stop offset="80%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                    fill="url(#partialFill)"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <span className="font-medium text-lg ml-2">(4.8)</span>
              <span className="text-white/70 text-sm ml-1">· {avis.length} avis</span>
            </div>
            
            {/* Boutons de filtre centrés */}
            <div className="flex justify-center gap-2">
              <button
                className={`py-2 px-4 rounded-lg text-sm transition-all ${activeFilter === 'tous' ? 'bg-white/20 border border-white/80 shadow-md' : 'bg-transparent border border-white/30 hover:border-white/50'}`}
                onClick={() => filterByCoiffeur('tous')}
              >
                Tous
              </button>
              <button
                className={`py-2 px-4 rounded-lg text-sm transition-all ${activeFilter === 'Béa' ? 'bg-white/20 border border-white/80 shadow-md' : 'bg-transparent border border-white/30 hover:border-white/50'}`}
                onClick={() => filterByCoiffeur('Béa')}
              >
                Béa
              </button>
              <button
                className={`py-2 px-4 rounded-lg text-sm transition-all ${activeFilter === 'Cyril' ? 'bg-white/20 border border-white/80 shadow-md' : 'bg-transparent border border-white/30 hover:border-white/50'}`}
                onClick={() => filterByCoiffeur('Cyril')}
              >
                Cyril
              </button>
            </div>
          </motion.div>
          
          {/* Liste des avis */}
          <div className="mb-8">
            {filteredAvis.slice(0, showMoreCount).map((avis, index) => (
              <motion.div
                key={avis.id}
                className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index % 6) * 0.1, duration: 0.5 }}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium">{avis.service}</h3>
                    {renderStars(avis.note)}
                  </div>
                  
                  {avis.commentaire && (
                    <p className="text-sm text-white/80 mb-3 italic">
                      {avis.commentaire}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <span>Par {avis.client}</span>
                    <div>
                      <span className="mr-2">Coiffeur: {avis.coiffeur}</span>
                      <span>{avis.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bouton "Voir plus" */}
          {showMoreCount < filteredAvis.length && (
            <div className="flex justify-center mb-12">
              <motion.button
                className="border border-white rounded-lg py-2 px-8 text-sm hover:bg-white/10 transition-colors"
                onClick={handleShowMore}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir plus d'avis
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
}