"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import StripeProvider from '../../lib/stripe/StripeProvider';
import PaymentForm from './PaymentForm';
import BookingStepper from './BookingStepper';
import ServiceSelection from './ServiceSelection';
import DateTimeSelection from './DateTimeSelection';
import { getSalonConfig, getStaffMembers, getStaffAvailability, getRdvsByDateRange, createRdv } from '../../lib/firebase/service';
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
  const [, setAppointment] = useState<any>(null); // Pour utiliser les valeurs
  
  // États pour les informations du client
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  //const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [, setBookingId] = useState<string | null>(null);
  
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
    { id: 4, label: 'Paiement' }
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
  
  // Fonction pour passer à l'étape de paiement
  const handleProceedToPayment = () => {
    if (clientName && clientPhone) {
      setCurrentStep('payment');
    }
  };

  // Gestion du succès du paiement
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      //setPaymentIntentId(paymentIntentId);
      
      // Créer le RDV dans Firebase
      if (selectedService && selectedDate && selectedTime && selectedStaffId) {
        // Calculer l'heure de fin en fonction de la durée du service
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const startDate = new Date(selectedDate);
        startDate.setHours(hours, minutes, 0, 0);
        
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + selectedService.duration);
        
        const rdvData = {
          serviceId: selectedService.id,
          serviceTitle: selectedService.title,
          serviceDuration: selectedService.duration,
          staffId: selectedStaffId,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          clientName: clientName,
          clientPhone: clientPhone,
          clientEmail: clientEmail || undefined,
          price: selectedService.discountedPrice || selectedService.originalPrice,
          paymentIntentId: paymentIntentId,
          paymentStatus: 'completed',
        };
        
        // Créer le RDV dans Firebase
        const newRdvId = await createRdv(rdvData);
        setBookingId(newRdvId);
        
        // Passer à l'étape de confirmation
        setCurrentStep('confirmation');
      }
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error);
      // Gérer l'erreur
    }
  };

  // Gestion des erreurs de paiement
  const handlePaymentError = (error: string) => {
    console.error("Erreur de paiement:", error);
    // Vous pourriez afficher un message d'erreur ici
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
    <section
      style={{
        background: 'transparent',
        fontFamily: "var(--font-jetbrains-mono)",
        overflow: "auto",
        position: "relative"
      }}
    >
      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center">
        {/* Conteneur principal avec fond transparent */}
        <motion.div
          className="w-full rounded-lg overflow-hidden backdrop-blur-sm shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Titre */}
          <div className="backdrop-blur-sm p-4 border-b border-white/10">
            <h1 className="text-xl font-medium text-white">Réservation</h1>
          </div>
          
          {/* Contenu */}
          <div className="p-4">
            {/* Stepper */}
            <BookingStepper 
              currentStep={
                currentStep === 'service' 
                  ? 1 
                  : currentStep === 'datetime' 
                  ? 2 
                  : currentStep === 'info' 
                  ? 3 
                  : 4
              } 
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
                      <div className="py-8">
                        <h2 className="text-xl font-medium mb-6">Informations de contact</h2>
                        
                        {/* Résumé de la réservation qui utilise les variables sélectionnées */}
                        {selectedService && selectedDate && selectedTime && (
                          <div className="backdrop-blur-sm p-4 rounded-lg mb-6 text-left">
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
                        
                        {/* Formulaire d'informations client */}
                        <form className="space-y-4 mb-6">
                          <div>
                            <label htmlFor="clientName" className="block text-sm font-medium mb-1">Nom complet</label>
                            <input
                              type="text"
                              id="clientName"
                              className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 text-white"
                              placeholder="Votre nom et prénom"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="clientPhone" className="block text-sm font-medium mb-1">Téléphone</label>
                            <input
                              type="tel"
                              id="clientPhone"
                              className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 text-white"
                              placeholder="Votre numéro de téléphone"
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="clientEmail" className="block text-sm font-medium mb-1">Email (optionnel)</label>
                            <input
                              type="email"
                              id="clientEmail"
                              className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 text-white"
                              placeholder="Votre email"
                              value={clientEmail}
                              onChange={(e) => setClientEmail(e.target.value)}
                            />
                          </div>
                        </form>
                        
                        <div className="flex items-center justify-between mt-8">
                          <button 
                            className="backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white py-2 px-4 rounded-lg transition-colors"
                            onClick={handleBackToDateTime}
                          >
                            Retour
                          </button>
                          
                          <button 
                            className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition-colors"
                            onClick={handleProceedToPayment}
                            disabled={!clientName || !clientPhone}
                          >
                            Continuer au paiement
                          </button>
                        </div>
                      </div>
                    )}

                    {currentStep === 'payment' && selectedService && (
                      <StripeProvider>
                        <PaymentForm
                          amount={selectedService.discountedPrice || selectedService.originalPrice}
                          serviceTitle={selectedService.title}
                          clientName={clientName}
                          onPaymentSuccess={handlePaymentSuccess}
                          onPaymentError={handlePaymentError}
                        />
                        
                        <div className="mt-4">
                          <button 
                            className="backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white py-2 px-4 rounded-lg transition-colors"
                            onClick={() => setCurrentStep('info')}
                          >
                            Retour aux informations
                          </button>
                        </div>
                      </StripeProvider>
                    )}

                    {currentStep === 'confirmation' && (
                      <div className="py-12 text-center">
                        <svg
                          className="w-16 h-16 text-green-400 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        
                        <h2 className="text-xl font-medium mb-4">Réservation confirmée !</h2>
                        <p className="text-white/80 mb-6">
                          Votre rendez-vous a bien été enregistré. Vous recevrez bientôt une confirmation.
                        </p>
                        
                        <button 
                          className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition-colors"
                          onClick={() => window.location.href = '/'}
                        >
                          Retour à l&apos;accueil
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
    </section>
  );
}