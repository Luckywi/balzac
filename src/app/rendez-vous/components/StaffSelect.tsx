"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { StaffMember } from '../../lib/firebase/types';

interface StaffSelectProps {
  staffMembers: StaffMember[];
  selectedStaffId: string | null;
  onChange: (staffId: string | null) => void;
  className?: string;
}

export default function StaffSelect({ 
  staffMembers, 
  selectedStaffId, 
  onChange,
  className = '' 
}: StaffSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Staff members dans le composant:", staffMembers);
  }, [staffMembers]);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Trouver le staff actuel sélectionné ou utiliser "Sans préférence"
  const getSelectedStaffName = () => {
    if (!selectedStaffId) return "Avec qui ?";
    const staff = staffMembers.find(s => s.id === selectedStaffId);
    return staff ? staff.name : "Avec qui ?";
  };

  // Animation variants pour le dropdown
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      height: 0,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      height: 'auto',
      transition: { 
        duration: 0.2,
        staggerChildren: 0.05,
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      height: 0,
      transition: { 
        duration: 0.2,
      }
    }
  };

  // Animation pour chaque option
  const optionVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Bouton du select */}
      <button
        type="button"
        className="w-full rounded-lg bg-white/20 p-3 text-white outline-none focus:bg-white/30 transition-colors flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{getSelectedStaffName()}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2 flex-shrink-0"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </button>

      {/* Dropdown des options avec fond plus opaque */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-10 w-full mt-1 bg-black/70 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
          >
            {/* Option "Sans préférence" */}
            <motion.button
              variants={optionVariants}
              className={`w-full text-left px-4 py-3 hover:bg-white/30 transition-colors ${
                selectedStaffId === null ? 'bg-white/30 text-white' : 'text-white/90'
              }`}
              onClick={() => {
                onChange(null);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 w-8 h-8 flex items-center justify-center mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                Sans préférence
              </div>
            </motion.button>

            {/* Affichage du debugging pour vérifier les données */}
            {staffMembers.length === 0 && (
              <div className="p-4 text-white text-center">
                Aucun collaborateur disponible
              </div>
            )}

            {/* Options des staffs */}
            {staffMembers.map((staff) => (
              <motion.button
                key={staff.id}
                variants={optionVariants}
                className={`w-full text-left px-4 py-3 hover:bg-white/30 transition-colors ${
                  selectedStaffId === staff.id ? 'bg-white/30 text-white' : 'text-white/90'
                }`}
                onClick={() => {
                  onChange(staff.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  {staff.photoURL ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-white/10">
                      <Image 
                        src={staff.photoURL} 
                        alt={staff.name || "Collaborateur"} 
                        width={32} 
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="rounded-full bg-white/20 w-8 h-8 flex items-center justify-center mr-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  )}
                  <div>
                    <div className="font-medium">
                      {staff.name || `Collaborateur ${staff.id}`}
                    </div>
                    {staff.role && (
                      <div className="text-xs text-white/70">{staff.role}</div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}