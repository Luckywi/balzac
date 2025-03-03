"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoriePrestation } from '../prestations/data';
import PrestationCard from './PresentationCard';

interface PrestationCategoryProps {
  category: CategoriePrestation & { matchedByCategory?: boolean };
  searchTerm?: string;
}

export default function PrestationCategory({ category, searchTerm = '' }: PrestationCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  
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
    <div className="mb-8 bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
      <div 
        className="p-5 cursor-pointer transition-colors hover:bg-white/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">
            {searchTerm && category.matchedByCategory 
              ? highlightSearchTerm(category.titre, searchTerm)
              : category.titre}
          </h2>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 flex-shrink-0"
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
              className="opacity-70"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </div>
        
        {category.description && category.description.length > 0 && (
          <p className="text-sm mt-1 opacity-80">{category.description}</p>
        )}
        
        {category.note && (
          <p className="text-xs mt-2 italic opacity-70">{category.note}</p>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pb-2">
              {category.prestations.map((prestation) => (
                <PrestationCard 
                  key={prestation.id}
                  prestation={prestation}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}