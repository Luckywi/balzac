"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import BookingStepper from './BookingStepper';
import ServiceSelection from './ServiceSelection';
import DateTimeSelection from './DateTimeSelection';
import { getSalonConfig, getStaffMembers, getStaffAvailability, getRdvsByDateRange } from '../../lib/firebase/service';
import type { SalonConfig, StaffMember, StaffAvailability, Rdv, Service } from '../../lib/firebase/types';
import { addDays } from 'date-fns';

// Étapes du processus de réservation
type BookingStep = 'service' | 'datetime' | 'info' | 'payment' | 'confirmation';

export default function BookingClient() {
  // États
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<any>(null); // Pour utiliser les valeurs
  
  // Données Firebase
  const [salonConfig, setSalonConfig] = useState<SalonConfig | null>(null);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [staffAvailabilities, setStaffAvailabilities] = useState<StaffAvailability[]>([]);
  const [existingRdvs, setExistingRdvs] = useState<Rdv[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Définir les étapes
  const steps = [
    { id: 1, label: 'Service' },
    { id: 2, label: 'Date' },
    { id: 3, label: 'Informations' },
  ];
  
  // Charger les données nécessaires depuis Firebase à l'initialisation
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Chargement des données depuis Firebase...");
        
        // Récupérer la configuration du salon
        const configData = await getSalonConfig();
        if (configData) {
          setSalonConfig(configData);
          console.log("Configuration du salon chargée", configData);
        } else {
          console.error("Impossible de charger la configuration du salon");
        }
        
        // Récupérer les membres du staff
        const staffData = await getStaffMembers();
        setStaffMembers(staffData);
        console.log(`${staffData.length} membres du staff chargés:`, staffData);
        
        // Récupérer les disponibilités du staff
        const availabilityPromises = staffData.map(staff => 
          getStaffAvailability(staff.id)
        );
        
        const availabilityResults = await Promise.all(availabilityPromises);
        const availabilities = availabilityResults.filter(a => a !== null) as StaffAvailability[];
        setStaffAvailabilities(availabilities);
        console.log(`${availabilities.length} disponibilités du staff chargées:`, availabilities);
        
        // Récupérer les rendez-vous existants pour les 30 prochains jours
        const today = new Date();
        const in30Days = addDays(today, 30);
        const rdvs = await getRdvsByDateRange(today, in30Days);
        setExistingRdvs(rdvs);
        console.log(`${rdvs.length} rendez-vous chargés`);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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
    
    // Passer explicitement à l'étape suivante avec un petit délai pour assurer la mise à jour de l'état
    setTimeout(() => {
      setCurrentStep('datetime');
      console.log("Étape actuelle après sélection du service:", 'datetime');
    }, 10);
  };
  
  // Gérer la sélection de date et heure
  const handleDateTimeSelected = (date: Date, time: string, staffId: string | null) => {
    console.log(`Date et heure sélectionnées: ${date.toISOString()}, ${time}, Staff: ${staffId || 'Aucun'}`);
    
    // Mettre à jour les états
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedStaffId(staffId);
    
    // Créer un rendez-vous temporaire pour étape suivante
    const tempAppointment = {
      date,
      time,
      staffId,
      service: selectedService,
    };
    
    // Stocker le RDV temporaire dans l'état
    setAppointment(tempAppointment);
    
    // On pourrait stocker le RDV temporaire dans un état si nécessaire
    // pour l'utiliser à l'étape suivante
    console.log("Rendez-vous temporaire créé:", tempAppointment);
    
    // Passer directement à l'étape suivante
    setCurrentStep('info');
    console.log("Passage à l'étape 'info'");
  };
  
  // Revenir à l'étape précédente
  const handleBackToService = () => {
    setCurrentStep('service');
  };
  
  // Revenir à l'étape de sélection de date
  const handleBackToDateTime = () => {
    setCurrentStep('datetime');
  };
  
  // Utiliser les variables sélectionnées pour éviter les erreurs
  const getStaffName = () => {
    if (!selectedStaffId) return "Sans préférence";
    const staff = staffMembers.find(s => s.id === selectedStaffId);
    return staff ? staff.name : "Coiffeur inconnu";
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
            <div className="mt-6">
              {loading ? (
                // État de chargement
                <div className="py-12 text-center">
                  <div className="animate-pulse bg-white/10 h-8 w-32 rounded-lg mx-auto mb-4"></div>
                  <div className="animate-pulse bg-white/10 h-40 w-full rounded-lg mx-auto"></div>
                </div>
              ) : (
                <>
                  {/* Utiliser une clé unique pour forcer le rechargement du composant lors du changement d'étape */}
                  <div key={`step-${currentStep}`}>
                    {currentStep === 'service' && (
                      <ServiceSelection 
                        onServiceSelected={handleServiceSelected} 
                        selectedServiceId={selectedService?.id || null}
                      />
                    )}
                    
                    {currentStep === 'datetime' && selectedService && (
                      <DateTimeSelection
                        serviceId={selectedService.id}
                        serviceTitle={selectedService.title}
                        serviceDuration={selectedService.duration}
                        servicePrice={selectedService.discountedPrice || selectedService.originalPrice}
                        onSelectDateTime={handleDateTimeSelected}
                        onBack={handleBackToService}
                        salonConfig={salonConfig}
                        staffAvailabilities={staffAvailabilities}
                        existingRdvs={existingRdvs}
                        staffMembers={staffMembers}
                      />
                    )}
                    
                    {currentStep === 'info' && (
                      <div className="py-12 text-center">
                        <h2 className="text-xl font-medium mb-4">Informations de contact</h2>
                        
                        {/* Résumé de la réservation qui utilise les variables sélectionnées */}
                        {selectedService && selectedDate && selectedTime && (
                          <div className="bg-white/10 p-4 rounded-lg mb-6 text-left">
                            <h3 className="text-lg font-medium mb-2">Résumé de votre réservation</h3>
                            <ul className="space-y-2">
                              <li><span className="text-white/60">Service:</span> {selectedService.title}</li>
                              <li><span className="text-white/60">Date:</span> {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}</li>
                              <li><span className="text-white/60">Heure:</span> {selectedTime}</li>
                              <li><span className="text-white/60">Coiffeur:</span> {getStaffName()}</li>
                              <li><span className="text-white/60">Prix:</span> {selectedService.discountedPrice || selectedService.originalPrice}€</li>
                            </ul>
                          </div>
                        )}
                        
                        <p className="text-white/80 mb-6">
                          Cette étape sera développée prochainement.
                        </p>
                        <button 
                          className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
                          onClick={handleBackToDateTime}
                        >
                          Retour à la sélection de date
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}