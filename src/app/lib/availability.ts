// src/app/lib/availability.ts
import { addDays, addMinutes, format, isWithinInterval, isSameDay, startOfDay, endOfDay } from 'date-fns';
import { fr as frLocale } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';

// Types from Firebase
export interface WorkHours {
  start: string;
  end: string;
}

export interface Break {
  id: string;
  day: string;
  start: string;
  end: string;
}

export interface Vacation {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SalonConfig {
  workDays: Record<string, boolean>;
  workHours: Record<string, WorkHours>;
  breaks: Break[];
  vacations: Vacation[];
  updatedAt: Timestamp;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface StaffAvailability {
  staffId: string;
  workingHours: Record<string, { 
    working: boolean; 
    ranges: TimeRange[] | Record<string, TimeRange>
  }>;
  breaks: Break[];
  vacations: Vacation[];
}

export interface Rdv {
  id: string;
  serviceId: string;
  serviceTitle: string;
  serviceDuration: number;
  staffId: string;
  start: string; // ISO date string
  end: string;   // ISO date string
  clientName: string;
  clientPhone?: string;
  price: number;
  source: string;
  createdAt: Timestamp;
  paid?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role?: string;
  email?: string;
  photoURL?: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Constants
const DAYS_OF_WEEK = [
  'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
];

// Pour gérer les différentes casses possibles des jours de la semaine
function normalizeDayOfWeek(day: string): string {
  if (!day) return '';
  
  const normalizedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  
  // Cas particulier pour "jeudi" qui pourrait être "Jeudi:"
  if (normalizedDay.includes(':')) {
    return normalizedDay.split(':')[0].trim();
  }
  
  return normalizedDay;
}

// Helper function to find the day key in an object, ignoring case and potential ':' suffix
function findDayKey(obj: Record<string, any>, dayToFind: string): string | null {
  const normalizedDayToFind = normalizeDayOfWeek(dayToFind);
  console.log(`Recherche de ${normalizedDayToFind} dans les clés disponibles`);
  
  // Log les clés disponibles
  console.log("Clés disponibles dans l'objet:", Object.keys(obj));
  
  for (const key of Object.keys(obj)) {
    const normalizedKey = normalizeDayOfWeek(key);
    console.log(`Comparaison: ${normalizedKey} avec ${normalizedDayToFind}`);
    
    if (normalizedKey === normalizedDayToFind) {
      return key;
    }
  }
  
  // Si aucune correspondance exacte, essayons avec startsWith
  for (const key of Object.keys(obj)) {
    const normalizedKey = normalizeDayOfWeek(key);
    if (normalizedKey.startsWith(normalizedDayToFind) || 
        normalizedDayToFind.startsWith(normalizedKey)) {
      return key;
    }
  }
  
  return null;
}

// Format date helpers
export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = format(startDate, 'd', { locale: frLocale });
  const end = format(endDate, 'd MMM', { locale: frLocale });
  return `${start} - ${end}`;
}

export function formatWeekDay(date: Date): string {
  return format(date, 'EEEE d MMMM', { locale: frLocale });
}

export function formatMonthDay(date: Date): string {
  // ex: "lundi 14 avril"
  return format(date, 'EEEE d MMMM', { locale: frLocale }).toLowerCase();
}

// Main function to generate available time slots
export function generateAvailableTimeSlots(
  date: Date,
  staffId: string | null,
  duration: number,
  salonConfig: SalonConfig,
  staffAvailabilities: StaffAvailability[],
  existingRdvs: Rdv[]
): string[] {
  // Récupérer l'heure actuelle pour vérifier les créneaux passés
  const now = new Date();
  
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
  console.log(`Génération des créneaux pour le jour: ${dayOfWeek}`);

  // Nous allons vérifier toutes les possibilités de casse pour le jour
  const dayKey = findDayKey(salonConfig.workDays, dayOfWeek);
  
  // Vérifier si le salon est fermé ce jour-là
  console.log(`Recherche du jour dans workDays. Clé trouvée: ${dayKey}`);
  if (!dayKey || !salonConfig.workDays[dayKey]) {
    console.log(`Le salon est fermé ce jour (${dayOfWeek})`);
    return [];
  }

  // Vérifier si le salon est en vacances ce jour-là
  const isSalonClosedForVacation = salonConfig.vacations.some(vacation => {
    const start = new Date(vacation.startDate);
    const end = new Date(vacation.endDate);
    end.setHours(23, 59, 59, 999);
    return isWithinInterval(date, { start, end });
  });
  
  if (isSalonClosedForVacation) {
    console.log("Le salon est en vacances à cette date");
    return [];
  }

  // Si aucun staff spécifié, récupérer tous les créneaux disponibles
  if (!staffId) {
    console.log("Aucun staff spécifique, on cherche tous les créneaux disponibles");
    // Fusionner les créneaux de tous les staffs
    let allSlots: string[] = [];
    
    for (const staffAvailability of staffAvailabilities) {
      console.log(`Vérification des créneaux pour staff: ${staffAvailability.staffId}`);
      const staffSlots = getStaffTimeSlots(
        date,
        staffAvailability.staffId,
        duration,
        salonConfig,
        staffAvailability,
        existingRdvs,
        now
      );
      
      console.log(`Créneaux trouvés pour staff ${staffAvailability.staffId}: ${staffSlots.length}`);
      allSlots = [...allSlots, ...staffSlots];
    }
    
    // Éliminer les doublons et trier
    const uniqueSlots = [...new Set(allSlots)].sort();
    console.log(`Total des créneaux uniques: ${uniqueSlots.length}`);
    return uniqueSlots;
  }
  
  // Si staff spécifié, récupérer ses créneaux
  const staffAvailability = staffAvailabilities.find(s => s.staffId === staffId);
  if (!staffAvailability) {
    console.log(`Aucune disponibilité trouvée pour staff: ${staffId}`);
    return [];
  }
  
  const staffSlots = getStaffTimeSlots(
    date,
    staffId,
    duration,
    salonConfig,
    staffAvailability,
    existingRdvs,
    now
  );
  
  console.log(`Créneaux disponibles pour staff ${staffId}: ${staffSlots.length}`);
  return staffSlots;
}

// Helper function to convert potentially different structures to TimeRange array
function extractTimeRanges(ranges: any): TimeRange[] {
  const result: TimeRange[] = [];
  
  if (Array.isArray(ranges)) {
    // Si c'est déjà un tableau, retourner directement
    return ranges as TimeRange[];
  }
  
  if (typeof ranges === 'object' && ranges !== null) {
    // Si c'est un objet, extraire les paires start/end
    for (const key in ranges) {
      const range = ranges[key];
      if (range && typeof range === 'object' && 'start' in range && 'end' in range) {
        result.push({
          start: String(range.start),
          end: String(range.end)
        });
      }
    }
  }
  
  return result;
}

// Helper function to get slots for a specific staff
function getStaffTimeSlots(
  date: Date,
  staffId: string,
  duration: number,
  salonConfig: SalonConfig,
  staffAvailability: StaffAvailability,
  existingRdvs: Rdv[],
  now: Date
): string[] {
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
  console.log(`getStaffTimeSlots - Staff: ${staffId}, Jour: ${dayOfWeek}`);
  
  // Trouver la clé correspondant au jour dans les workingHours
  const workingHoursKeys = Object.keys(staffAvailability.workingHours || {});
  console.log("Clés disponibles dans workingHours:", workingHoursKeys);
  
  // Recherche du jour dans les workingHours du staff
  const staffDayKey = findDayKey(staffAvailability.workingHours || {}, dayOfWeek);
  console.log(`Clé du jour pour le staff: ${staffDayKey}`);
  
  // Si aucune clé trouvée, le staff ne travaille pas ce jour
  if (!staffDayKey) {
    console.log(`Le staff ${staffId} ne travaille pas ce jour (aucune clé trouvée)`);
    return [];
  }
  
  // Vérifier si le staff ne travaille pas ce jour-là
  const staffDay = staffAvailability.workingHours[staffDayKey];
  console.log(`Infos du staff pour ce jour:`, staffDay);
  
  if (!staffDay || !staffDay.working) {
    console.log(`Le staff ${staffId} ne travaille pas ce jour.`);
    return [];
  }

  // Vérifier si le staff est en vacances ce jour-là
  const isStaffOnVacation = staffAvailability.vacations.some(vacation => {
    const start = new Date(vacation.startDate);
    const end = new Date(vacation.endDate);
    end.setHours(23, 59, 59, 999);
    return isWithinInterval(date, { start, end });
  });
  
  if (isStaffOnVacation) {
    console.log(`Le staff ${staffId} est en vacances ce jour.`);
    return [];
  }

  // Trouver la clé du jour dans les workHours du salon
  const salonDayKey = findDayKey(salonConfig.workHours, dayOfWeek);
  if (!salonDayKey) {
    console.log(`Impossible de trouver les heures d'ouverture du salon pour ${dayOfWeek}`);
    return [];
  }
  
  const salonHours = salonConfig.workHours[salonDayKey];
  console.log(`Heures d'ouverture du salon: ${salonHours.start} - ${salonHours.end}`);
  
  const workRanges: TimeRange[] = [];

  // Extraire les plages horaires, quels que soient leur format
  const staffRanges = extractTimeRanges(staffDay.ranges);
  console.log(`Plages de travail du staff extraites:`, staffRanges);
  
  // Déterminer les plages de travail en tenant compte des heures d'ouverture du salon
  for (const staffRange of staffRanges) {
    if (staffRange.start < salonHours.end && staffRange.end > salonHours.start) {
      const rangeStart = staffRange.start < salonHours.start ? salonHours.start : staffRange.start;
      const rangeEnd = staffRange.end > salonHours.end ? salonHours.end : staffRange.end;
      workRanges.push({ start: rangeStart, end: rangeEnd });
      console.log(`Plage de travail ajoutée: ${rangeStart} - ${rangeEnd}`);
    }
  }

  if (workRanges.length === 0) {
    console.log(`Aucune plage de travail disponible pour le staff ${staffId}`);
    return [];
  }

  // Trouver les pauses du salon pour ce jour
  const salonBreaksDay = findDayKey(salonConfig, dayOfWeek) || dayOfWeek;
  const salonBreaks = salonConfig.breaks.filter(b => {
    const breakDay = typeof b.day === 'string' 
      ? normalizeDayOfWeek(b.day) 
      : '';
    return breakDay === normalizeDayOfWeek(salonBreaksDay);
  });
  
  // Trouver les pauses du staff pour ce jour
  const staffBreaksDay = findDayKey(staffAvailability, dayOfWeek) || dayOfWeek;
  const staffBreaks = staffAvailability.breaks.filter(b => {
    const breakDay = typeof b.day === 'string' 
      ? normalizeDayOfWeek(b.day) 
      : '';
    return breakDay === normalizeDayOfWeek(staffBreaksDay);
  });
  
  console.log(`Nombre de pauses salon: ${salonBreaks.length}, Nombre de pauses staff: ${staffBreaks.length}`);

  const dateString = format(date, 'yyyy-MM-dd');
  const dayRdvs = existingRdvs.filter(rdv => {
    return rdv.staffId === staffId && rdv.start.startsWith(dateString);
  });
  
  console.log(`Nombre de rendez-vous existants pour cette date: ${dayRdvs.length}`);

  const slots: string[] = [];

  // Générer les créneaux pour chaque plage de travail
  workRanges.forEach(range => {
    let currentTime = range.start;
    console.log(`Génération des créneaux pour la plage ${range.start} - ${range.end}`);

    while (currentTime <= range.end) {
      const [hours, minutes] = currentTime.split(':').map(Number);
      const slotStart = new Date(date);
      slotStart.setHours(hours, minutes, 0, 0);
      const slotEnd = addMinutes(slotStart, duration);
      const slotEndTime = format(slotEnd, 'HH:mm');

      if (slotEndTime > range.end) {
        console.log(`Créneau ignoré: ${currentTime} car il dépasse la fin de la plage (${range.end})`);
        break;
      }

      // Vérifier si le créneau est dans le passé
      const isPastSlot = slotStart <= now;
      
      const isSalonBreak = salonBreaks.some(b => currentTime >= b.start && currentTime < b.end);
      const isStaffBreak = staffBreaks.some(b => currentTime >= b.start && currentTime < b.end);

      const conflictsWithExisting = dayRdvs.some(rdv => {
        const rdvStart = new Date(rdv.start);
        const rdvEnd = new Date(rdv.end);
        return slotStart < rdvEnd && slotEnd > rdvStart;
      });

      // Ne pas ajouter le créneau s'il est dans le passé ou s'il y a un conflit
      if (!isPastSlot && !isSalonBreak && !isStaffBreak && !conflictsWithExisting) {
        slots.push(currentTime);
        console.log(`Créneau disponible ajouté: ${currentTime}`);
      } else {
        if (isPastSlot) console.log(`Créneau ignoré (passé): ${currentTime}`);
        if (isSalonBreak) console.log(`Créneau ignoré (pause salon): ${currentTime}`);
        if (isStaffBreak) console.log(`Créneau ignoré (pause staff): ${currentTime}`);
        if (conflictsWithExisting) console.log(`Créneau ignoré (conflit RDV): ${currentTime}`);
      }

      // Avancer par tranches de 15 minutes
      const temp = new Date();
      temp.setHours(hours, minutes + 15, 0, 0);
      currentTime = format(temp, 'HH:mm');
    }
  });

  console.log(`Total des créneaux disponibles pour staff ${staffId}: ${slots.length}`);
  return slots;
}

// Vérifier si des créneaux sont disponibles pour une date spécifique
export function checkDateHasAvailableSlots(
  date: Date,
  serviceDuration: number,
  salonConfig: SalonConfig,
  staffAvailabilities: StaffAvailability[],
  existingRdvs: Rdv[],
  selectedStaffId: string | null
): boolean {
  // Ajouter du logging pour diagnostiquer le problème
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
  console.log(`Vérification disponibilité pour ${date.toISOString()}, jour: ${dayOfWeek}`);
  
  // Vérifier si le salon est ouvert ce jour-là
  const dayKey = findDayKey(salonConfig.workDays, dayOfWeek);
  const isSalonOpen = dayKey ? salonConfig.workDays[dayKey] : false;
  console.log(`Le salon est-il ouvert ce jour ? ${isSalonOpen ? 'Oui' : 'Non'}`);
  
  if (!isSalonOpen) return false;
  
  // Vérifier si le salon est en vacances
  const isSalonOnVacation = salonConfig.vacations.some(vacation => {
    const start = new Date(vacation.startDate);
    const end = new Date(vacation.endDate);
    end.setHours(23, 59, 59, 999);
    return isWithinInterval(date, { start, end });
  });
  
  console.log(`Le salon est-il en vacances ? ${isSalonOnVacation ? 'Oui' : 'Non'}`);
  if (isSalonOnVacation) return false;
  
  // Si un staff spécifique est sélectionné, vérifier uniquement sa disponibilité
  if (selectedStaffId) {
    const staffAvailability = staffAvailabilities.find(a => a.staffId === selectedStaffId);
    if (!staffAvailability) {
      console.log(`Aucune disponibilité trouvée pour le staff ID: ${selectedStaffId}`);
      return false;
    }
    
    const staffDayKey = findDayKey(staffAvailability.workingHours, dayOfWeek);
    if (!staffDayKey) {
      console.log(`Clé du jour non trouvée pour ${dayOfWeek} dans les horaires du staff`);
      return false;
    }
    
    const isStaffWorking = staffAvailability.workingHours[staffDayKey]?.working;
    console.log(`Le staff ${selectedStaffId} travaille-t-il ce jour ? ${isStaffWorking ? 'Oui' : 'Non'}`);
    
    if (!isStaffWorking) return false;
    
    const isStaffOnVacation = staffAvailability.vacations.some(vacation => {
      const start = new Date(vacation.startDate);
      const end = new Date(vacation.endDate);
      end.setHours(23, 59, 59, 999);
      return isWithinInterval(date, { start, end });
    });
    
    console.log(`Le staff ${selectedStaffId} est-il en vacances ? ${isStaffOnVacation ? 'Oui' : 'Non'}`);
    if (isStaffOnVacation) return false;
  }
  
  // Générer les créneaux disponibles
  const slots = generateAvailableTimeSlots(
    date,
    selectedStaffId,
    serviceDuration,
    salonConfig,
    staffAvailabilities,
    existingRdvs
  );
  
  console.log(`Nombre de créneaux disponibles: ${slots.length}`);
  return slots.length > 0;
}

// Générer une semaine de dates à partir d'une date de départ
export function generateWeekDates(startDate: Date): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
}

// Filtrer les rendez-vous pour une plage de dates
export function filterRdvsForDateRange(rdvs: Rdv[], startDate: Date, endDate: Date): Rdv[] {
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);
  
  return rdvs.filter(rdv => {
    const rdvDate = new Date(rdv.start);
    return rdvDate >= start && rdvDate <= end;
  });
}