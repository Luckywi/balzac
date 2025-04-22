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
import { getSalonConfig, getStaffMembers, getStaffAvailability, getRdvsByDateRange } from '../../lib/firebase/service';
import type { SalonConfig, StaffMember, StaffAvailability, Rdv, Service } from '../../lib/firebase/types';
import { addDays } from 'date-fns';
import StepInfoContact from './StepInfoContact';

// Étapes du processus de réservation
type BookingStep = 'service' | 'datetime' | 'info' | 'payment' | 'processing' | 'confirmation' | 'error';

export default function BookingClient() {
  // États principaux
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [, setAppointment] = useState<any>(null);
  
  // États pour les informations du client
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [, setPaymentIntentId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  // États pour gérer les erreurs et le chargement
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [, setWebhookStatus] = useState<'pending' | 'succeeded' | 'failed' | null>(null);
  
  // Données Firebase
  const [salonConfig, setSalonConfig] = useState<SalonConfig | null>(null);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [staffAvailabilities, setStaffAvailabilities] = useState<StaffAvailability[]>([]);
  const [existingRdvs, setExistingRdvs] = useState<Rdv[]>([]);
  
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
  
  // Fonction pour vérifier le statut d'un paiement via le webhook
  const checkPaymentStatus = async (paymentIntentId: string) => {
    try {
      // On attendra un peu avant de commencer à interroger le statut
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let attempts = 0;
      const maxAttempts = 10; // 10 tentatives maximum
      const delay = 500; // 3 secondes entre chaque tentative
      
      // Boucle de vérification du statut
      while (attempts < maxAttempts) {
        console.log(`Vérification du statut du paiement... Tentative ${attempts + 1}/${maxAttempts}`);
        
        const response = await fetch(`/api/payment-status?paymentId=${paymentIntentId}`);
        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'succeeded') {
            console.log("Le paiement a été confirmé par le webhook!", data);
            setWebhookStatus('succeeded');
            setBookingId(data.bookingId);
            return true;
          } else if (data.status === 'failed') {
            console.log("Le paiement a échoué selon le webhook", data);
            setWebhookStatus('failed');
            setPaymentError(data.error || "Le paiement a échoué");
            return false;
          }
        }
        
        // Si on n'a pas encore de statut définitif, on attend avant la prochaine tentative
        await new Promise(resolve => setTimeout(resolve, delay));
        attempts++;
      }
      
      // Si on arrive ici, c'est qu'on a dépassé le nombre maximum de tentatives
      console.log("Timeout: aucune confirmation du webhook après plusieurs tentatives");
      setWebhookStatus('pending');
      
      // On considère que le paiement est réussi côté client même si le webhook n'a pas encore confirmé
      // Le webhook créera le RDV plus tard de toute façon s'il est valide
      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification du statut du paiement:", error);
      setWebhookStatus('failed');
      setPaymentError("Erreur lors de la vérification du paiement. Veuillez nous contacter.");
      return false;
    }
  };
  
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
      // Stocker l'ID du paiement
      setPaymentIntentId(paymentIntentId);
      console.log("Paiement réussi, ID:", paymentIntentId);
      
      // Passer à l'étape de traitement pour attendre la confirmation du webhook
      setCurrentStep('processing');
      setWebhookStatus('pending');
      
      // Vérifier périodiquement le statut du paiement via le webhook
      const isConfirmed = await checkPaymentStatus(paymentIntentId);
      
      // Si le paiement est confirmé, passer à l'étape de confirmation
      if (isConfirmed) {
        setCurrentStep('confirmation');
      } else {
        // Sinon, afficher l'erreur
        setCurrentStep('error');
      }
    } catch (error) {
      console.error("Erreur lors de la gestion du paiement:", error);
      setPaymentError(error instanceof Error ? error.message : "Erreur lors du traitement du paiement");
      setCurrentStep('error');
    }
  };

  // Gestion des erreurs de paiement
  const handlePaymentError = (error: string) => {
    console.error("Erreur de paiement:", error);
    setPaymentError(error);
    setCurrentStep('error');
  };
  
  // Revenir à l'étape précédente
  const handleBackToService = () => {
    setCurrentStep('service');
  };
  
  // Revenir à l'étape de sélection de date
  const handleBackToDateTime = () => {
    setCurrentStep('datetime');
  };
  
  // Formater la date pour l'affichage
  const formatDate = (date: Date) => {
    return format(date, 'EEEE d MMMM yyyy', { locale: fr });
  };
  
  // Obtenir le nom du staff sélectionné
  const getStaffName = () => {
    if (!selectedStaffId) return "Sans préférence";
    const staff = staffMembers.find(s => s.id === selectedStaffId);
    return staff ? staff.id : "Coiffeur inconnu";
  };
  
  // Fonctions helper pour obtenir les dates ISO
  const getStartDateISOString = () => {
    if (!selectedDate || !selectedTime) return '';
    
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);
    
    return startDate.toISOString();
  };

  const getEndDateISOString = () => {
    if (!selectedDate || !selectedTime || !selectedService) return '';
    
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + selectedService.duration);
    
    return endDate.toISOString();
  };
  
  // Réinitialiser le processus de réservation
  const resetBooking = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedStaffId(null);
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setPaymentIntentId(null);
    setBookingId(null);
    setWebhookStatus(null);
    setPaymentError(null);
    setCurrentStep('service');
  };
  
  return (
    <div
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

          {/* Contenu */}
          <div className="p-4">
            {/* Stepper - Masqué pendant le traitement, la confirmation et l'erreur */}
            {(currentStep === 'service' || currentStep === 'datetime' || currentStep === 'info' || currentStep === 'payment') && (
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
            )}
            
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
                    {/* Étape 1: Sélection du service */}
                    {currentStep === 'service' && (
                      <ServiceSelection 
                        onServiceSelected={handleServiceSelected} 
                        selectedServiceId={selectedService?.id || null}
                      />
                    )}
                    
                    {/* Étape 2: Sélection de la date et heure */}
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
                    
                    {/* Étape 3: Informations client */}
                    {currentStep === 'info' && selectedService && selectedDate && selectedTime && (
  <StepInfoContact
    selectedService={selectedService}
    selectedDate={selectedDate}
    selectedTime={selectedTime}
    selectedStaffId={selectedStaffId}
    staffMembers={staffMembers}
    clientName={clientName}
    clientPhone={clientPhone}
    clientEmail={clientEmail}
    setClientName={setClientName}
    setClientPhone={setClientPhone}
    setClientEmail={setClientEmail}
    onBack={handleBackToDateTime}
    onProceed={handleProceedToPayment}
  />
)}


                    {/* Étape 4: Paiement */}
                    {currentStep === 'payment' && selectedService && (
                      
                      <StripeProvider>
                        <div className="text-center mb-6">
        <button
          className="flex items-center justify-center gap-1 text-sm text-white/70 hover:text-white mx-auto mb-3"
          onClick={() => setCurrentStep('info')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Retour aux informations
        </button>
      </div>
                        <PaymentForm
                          amount={selectedService.discountedPrice || selectedService.originalPrice}
                          serviceId={selectedService.id}
                          serviceTitle={selectedService.title}
                          serviceDuration={selectedService.duration}
                          staffId={selectedStaffId || ''}
                          startTime={getStartDateISOString()}
                          endTime={getEndDateISOString()}
                          clientName={clientName}
                          clientPhone={clientPhone}
                          clientEmail={clientEmail}
                          onPaymentSuccess={handlePaymentSuccess}
                          onPaymentError={handlePaymentError}
                        />
                      </StripeProvider>
                    )}
                    
                    {/* Étape intermédiaire: Traitement du paiement */}
                    {currentStep === 'processing' && (
                      <div className="py-12 text-center">
                        <div className="w-16 h-16 border-4 border-t-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
                        
                        <h2 className="text-xl font-medium mb-4">Traitement en cours...</h2>
                        <p className="text-white/80 mb-6">
                          Votre paiement est en cours de traitement. Merci de patienter quelques instants...
                        </p>
                        <p className="text-white/60 text-sm mb-6">
                          Ne fermez pas cette fenêtre pendant le traitement.
                        </p>
                      </div>
                    )}

                    {/* Étape finale: Confirmation */}
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
                          Votre rendez-vous a bien été enregistré. Vous recevrez une confirmation par SMS.
                        </p>
                        
                        {/* Résumé de la réservation */}
                        {selectedService && selectedDate && selectedTime && (
                          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-6 max-w-sm mx-auto text-left">
                            <h3 className="text-lg font-medium mb-2">Détails de votre rendez-vous</h3>
                            <ul className="space-y-2 text-sm">
                              <li><span className="text-white/60">Service:</span> {selectedService.title}</li>
                              <li><span className="text-white/60">Date:</span> {formatDate(selectedDate)}</li>
                              <li><span className="text-white/60">Heure:</span> {selectedTime}</li>
                              <li><span className="text-white/60">Coiffeur:</span> {getStaffName()}</li>
                              <li><span className="text-white/60">Prix:</span> {selectedService.discountedPrice || selectedService.originalPrice}€</li>
                              {bookingId && <li><span className="text-white/60">Référence:</span> {bookingId}</li>}
                            </ul>
                          </div>
                        )}
                        
                        <button 
                          className="bg-white text-purple-900 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition-colors"
                          onClick={() => window.location.href = '/'}
                        >
                          Retour à l&apos;accueil
                        </button>
                      </div>
                    )}
                    
                    {/* Étape d'erreur */}
                    {currentStep === 'error' && (
                      <div className="py-12 text-center">
                        <svg
                          className="w-16 h-16 text-red-500 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        
                        <h2 className="text-xl font-medium mb-4">Une erreur est survenue</h2>
                        <p className="text-white/80 mb-6">
                          {paymentError || "Nous n'avons pas pu traiter votre paiement. Veuillez réessayer ou nous contacter."}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button 
                            className="backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white py-2 px-4 rounded-lg transition-colors"
                            onClick={() => setCurrentStep('payment')}
                          >
                            Réessayer
                          </button>
                          
                          <button 
                            className="bg-white text-purple-900 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition-colors"
                            onClick={resetBooking}
                          >
                            Recommencer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}