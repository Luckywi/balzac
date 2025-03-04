// src/app/components/ImageCarousel.tsx - version mise à jour
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageLightbox from './ImageLightBox';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  autoplaySpeed?: number;
  onSlideChange?: (index: number) => void; // Nouveau callback pour notifier du changement
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  autoplaySpeed = 5000,
  onSlideChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Notify parent component when slide changes
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  // Effet pour l'autoplay
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [images.length, autoplaySpeed, isPaused]);

  const handleNext = () => {
    if (isTransitioning) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Variantes pour l'animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // Si aucune image n'est fournie
  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-black/20 rounded-lg flex items-center justify-center">
        <p className="text-white/50">Aucune image disponible</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carrousel d'images */}
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full"
          onAnimationStart={() => setIsTransitioning(true)}
          onAnimationComplete={() => setIsTransitioning(false)}
        >
          <div 
            className="w-full h-full bg-cover bg-center rounded-xl cursor-pointer"
            style={{ 
              backgroundImage: `url(${images[currentIndex].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            role="img"
            aria-label={images[currentIndex].alt}
            onClick={() => setIsLightboxOpen(true)}
          />
          
          {/* Overlay pour assurer la lisibilité des boutons */}
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
        </motion.div>
      </AnimatePresence>

      {/* Boutons de navigation */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
        onClick={handlePrevious}
        aria-label="Image précédente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
        onClick={handleNext}
        aria-label="Image suivante"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            } transition-all duration-300`}
            onClick={() => handleDotClick(index)}
            aria-label={`Voir l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Lightbox pour afficher l'image en plein écran */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        currentImageSrc={images[currentIndex].src}
        currentImageAlt={images[currentIndex].alt}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default ImageCarousel;