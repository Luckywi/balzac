"use client";

import { motion } from 'framer-motion';
import type { Service } from '../../lib/firebase/types';

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onClick: () => void;
}

export default function ServiceCard({ service, selected, onClick }: ServiceCardProps) {
  // Calculer le prix à afficher - original ou remisé
  const displayPrice = service.discountedPrice !== null ? service.discountedPrice : service.originalPrice;
  
  // Convertir la durée en format lisible (ex: 30min)
  const formattedDuration = `${service.duration}min`;
  
  return (
    <motion.div
      className={`mb-3 p-4 rounded-lg cursor-pointer transition-all ${
        selected 
          ? 'bg-white text-purple-700 shadow-md' 
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      layout
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-medium">{service.title}</h3>
          
          {/* Description */}
          {service.description && (
            <p className={`text-xs mt-1 ${selected ? 'text-purple-700/70' : 'text-white/70'}`}>
              {service.description}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          {/* Prix */}
          <div className="flex items-center">
            {/* Badge de réduction si applicable */}
            {service.discount && (
              <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded mr-2">
                {service.discount}%
              </span>
            )}
            
            <div className="flex flex-col items-end">
              {/* Afficher le prix barré si remisé */}
              {service.discountedPrice !== null && (
                <span className="text-xs line-through opacity-70">
                  {service.originalPrice}€
                </span>
              )}
              
              {/* Prix actuel */}
              <span className="font-bold">
                {displayPrice}€
              </span>
            </div>
          </div>
          
          {/* Durée */}
          <span className={`text-xs mt-1 ${selected ? 'text-purple-700/70' : 'text-white/60'}`}>
            {formattedDuration}
          </span>
        </div>
      </div>
    </motion.div>
  );
}