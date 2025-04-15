// ✅ ServiceSelection.tsx
"use client";

import { useEffect, useState } from "react";
import type { Section, Service } from "../../lib/firebase/types";
import { getSections, getServices } from "../../lib/firebase/service";
import ServiceCategoryAccordion from "./ServiceCategoryAccordion";

export default function ServiceSelection() {
  const [sections, setSections] = useState<Section[]>([]);
  const [servicesBySection, setServicesBySection] = useState<Record<string, Service[]>>({});
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSections = await getSections();
      setSections(fetchedSections);

      const servicesMap: Record<string, Service[]> = {};
      for (const section of fetchedSections) {
        const services = await getServices(section.id);
        servicesMap[section.id] = services;
      }
      setServicesBySection(servicesMap);
    };

    fetchData();
  }, []);

  return (
    <div>
        {selectedServiceId && (
  <div className="text-center mt-6">
    <button
      className="bg-white text-purple-700 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition"
      onClick={() => console.log('Continuer avec le service', selectedServiceId)}
    >
      Continuer
    </button>
  </div>
)}

      {sections.map((section) => (
        <ServiceCategoryAccordion
          key={section.id}
          section={section}
          services={servicesBySection[section.id] || []}
          isOpen={openSectionId === section.id}
          onToggle={() => {
            if (openSectionId === section.id) {
              setOpenSectionId(null);
              setSelectedServiceId(null);
            } else {
              setOpenSectionId(section.id);
            }
          }}
          selectedServiceId={selectedServiceId}
          onSelectService={(service) => setSelectedServiceId(service.id)}
        />
      ))}
    </div>
  );
}
