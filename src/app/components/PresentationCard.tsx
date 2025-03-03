"use client";

import { useState } from 'react';
import { Prestation } from '../prestations/data';

interface PrestationCardProps {
  prestation: Prestation;
  searchTerm?: string;
}

export default function PrestationCard({ prestation, searchTerm = '' }: PrestationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Fonction pour mettre en évidence le terme de recherche dans le titre
  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text;
    
    const termLower = term.toLowerCase();
    const index = text.toLowerCase().indexOf(termLower);
    
    if (index === -1) return text;
    
    return (
      <>
        {text.substring(0, index)}
        <span className="bg-white/30 text-white rounded px-0.5">
          {text.substring(index, index + term.length)}
        </span>
        {text.substring(index + term.length)}
      </>
    );
  };

  return (
    <div 
      className={`flex flex-col sm:flex-row sm:items-center justify-between w-full p-4 mb-2 rounded-lg transition-all duration-300 ${
        isHovered ? 'bg-white/10' : 'bg-transparent'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 mb-2 sm:mb-0">
        <h3 className="text-sm sm:text-base font-medium">
          {searchTerm ? highlightSearchTerm(prestation.titre, searchTerm) : prestation.titre}
        </h3>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
        <span className="text-xs sm:text-sm opacity-70 mr-4">{prestation.duree}</span>
        <span className="text-xs sm:text-sm font-medium">{typeof prestation.prix === 'string' ? prestation.prix : prestation.prix.montant}</span>
      </div>
    </div>
  );
}