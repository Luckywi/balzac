"use client";

import React from "react";
import { motion } from "framer-motion";

interface BookingStepperProps {
  currentStep: number;
  steps: { id: number; label: string }[];
}

export default function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="mb-6 px-2 flex justify-center">
      <div className="flex items-center justify-center gap-x-2">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isPast = step.id < currentStep;

          return (
            <React.Fragment key={step.id}>
              <motion.div
                layout
                className={`flex items-center justify-center h-7 px-3 font-medium text-xs overflow-hidden
                  ${isCurrent ? "bg-white text-purple-900" : isPast ? "bg-white/80 text-purple-900" : "bg-white/20 text-white"}
                  rounded-full transition-colors
                `}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <span className="whitespace-nowrap">
                  {isCurrent ? step.label : step.id}
                </span>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="w-4 h-0.5 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    layout
                    className="h-full bg-white rounded-full"
                    animate={{ width: isPast ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
