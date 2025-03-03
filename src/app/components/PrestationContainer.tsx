"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { prestations } from '../prestations/data';
import PrestationCategory from './PresationCategory';

export default function PrestationsContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrestations, setFilteredPrestations] = useState(prestations);
  
  // Définir handleSearchBlur en dehors de useEffect pour qu'il soit accessible au JSX
  const handleSearchBlur = () => {
    // Force un léger délai pour s'assurer que le focus est perdu
    setTimeout(() => {
      // Force un niveau de zoom de 1
      document.documentElement.style.setProperty('zoom', '1');
      // Alternative pour certains navigateurs
      (document.body as any).style.zoom = 1;
      
      // Pour iOS/Safari
      document.body.style.webkitTextSizeAdjust = '100%';
      
      // Force une mise à jour de la vue
      window.scrollTo(0, 0);
    }, 100);
  };
  
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Si la recherche est vide, afficher toutes les prestations
      setFilteredPrestations(prestations);
      return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    
    // Filtrer les catégories qui contiennent le terme de recherche dans le titre
    // OU qui contiennent des prestations correspondant au terme de recherche
    const filtered = prestations
      .map(category => {
        // Vérifier si le titre de la catégorie correspond au terme de recherche
        const categoryTitleMatches = category.titre.toLowerCase().includes(searchTermLower);
        
        // Si le titre de la catégorie correspond, inclure toutes les prestations de cette catégorie
        if (categoryTitleMatches) {
          return {
            ...category,
            matchedByCategory: true // Marquer que cette catégorie a été trouvée par son titre
          };
        }
        
        // Sinon, filtrer les prestations qui correspondent au terme de recherche
        const matchingPrestations = category.prestations.filter(
          p => p.titre.toLowerCase().includes(searchTermLower)
        );
        
        // Si des prestations correspondent, retourner une nouvelle catégorie avec seulement ces prestations
        if (matchingPrestations.length > 0) {
          return {
            ...category,
            prestations: matchingPrestations,
            matchedByCategory: false
          };
        }
        
        // Sinon, retourner null
        return null;
      })
      .filter(category => category !== null);
    
    setFilteredPrestations(filtered);
    
    // Log pour déboguer
    console.log("Recherche:", searchTermLower);
    console.log("Résultats par catégorie:", filtered.map(category => ({
      titre: category.titre,
      matchedByCategory: category.matchedByCategory,
      nbPrestations: category.prestations.length
    })));
    console.log("Total:", filtered.length, "catégories,", 
                filtered.reduce((total, category) => total + category.prestations.length, 0), "prestations");
  }, [searchTerm]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-8">
      <div className="mb-8">
        <div className="relative">
          <input 
            type="text"
            placeholder="Rechercher une prestation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleSearchBlur}
            className="w-full p-2 pl-8 text-base bg-white/10 backdrop-blur-md rounded-full border border-white/30 focus:outline-none focus:border-white/50 text-white placeholder-white/50 transition-all"
            style={{ fontSize: '16px' }}
          />
          
          {searchTerm.trim() && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              onClick={() => setSearchTerm('')}
              aria-label="Effacer la recherche"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
          )}
        </div>
        
        {searchTerm.trim() && (
          <div className="mt-2 px-3 text-xs text-white/70">
            {filteredPrestations.length > 0 ? (
              <span>
                Résultats trouvés : {filteredPrestations.reduce((total, cat) => total + cat.prestations.length, 0)} prestations
              </span>
            ) : (
              <span>Aucun résultat trouvé</span>
            )}
          </div>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={searchTerm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredPrestations.length > 0 ? (
            filteredPrestations.map((category) => (
              <PrestationCategory 
                key={category.id} 
                category={category} 
                searchTerm={searchTerm}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-lg">Aucune prestation trouvée</p>
              <button 
                className="mt-4 btn-rdv py-2 px-6"
                onClick={() => setSearchTerm('')}
              >
                Afficher toutes les prestations
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}