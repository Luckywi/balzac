"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCarousel from './ImageCarousel';

interface TabNavigationProps {
  salonImages: {
    src: string;
    alt: string;
  }[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ salonImages }) => {
  const [activeTab, setActiveTab] = useState('salon');
  // Déclaré au niveau du composant principal, pas dans une fonction de rendu conditionnelle
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  const tabs = [
    { id: 'salon', label: 'Salon' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'acces', label: 'Accès' }
  ];

  // Animation variants with improved transitions
  const contentVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  // Direction for animations (1 = right, -1 = left)
  const getDirection = (newTab: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = tabs.findIndex(tab => tab.id === newTab);
    return newIndex > currentIndex ? 1 : -1;
  };

  // Handle tab change with improved transitions
  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      // Ajouter un effet de feedback tactile pour améliorer l'UX
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50); // Légère vibration sur mobile (50ms)
      }
      
      setActiveTab(tabId);
    }
  };

  // Fonction pour mettre à jour l'index du membre actuel
  const handleMemberChange = (index: number) => {
    setCurrentMemberIndex(index);
  };

  // Team members data
  const teamMembers = [
    {
      name: 'Béa',
      role: 'La patronne depuis 15 ans, une styliste chevronnée, toujours de bon conseil et à l\'écoute.',
      image: '/images/salon/image1.webp' 
    },
    {
      name: 'Cyrille',
      role: 'Coloriste experte, passionnée par les techniques innovantes et les tendances.',
      image: '/images/salon/image3.webp'
    },
  ];

  // Transformez les données des membres de l'équipe au format attendu par ImageCarousel
  const teamImages = teamMembers.map((member) => ({
    src: member.image,
    alt: `${member.name} - ${member.role}`
  }));

  // Render salon content
  const renderSalonContent = () => (
    <div className="p-4">
      <ImageCarousel images={salonImages} autoplaySpeed={6000} />
        
      <motion.div 
        className="mt-4 p-3 bg-white/5 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 className="text-lg font-medium text-white mb-2">Le Balzac</h3>
        <p className="text-sm text-white/80">
          Notre salon de coiffure moderne et accueillant vous attend pour une expérience de beauté personnalisée. 
        </p>
        <div className="flex justify-between mt-3 text-sm text-white/70">
          <div>Mardi-Samedi: 9h-19h <br></br>
          Tél: 04 72 00 00 00</div>
        </div>
      </motion.div>
    </div>
  );

  // Render team content
  const renderEquipeContent = () => {
    // Membre actuellement affiché
    const currentMember = teamMembers[currentMemberIndex];
    
    return (
      <div className="p-4">
        <ImageCarousel 
          images={teamImages} 
          autoplaySpeed={5000} 
          onSlideChange={handleMemberChange}
        />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentMemberIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-3 bg-white/5 rounded-lg"
          >
            <h3 className="text-lg font-medium text-white mb-2">{currentMember.name}</h3>
            <p className="text-sm text-white/80">
              {currentMember.role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // Render access content
  const renderAccesContent = () => (
    <div className="p-4">
      <div className="w-full h-56 rounded-lg overflow-hidden shadow-md relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-10"></div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.868!2d4.9684!3d45.7672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c1cb00000001%3A0xb4000f5fc4c6c8f2!2s3%20Rue%20Balzac%2C%2069150%20D%C3%A9cines-Charpieu!5e0!3m2!1sfr!2sfr!4v1709052897012!5m2!1sfr!2sfr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <motion.div 
        className="mt-4 p-3 bg-white/5 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        
        <div className="flex items-center justify-center mb-3">
      
          <a 
            href="https://goo.gl/maps/8z9XY1zD3XYqRc7Q6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 text-white/80 text-m underline text-center hover:text-white transition-colors"
          >
            3 Rue Balzac, Grand parking gratuit <br></br><br></br>69150 Décines-Charpieu
          </a>
        </div>
        <br></br>
        
        
        <div className="flex justify-center">
          <motion.a 
            href="https://goo.gl/maps/8z9XY1zD3XYqRc7Q6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-white rounded-full py-3 px-10 text-white text-center hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
          Itinéraire
          </motion.a>
        </div>
      </motion.div>
    </div>
  );

  // Calculate direction for animation
  const direction = getDirection(activeTab);

  return (
    <div className="w-full mb-8 bg-black/30 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
      {/* Tabs Navigation en haut du même conteneur que le contenu */}
      <div className="relative">
  <div className="flex items-center justify-center gap-2 rounded-xl p-2 relative bg-black/20">
    {/* Les boutons doivent maintenant être flex-initial au lieu de flex-1 */}
    {tabs.map(tab => {
      const isActive = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          className={`py-2 px-4 rounded-xl text-sm transition-colors duration-300 z-10 relative ${
            isActive 
              ? 'text-white font-medium border border-white' 
              : 'text-white/70 hover:text-white/90'
          }`}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
</div>


      
      {/* Tab Content with Animations */}
      <div className="relative w-full">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            {activeTab === 'salon' && renderSalonContent()}
            {activeTab === 'equipe' && renderEquipeContent()}
            {activeTab === 'acces' && renderAccesContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabNavigation;