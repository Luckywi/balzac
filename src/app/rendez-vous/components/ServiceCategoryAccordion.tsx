"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Section, Service } from '../../lib/firebase/types';
import ServiceCard from './ServiceCard';

interface ServiceCategoryAccordionProps {
  section: Section;
  services: Service[];
  selectedServiceId: string | null;
  onSelectService: (service: Service) => void;
}

export default function ServiceCategoryAccordion({ 
  section, 
  services, 
  selectedServiceId, 
  onSelectService 
}: ServiceCategoryAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Ouvrir automatiquement si un service de cette section est sélectionné
  const hasSelectedService = services.some(service => service.id === selectedServiceId);
  
  // Si un service de cette section est sélectionné, forcer l'ouverture
  const effectiveIsOpen = hasSelectedService || isOpen;
  
  return (
    <div className="mb-4">
      {/* En-tête de la section */}
      <motion.div 
        className="py-3 px-4 border-b border-white/20 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        whileTap={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
      >
        <h2 className="text-white font-medium">{section.title}</h2>
        <motion.div
          animate={{ rotate: effectiveIsOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/70"
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
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Contenu de la section avec animation */}
      <AnimatePresence>
        {effectiveIsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-3">
              {services.length > 0 ? (
                services.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={service.id === selectedServiceId}
                    onClick={() => onSelectService(service)}
                  />
                ))
              ) : (
                <p className="text-white/60 text-center py-4 text-sm">
                  Aucun service disponible dans cette catégorie.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}