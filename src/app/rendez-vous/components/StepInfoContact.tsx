"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Service, StaffMember } from "../../lib/firebase/types";
import React, { useMemo } from "react";

interface StepInfoContactProps {
  selectedService: Service;
  selectedDate: Date;
  selectedTime: string;
  selectedStaffId: string | null;
  staffMembers: StaffMember[];
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  setClientName: (val: string) => void;
  setClientPhone: (val: string) => void;
  setClientEmail: (val: string) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function StepInfoContact({
  selectedService,
  selectedDate,
  selectedTime,
  selectedStaffId,
  staffMembers,
  clientName,
  clientPhone,
  clientEmail,
  setClientName,
  setClientPhone,
  setClientEmail,
  onBack,
  onProceed
}: StepInfoContactProps) {
  const formatDate = (date: Date) => format(date, "EEEE d MMMM yyyy", { locale: fr });
  const getStaffName = () => {
    if (!selectedStaffId) return "Sans préférence";
    const staff = staffMembers.find(s => s.id === selectedStaffId);
    return staff ? staff.id : "Coiffeur inconnu";
  };

  const isPhoneValid = useMemo(() => /^\+?\d{9,15}$/.test(clientPhone.trim().replace(/\s+/g, "")), [clientPhone]);
  const isFormValid = clientName.trim().length > 1 && isPhoneValid;

  return (
    <div className="py-8">
      <div className="text-center mb-6">
        <button
          className="flex items-center justify-center gap-1 text-sm text-white/70 hover:text-white mx-auto mb-3"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Modifier les horaires
        </button>
      </div>

      {/* Résumé dans une card */}
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6 text-sm">
        <h3 className="text-lg font-medium mb-2">Votre réservation</h3>
        <ul className="space-y-1">
          <li><span className="text-white/60">Service:</span> {selectedService.title}</li>
          <li><span className="text-white/60">Date:</span> {formatDate(selectedDate)}</li>
          <li><span className="text-white/60">Heure:</span> {selectedTime}</li>
          <li><span className="text-white/60">Coiffeur:</span> {getStaffName()}</li>
          <li><span className="text-white/60">Prix:</span> {selectedService.discountedPrice || selectedService.originalPrice}€</li>
        </ul>
      </div>

      {/* Formulaire stylisé */}
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">Nom complet</label>
          <input
            id="name"
            className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none"
            placeholder="Jean Dupont"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm mb-1">Téléphone</label>
          <input
            id="phone"
            type="tel"
            className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none"
            placeholder="06 12 34 56 78"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email (optionnel)</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none"
            placeholder="jean@mail.com"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </div>
      </form>

      <div className="text-center mt-8">
        <button
          className={`py-3 px-8 rounded-lg shadow transition font-semibold ${
            isFormValid
              ? 'bg-white text-purple-900 hover:bg-gray-100'
              : 'bg-white/20 text-white/50 cursor-not-allowed'
          }`}
          onClick={onProceed}
          disabled={!isFormValid}
        >
          Continuer au paiement
        </button>
      </div>
    </div>
  );
}
