"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCarousel from './ImageCarousel';
import Modal from './Modal';

interface TabNavigationProps {
  salonImages: {
    src: string;
    alt: string;
  }[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ salonImages }) => {
  const [activeTab, setActiveTab] = useState('salon');
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [isHoraireModalOpen, setIsHoraireModalOpen] = useState(false);

  const tabs = [
    { id: 'salon', label: 'Salon' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'acces', label: 'Accès' }
  ];

  // Données des horaires d'ouverture
  const horaires = [
    { jour: "Lundi", heures: "Fermé" },
    { jour: "Mardi", heures: ["08:30 - 11:45", "14:00 - 18:15"] },
    { jour: "Mercredi", heures: "08:30 - 18:15" },
    { jour: "Jeudi", heures: "08:30 - 18:15" },
    { jour: "Vendredi", heures: "08:30 - 18:30" },
    { jour: "Samedi", heures: "08:30 - 16:00" },
    { jour: "Dimanche", heures: "Fermé" },
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

  // Fonction pour ouvrir la modale des horaires
  const openHoraireModal = () => {
    setIsHoraireModalOpen(true);
  };

  // Fonction pour fermer la modale des horaires
  const closeHoraireModal = () => {
    setIsHoraireModalOpen(false);
  };

  // Fonction pour appeler le salon
  const callSalon = () => {
    window.location.href = "tel:0472000000";
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
        <h3 className="text-lg font-medium text-white mb-3">Le Balzac</h3>
        <p className="text-sm text-white/80 mb-4">
          Notre salon de coiffure moderne et accueillant vous attend pour une expérience de beauté personnalisée.
        </p>
        
        {/* Nouveaux boutons pour remplacer le texte des horaires et téléphone */}
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={openHoraireModal}
            className="flex items-center justify-center gap-2 border border-white rounded-lg py-2 px-4 text-white text-sm hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
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
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Horaires
          </motion.button>
          
          <motion.button
            onClick={callSalon}
            className="flex items-center justify-center gap-2 border border-white rounded-lg py-2 px-4 text-white text-sm hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Téléphone
          </motion.button>
        </div>
      </motion.div>
      
      {/* Modale des horaires */}
      <Modal 
        isOpen={isHoraireModalOpen} 
        onClose={closeHoraireModal}
        title="Horaires d'ouverture"
      >
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-5 shadow-lg">
          <div className="divide-y divide-white/10">
            {horaires.map((item) => (
              <div 
                key={item.jour} 
                className="py-4 flex justify-between items-center"
              >
                <span className={`text-base ${item.heures === "Fermé" ? "text-white/60" : "text-white"} font-medium`}>
                  {item.jour}
                </span>
                
                <div className="text-right">
                  {Array.isArray(item.heures) ? (
                    item.heures.map((heure, i) => (
                      <div key={i} className="text-base text-white">
                        {heure}
                      </div>
                    ))
                  ) : (
                    <span className={`text-base ${item.heures === "Fermé" ? "text-white/60" : "text-white"}`}>
                      {item.heures}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center mt-6 text-center text-sm text-white/70">
          <motion.button
            onClick={callSalon}
            className="flex items-center justify-center gap-2 border border-white rounded-lg py-2 px-4 text-white text-sm hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Téléphone
          </motion.button>
            
          </div>
        </div>
      </Modal>
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
      <div className="w-full h-60 rounded-lg overflow-hidden shadow-lg relative">
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
      
      <div className="mt-4 flex items-center justify-center">
        <motion.a 
          href="https://goo.gl/maps/8z9XY1zD3XYqRc7Q6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-white rounded-lg py-3 px-6 text-white text-sm hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
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
            <path d="M3 11l19-9-9 19-2-8-8-2z"></path>
          </svg>
          Itinéraire
        </motion.a>
      </div>
      
      <div className="mt-3 text-center text-white/80 text-sm">
        <p>3 Rue Balzac, 69150 Décines-Charpieu</p>
      </div>
    </div>
  );

  // Calculate direction for animation
  const direction = getDirection(activeTab);

  return (
    <div className="w-full mb-8 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      {/* Tabs Navigation en haut du même conteneur que le contenu */}
      <div className="relative">
        <div className="flex items-center justify-center gap-3 rounded-lg p-4 pb-0">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`py-2 px-4 rounded-lg text-sm transition-colors duration-300 z-10 relative ${
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