"use client";

import { motion } from 'framer-motion';
import type { Service } from '../../lib/firebase/types';

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onClick: () => void;
}

export default function ServiceCard({ service, selected, onClick }: ServiceCardProps) {
  const displayPrice = service.discountedPrice !== null ? service.discountedPrice : service.originalPrice;
  const formattedDuration = `${service.duration}min`;

  return (
    <motion.div
      className={`relative mb-4 p-4 rounded-2xl cursor-pointer transition-all border ${
        selected 
          ? 'bg-white text-purple-900 shadow-md border-purple-300' 
          : 'bg-white/10 text-white hover:bg-white/20 border-white/10'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      layout
    >
      {/* Tag réduction en haut à droite */}
      {service.discount && (
 <div
 aria-label={`Réduction de ${service.discount}%`}
 className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-extrabold w-8 h-8 flex items-center justify-center rounded-full shadow-md z-10 leading-none"
>
 {service.discount}%
</div>
)}


      {/* Titre et description */}
      <div>
        <h3 className="text-base font-semibold">{service.title}</h3>
        {service.description && (
          <p className={`text-xs mt-1 ${selected ? 'text-purple-900' : 'text-white/70'}`}>
            {service.description}
          </p>
        )}
      </div>

      {/* Prix et durée */}
      <div className="mt-4 flex items-end justify-between">
        {/* Bloc prix */}
        <div className="flex">
          {service.discountedPrice !== null && (
            <span className="text-md line-through opacity-60 mr-2">{service.originalPrice}€</span>
          )}
          <span className="text-md font-bold">{displayPrice}€</span>
        </div>

        {/* Durée */}
        <span className={`text-sm font-medium ${selected ? 'text-purple-900' : 'text-white/60'}`}>
          {formattedDuration}
        </span>
      </div>
    </motion.div>
  );
}
