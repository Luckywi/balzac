"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addDays, subDays, isSameDay } from 'date-fns';
import StaffSelect from './StaffSelect';
import { 
  generateAvailableTimeSlots, 
  checkDateHasAvailableSlots,
  formatDateRange,
  formatMonthDay,
  type SalonConfig,
  type StaffAvailability,
  type StaffMember
} from '../../lib/availability';
import type { Rdv } from '../../lib/firebase/types';

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
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllSlots, setShowAllSlots] = useState<boolean>(false);

  const MAX_VISIBLE_SLOTS = 6;

  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(weekStartDate, i));
    }
    setWeekDates(dates);
    setLoading(false);
  }, [weekStartDate]);

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
    setShowAllSlots(false);
  }, [selectedDate, selectedStaffId, salonConfig, staffAvailabilities, existingRdvs, serviceDuration]);

  useEffect(() => {
    if (selectedDate) {
      const hasSlots = salonConfig ? checkDateHasAvailableSlots(
        selectedDate,
        serviceDuration,
        salonConfig,
        staffAvailabilities,
        existingRdvs,
        selectedStaffId
      ) : false;

      if (!hasSlots) {
        setSelectedDate(null);
        setExpandedDay(null);
      }
    }
  }, [selectedStaffId, salonConfig, staffAvailabilities, existingRdvs, serviceDuration, selectedDate]);

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

  const goToNextWeek = () => {
    setWeekStartDate(addDays(weekStartDate, 7));
  };

  const goToPreviousWeek = () => {
    const previousWeek = subDays(weekStartDate, 7);
    const today = new Date();
    if (previousWeek < today && !isSameDay(previousWeek, today)) {
      setWeekStartDate(today);
    } else {
      setWeekStartDate(previousWeek);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDay = formatMonthDay(date).replace(/\s+/g, '-');
    setExpandedDay(expandedDay === formattedDay ? null : formattedDay);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelectDateTime(selectedDate, selectedTime, selectedStaffId);
    }
  };

  const handleStaffChange = (staffId: string | null) => {
    setSelectedStaffId(staffId);
    setSelectedTime(null);
  };

  const isDayExpanded = (date: Date): boolean => {
    if (!expandedDay) return false;
    const formattedDay = formatMonthDay(date).replace(/\s+/g, '-');
    return expandedDay === formattedDay;
  };

  const weekRange = formatDateRange(weekDates[0] || new Date(), weekDates[6] || addDays(new Date(), 6));

  const visibleSlots = showAllSlots ? availableTimeSlots : availableTimeSlots.slice(0, MAX_VISIBLE_SLOTS);

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
      <div className="mb-5 flex justify-center">
      <button 
  onClick={onBack} 
  className="flex items-center justify-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
  Modifier le service
</button>
      </div>

      <div className="bg-white/10 rounded-lg p-4 mb-4">
        <h3 className="font-medium text-white">{serviceTitle}</h3>
        <p className="text-sm text-white/70 mb-3">{serviceDuration}min - {servicePrice}€</p>
        <StaffSelect staffMembers={staffMembers} selectedStaffId={selectedStaffId} onChange={handleStaffChange} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPreviousWeek} className="p-2 text-white/70 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <span className="text-sm">{weekRange}</span>
        <button onClick={goToNextWeek} className="p-2 text-white/70 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {visibleSlots.length > 0 ? (
                        visibleSlots.map((time) => (
                          <button key={time} className={`p-3 rounded-lg text-center text-sm transition-colors ${selectedTime === time ? 'bg-white text-purple-900 font-medium shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'}`} onClick={() => handleTimeSelect(time)}>
                            {time}
                          </button>
                        ))
                      ) : (
                        <div className="col-span-3 py-4 text-center text-white/60">
                          Aucun créneau disponible
                        </div>
                      )}
                    </div>

                    {availableTimeSlots.length > MAX_VISIBLE_SLOTS && (
                      <div className="py-2 px-4 text-center">
                        <button onClick={() => setShowAllSlots(!showAllSlots)} className="text-sm text-white/70 hover:text-white underline">
                          {showAllSlots ? 'Réduire la liste' : 'Voir plus'}
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

      {selectedTime && selectedDate && (
        <div className="mt-6 text-center">
          <button className="bg-white text-purple-900 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition" onClick={handleContinue}>
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}
