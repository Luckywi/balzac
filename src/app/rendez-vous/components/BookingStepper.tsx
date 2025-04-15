"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BookingStepperProps {
  currentStep: number;
  steps: { id: number; label: string }[];
}

export default function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="mb-6 px-2">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;
          
          return (
            <React.Fragment key={step.id}>
              {/* Numéro d'étape */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isActive || isPast 
                      ? 'bg-white text-purple-500' 
                      : 'bg-white/20 text-white'
                  } mb-1 font-medium`}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive 
                      ? 'rgb(255, 255, 255)' 
                      : isPast 
                        ? 'rgba(255, 255, 255, 0.8)' 
                        : 'rgba(255, 255, 255, 0.2)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isPast ? (
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
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    step.id
                  )}
                </motion.div>
                <span className="text-xs text-white/80">{step.label}</span>
              </div>
              
              {/* Ligne de connexion entre les étapes */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-px max-w-[60px] mx-1">
                  <div className="h-full bg-white/30 rounded-full">
                    <motion.div 
                      className="h-full bg-white rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: isPast ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}