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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedSections = await getSections();
        setSections(fetchedSections);

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

  // 👉 Nouveau comportement : sélection = passage à l’étape suivante
  const handleSelectService = (service: Service) => {
    console.log("Service sélectionné :", service);
    setSelectedService(service);
    onServiceSelected(service); // ⬅️ appel direct
  };

  // Pré-sélection si on revient en arrière
  useEffect(() => {
    if (selectedServiceId) {
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
            setOpenSectionId(prev => (prev === section.id ? null : section.id));
          }}
          selectedServiceId={selectedService?.id || null}
          onSelectService={handleSelectService}
        />
      ))}
    </div>
  );
}
