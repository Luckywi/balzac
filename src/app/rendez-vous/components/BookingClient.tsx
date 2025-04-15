"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BookingStepper from './BookingStepper';
import ServiceSelection from './ServiceSelection';
import type { Service } from '../../lib/firebase/types';

// Étapes du processus de réservation
type BookingStep = 'service' | 'datetime' | 'info' | 'payment' | 'confirmation';

export default function BookingClient() {
  // États
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Définir les étapes
  const steps = [
    { id: 1, label: 'Service' },
    { id: 2, label: 'Date' },
    { id: 3, label: 'Informations' },
  ];
  
  // Permettre le défilement sur cette page
  useEffect(() => {
    document.documentElement.style.position = 'relative';
    document.documentElement.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    document.body.style.position = 'relative';
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    
    return () => {
      // Restaurer les styles originaux lors du démontage si nécessaire
    };
  }, []);
  
  // Gérer la sélection d'un service
  const handleServiceSelected = (service: Service) => {
    console.log("Service sélectionné:", service);
    setSelectedService(service);
    
    // Pour l'instant, on ne passe pas à l'étape suivante automatiquement
    // L'utilisateur doit cliquer sur le bouton Continuer dans le composant ServiceSelection
  };
  
  // Gérer le passage à l'étape suivante
  const goToNextStep = () => {
    switch (currentStep) {
      case 'service':
        setCurrentStep('datetime');
        break;
      case 'datetime':
        setCurrentStep('info');
        break;
      case 'info':
        setCurrentStep('payment');
        break;
      case 'payment':
        setCurrentStep('confirmation');
        break;
      default:
        break;
    }
  };
  
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #9c4dcc, #ec8cff)",
        fontFamily: "var(--font-jetbrains-mono)",
        overflow: "auto",
        position: "relative"
      }}
    >
      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center">
        {/* Logo Home centré en haut */}
        <div className="w-full flex justify-center mb-6">
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
        </div>
        
        {/* Conteneur principal avec fond */}
        <motion.div
          className="w-full rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Titre */}
          <div className="bg-white/10 backdrop-blur-sm p-4 border-b border-white/10">
            <h1 className="text-xl font-medium text-white">Réservation</h1>
          </div>
          
          {/* Contenu */}
          <div className="p-4">
            {/* Stepper */}
            <BookingStepper 
              currentStep={currentStep === 'service' ? 1 : currentStep === 'datetime' ? 2 : 3} 
              steps={steps} 
            />
            
            {/* Étape active */}
            <div className="mt-4">
              {currentStep === 'service' && (
                <ServiceSelection 
                  onServiceSelected={handleServiceSelected} 
                  selectedServiceId={selectedService?.id}
                />
              )}
              
              {/* Les autres étapes seront ajoutées plus tard */}
              {currentStep !== 'service' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-white mb-4">
                    Cette étape sera développée prochainement.
                  </p>
                  <button 
                    className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
                    onClick={() => setCurrentStep('service')}
                  >
                    Retour à la sélection de service
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}