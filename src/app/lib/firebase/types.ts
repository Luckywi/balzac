// src/lib/firebase/types.ts
import { Timestamp } from "firebase/firestore";

// Types communs
export type DayOfWeek = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';

// Interface pour les rendez-vous
export interface Rdv {
  id: string;
  serviceId: string;
  serviceTitle: string;
  serviceDuration: number; // en minutes
  staffId: string;
  start: string; // ISO date string
  end: string;   // ISO date string
  notes?: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  price: number;
  source: string; // 'admin' ou 'client'
  createdAt: Timestamp;
  paid?: boolean;
  paymentIntentId?: string; // ID de l'intention de paiement Stripe
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

// Interface pour la configuration du salon
export interface Break {
  id: string;
  day: DayOfWeek;
  start: string; // format HH:mm
  end: string;   // format HH:mm
}

export interface Vacation {
  id: string;
  startDate: string; // format YYYY-MM-DD
  endDate: string;   // format YYYY-MM-DD
  description: string;
}

export interface SalonConfig {
  workDays: Record<DayOfWeek, boolean>; // ex: {'Lundi': true, 'Dimanche': false}
  workHours: Record<DayOfWeek, {start: string, end: string}>; // ex: {'Lundi': {start: '09:00', end: '18:00'}}
  breaks: Break[];
  vacations: Vacation[];
  updatedAt: Timestamp;
}

// Interface pour les disponibilités du personnel
export interface TimeRange {
  start: string; // format HH:mm
  end: string;   // format HH:mm
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

export interface StaffAvailability {
  staffId: string;
  workingHours: Record<DayOfWeek, {
    working: boolean;
    ranges: TimeRange[];
  }>;
  breaks: Break[];
  vacations: Vacation[];
}

// Interface pour les sections et services
export interface Section {
  id: string;
  title: string;
  description?: string;
  order?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutes
  originalPrice: number;
  discount: number | null; // pourcentage de réduction (ex: -15, -30, -50)
  discountedPrice: number | null;
  sectionId: string;
  enabled?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}