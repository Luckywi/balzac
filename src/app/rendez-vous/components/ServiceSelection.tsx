"use client";

import { useState, useEffect } from 'react';
import ServiceCategoryAccordion from './ServiceCategoryAccordion';
import { getSections, getServices } from '../../lib/firebase/service';
import type { Section, Service } from '../../lib/firebase/types';

interface ServiceSelectionProps {
  onServiceSelected: (service: Service) => void;
  selectedServiceId: string | null;
}

export default function ServiceSelection({ onServiceSelected, selectedServiceId }: ServiceSelectionProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [servicesBySection, setServicesBySection] = useState<Record<string, Service[]>>({});
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger les sections et services au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Chargement des sections et services...");
        
        const fetchedSections = await getSections();
        setSections(fetchedSections);
        console.log(`${fetchedSections.length} sections chargées`);

        const servicesMap: Record<string, Service[]> = {};
        for (const section of fetchedSections) {
          const services = await getServices(section.id);
          servicesMap[section.id] = services;
        }
        setServicesBySection(servicesMap);
      } catch (error) {
        console.error("Erreur lors du chargement des sections et services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour sélectionner un service
  const handleSelectService = (service: Service) => {
    console.log("Service sélectionné dans ServiceSelection:", service);
    setSelectedService(service);
    // Ne pas appeler onServiceSelected ici, attendre le clic sur "Continuer"
  };

  // Fonction pour passer à l'étape suivante
  const handleContinue = () => {
    if (selectedService) {
      console.log("Appel de onServiceSelected avec:", selectedService);
      onServiceSelected(selectedService);
    }
  };

  // Si un ID de service est déjà sélectionné, trouver le service correspondant
  useEffect(() => {
    if (selectedServiceId) {
      // Parcourir tous les services pour trouver celui qui correspond à l'ID
      for (const sectionId in servicesBySection) {
        const service = servicesBySection[sectionId].find(s => s.id === selectedServiceId);
        if (service) {
          setSelectedService(service);
          break;
        }
      }
    }
  }, [selectedServiceId, servicesBySection]);

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse bg-white/10 h-8 w-40 rounded-lg mx-auto mb-4"></div>
        <div className="animate-pulse bg-white/10 h-32 w-full rounded-lg mx-auto"></div>
      </div>
    );
  }

  return (
    <div>
      {sections.map((section) => (
        <ServiceCategoryAccordion
          key={section.id}
          section={section}
          services={servicesBySection[section.id] || []}
          isOpen={openSectionId === section.id}
          onToggle={() => {
            if (openSectionId === section.id) {
              setOpenSectionId(null);
            } else {
              setOpenSectionId(section.id);
            }
          }}
          selectedServiceId={selectedService?.id || null}
          onSelectService={handleSelectService}
        />
      ))}
      
      {selectedService && (
        <div className="text-center mt-6">
          <button
            className="bg-white text-purple-900 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition"
            onClick={handleContinue}
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}