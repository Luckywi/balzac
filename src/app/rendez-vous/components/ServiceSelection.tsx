"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Section, Service } from '../../lib/firebase/types';
import { getSections, getServices } from '../../lib/firebase/service';
import ServiceCategoryAccordion from './ServiceCategoryAccordion';

interface ServiceSelectionProps {
  onServiceSelected: (service: Service) => void;
  selectedServiceId?: string | null;
}

export default function ServiceSelection({ onServiceSelected, selectedServiceId = null }: ServiceSelectionProps) {
  // États
  const [sections, setSections] = useState<Section[]>([]);
  const [servicesBySection, setServicesBySection] = useState<Record<string, Service[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Charger les sections et services
 // Charger les sections et services
 useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("🔍 Tentative de connexion à Firebase...");
        
        // Charger les sections
        console.log("📂 Chargement des sections...");
        const sectionsData = await getSections();
        console.log("✅ Sections récupérées:", sectionsData);
        setSections(sectionsData);
        
        // Charger les services pour chaque section
        console.log("📂 Chargement des services pour chaque section...");
        const servicesMap: Record<string, Service[]> = {};
        
        for (const section of sectionsData) {
          console.log(`🔍 Chargement des services pour la section "${section.title}" (ID: ${section.id})...`);
          const sectionServices = await getServices(section.id);
          console.log(`✅ Services récupérés pour "${section.title}":`, sectionServices);
          servicesMap[section.id] = sectionServices.filter(service => service.enabled !== false);
        }
        
        console.log("🎉 Tous les services ont été chargés!", servicesMap);
        setServicesBySection(servicesMap);
        setIsLoading(false);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des données:", err);
        // Afficher plus de détails sur l'erreur
        if (err instanceof Error) {
          console.error("❌ Message d'erreur:", err.message);
          console.error("❌ Stack trace:", err.stack);
        }
        setError("Une erreur est survenue lors du chargement des services. Veuillez réessayer ultérieurement.");
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Gérer la sélection d'un service
  const handleSelectService = (service: Service) => {
    onServiceSelected(service);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin mb-4"></div>
        <p className="text-white/80">Chargement des services...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-red-300 mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <p className="text-white mb-4">{error}</p>
        <button 
          className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-medium text-white mb-6 px-3">Sélectionner un service</h2>
      
      {sections.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/70">Aucune catégorie de service disponible.</p>
        </div>
      ) : (
        <div>
          {sections.map(section => {
            const sectionServices = servicesBySection[section.id] || [];
            
            // Ne pas afficher les sections sans services
            if (sectionServices.length === 0) {
              return null;
            }
            
            return (
              <ServiceCategoryAccordion
                key={section.id}
                section={section}
                services={sectionServices}
                selectedServiceId={selectedServiceId}
                onSelectService={handleSelectService}
              />
            );
          })}
        </div>
      )}
      
      {/* Bouton Continuer, visible seulement si un service est sélectionné */}
      {selectedServiceId && (
        <motion.div 
          className="flex justify-center mt-8 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            className="bg-white text-purple-700 hover:bg-white/90 font-medium py-3 px-8 rounded-lg shadow-md transition-colors"
            onClick={() => {
              // Chercher le service sélectionné pour le passer à nouveau au parent
              // (cela garantit que nous avons toutes les données du service)
              for (const sectionId in servicesBySection) {
                const service = servicesBySection[sectionId].find(s => s.id === selectedServiceId);
                if (service) {
                  onServiceSelected(service);
                  break;
                }
              }
            }}
          >
            Continuer
          </button>
        </motion.div>
      )}
    </div>
  );
}