// src/app/components/TeamMember.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, index }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center p-4 bg-white/5 rounded-xl backdrop-blur-sm"
    >
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-white/30">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      <h3 className="text-xl font-medium text-white mb-2">{name}</h3>
      
      <p className="text-white/80 text-center text-sm">{role}</p>
    </motion.div>
  );
};

export default TeamMember;