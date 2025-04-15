"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addDays, subDays, isSameDay } from 'date-fns';
import { 
  generateAvailableTimeSlots, 
  checkDateHasAvailableSlots,
  formatDateRange,
  formatMonthDay,
  type SalonConfig,
  type StaffAvailability,
  type Rdv,
  type StaffMember
} from '../../lib/availability';

interface DateTimeSelectionProps {
  serviceId: string;
  serviceTitle: string;
  serviceDuration: number;
  servicePrice: number;
  onSelectDateTime: (date: Date, time: string, staffId: string | null) => void;
  onBack: () => void;
  salonConfig: SalonConfig | null;
  staffAvailabilities: StaffAvailability[];
  existingRdvs: Rdv[];
  staffMembers: StaffMember[];
}

export default function DateTimeSelection({
  serviceTitle,
  serviceDuration,
  servicePrice,
  onSelectDateTime,
  onBack,
  salonConfig,
  staffAvailabilities,
  existingRdvs,
  staffMembers
}: DateTimeSelectionProps) {
  const [weekStartDate, setWeekStartDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Générer les dates de la semaine à l'initialisation et au changement de semaine
  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(weekStartDate, i));
    }
    setWeekDates(dates);
    setLoading(false);
  }, [weekStartDate]);

  // Mettre à jour les créneaux disponibles lors de la sélection d'une date
  useEffect(() => {
    if (!selectedDate || !salonConfig) return;
    
    const slots = generateAvailableTimeSlots(
      selectedDate,
      selectedStaffId,
      serviceDuration,
      salonConfig,
      staffAvailabilities,
      existingRdvs
    );
    
    setAvailableTimeSlots(slots);
    setSelectedTime(null);
  }, [selectedDate, selectedStaffId, salonConfig, staffAvailabilities, existingRdvs, serviceDuration]);

  // Fonction pour vérifier si une date a des créneaux disponibles
  const hasAvailableSlots = (date: Date): boolean => {
    if (!salonConfig) return false;
    
    return checkDateHasAvailableSlots(
      date,
      serviceDuration,
      salonConfig,
      staffAvailabilities,
      existingRdvs,
      selectedStaffId
    );
  };

  // Avancer d'une semaine
  const goToNextWeek = () => {
    setWeekStartDate(addDays(weekStartDate, 7));
  };

  // Reculer d'une semaine
  const goToPreviousWeek = () => {
    const previousWeek = subDays(weekStartDate, 7);
    const today = new Date();
    
    // Ne pas permettre de sélectionner des dates dans le passé
    if (previousWeek < today && !isSameDay(previousWeek, today)) {
      // Si on essaie d'aller avant aujourd'hui, mettre à jour à aujourd'hui
      setWeekStartDate(today);
    } else {
      setWeekStartDate(previousWeek);
    }
  };

  // Sélectionner une date
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Formatage de la date pour l'ID d'expansion (ex: "lundi-14-avril")
    const formattedDay = formatMonthDay(date).replace(/\s+/g, '-');
    
    if (expandedDay === formattedDay) {
      // Fermer le jour s'il est déjà ouvert
      setExpandedDay(null);
    } else {
      // Ouvrir le jour sélectionné
      setExpandedDay(formattedDay);
    }
  };

  // Sélectionner un créneau horaire
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  // Gérer le clic sur le bouton Continuer
  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelectDateTime(selectedDate, selectedTime, selectedStaffId);
    }
  };

  // Gérer le changement de coiffeur
  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStaffId(value === "no-preference" ? null : value);
    setSelectedTime(null);
    setExpandedDay(null);
  };

  // Vérifier si un jour est le jour actuellement développé
  const isDayExpanded = (date: Date): boolean => {
    if (!expandedDay) return false;
    const formattedDay = formatMonthDay(date).replace(/\s+/g, '-');
    return expandedDay === formattedDay;
  };

  // Formatter l'intervalle de dates affiché
  const weekRange = formatDateRange(weekDates[0] || new Date(), weekDates[6] || addDays(new Date(), 6));

  if (loading || !salonConfig) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse bg-white/10 h-8 w-40 rounded-lg mx-auto mb-4"></div>
        <div className="animate-pulse bg-white/10 h-32 w-full rounded-lg mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-5">
        <h2 className="text-xl font-medium mb-2">Choisir la date et l&apos;heure</h2>
        <button 
          onClick={onBack}
          className="flex items-center text-sm text-white/70 hover:text-white transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-1"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Modifier le service
        </button>
      </div>

      {/* Service Info Card */}
      <div className="bg-white/10 rounded-lg p-4 mb-4">
        <h3 className="font-medium text-white">{serviceTitle}</h3>
        <p className="text-sm text-white/70">{serviceDuration}min - {servicePrice}€</p>
        
        {/* Staff Selection Dropdown */}
        <div className="mt-3">
          <select
            value={selectedStaffId || "no-preference"}
            onChange={handleStaffChange}
            className="w-full rounded-lg bg-white/20 p-3 text-white outline-none focus:bg-white/30 transition-colors"
          >
            <option value="no-preference">Avec qui ?</option>
            {staffMembers && staffMembers.length > 0 ? (
              staffMembers.map(staff => (
                <option key={staff.id} value={staff.id}>{staff.name}</option>
              ))
            ) : (
              <option disabled>Chargement des coiffeurs...</option>
            )}
          </select>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousWeek}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Semaine précédente"
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <span className="text-sm">{weekRange}</span>
        
        <button
          onClick={goToNextWeek}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Semaine suivante"
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
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {weekDates.map((date) => {
          const isAvailable = hasAvailableSlots(date);
          const isExpanded = isDayExpanded(date);
          return (
            <div key={date.toISOString()}>
              <button 
                className={`w-full text-left p-4 rounded-lg flex items-center justify-between transition-colors ${
                  isAvailable 
                    ? 'bg-white/10 hover:bg-white/20 cursor-pointer' 
                    : 'bg-white/5 text-white/50 cursor-not-allowed'
                } ${isExpanded ? 'bg-white/20' : ''}`}
                onClick={() => isAvailable && handleDateSelect(date)}
                disabled={!isAvailable}
              >
                <span>{formatMonthDay(date)}</span>
                {isAvailable && (
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
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {availableTimeSlots.length > 0 ? (
                        availableTimeSlots.map((time) => (
                          <button
                            key={time}
                            className={`p-3 rounded-lg text-center text-sm transition-colors ${
                              selectedTime === time
                                ? 'bg-white text-purple-700 font-medium shadow-md'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </button>
                        ))
                      ) : (
                        <div className="col-span-3 py-4 text-center text-white/60">
                          Aucun créneau disponible
                        </div>
                      )}
                    </div>
                    
                    {availableTimeSlots.length > 6 && (
                      <div className="py-2 px-4 text-center">
                        <button className="text-sm text-white/70 hover:text-white underline">
                          Voir plus
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      
      {/* Continuer button - only show when a time is selected */}
      {selectedTime && selectedDate && (
        <div className="mt-6 text-center">
          <button
            className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition"
            onClick={handleContinue}
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}