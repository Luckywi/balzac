"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Minimum swipe distance (en px) requis pour déclencher un changement de page
  const minSwipeDistance = 50;

  // Effet pour initialiser la hauteur de la fenêtre et écouter les changements
  useEffect(() => {
    // Définir la hauteur de viewport initiale (évite les calculs incorrects au montage)
    const calculateViewportHeight = () => {
      // On utilise window.innerHeight pour obtenir la hauteur visuelle réelle
      const vh = window.innerHeight;
      setViewportHeight(vh);
      
      // Applique une variable CSS pour les hauteurs relatives
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Calcul initial
    calculateViewportHeight();

    // Recalculer à chaque redimensionnement ou changement d'orientation
    window.addEventListener('resize', calculateViewportHeight);
    window.addEventListener('orientationchange', calculateViewportHeight);

    // Éviter les oscillations du viewport sur iOS en désactivant le zoom automatique
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    return () => {
      window.removeEventListener('resize', calculateViewportHeight);
      window.removeEventListener('orientationchange', calculateViewportHeight);
    };
  }, []);

  // Gestionnaire du toucher initial
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(null);
  };

  // Gestionnaire du toucher final
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  // Gestionnaire de swipe
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    // Calcul de la distance de swipe
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < 0;
    const isSwipeUp = distance > 0;
    const absDistance = Math.abs(distance);
    
    // Si la transition est déjà en cours, on ignore le swipe
    if (isTransitioning) return;

    // Si la distance de swipe est suffisante
    if (absDistance > minSwipeDistance) {
      if (isSwipeUp && currentPage === 0) {
        // Swipe vers le haut depuis la première page
        changePage(1);
      } else if (isSwipeDown && currentPage === 1) {
        // Swipe vers le bas depuis la deuxième page
        changePage(0);
      }
    }
    
    // Réinitialiser les valeurs de toucher
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, currentPage, isTransitioning]);

  // Fonction pour changer de page avec animation
  const changePage = useCallback((pageIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentPage(pageIndex);
    
    // Réinitialiser l'état de transition après l'animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Correspond à la durée de transition CSS (500ms + marge)
  }, [isTransitioning]);

  // Gestionnaire de la molette de souris (pour desktop)
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isTransitioning) return;
    
    if (e.deltaY > 0 && currentPage === 0) {
      // Défilement vers le bas
      changePage(1);
    } else if (e.deltaY < 0 && currentPage === 1) {
      // Défilement vers le haut
      changePage(0);
    }
  }, [currentPage, changePage, isTransitioning]);

  // Effet pour gérer l'événement de la molette
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  // Fonction pour défiler vers la deuxième page
  const scrollToSecondPage = () => {
    changePage(1);
  };

  // Calculer les styles pour l'animation de la première page
  const firstPageStyle = {
    opacity: currentPage === 0 ? 1 : 0,
    transform: currentPage === 0 ? 'translateY(0)' : 'translateY(-30px)',
    pointerEvents: currentPage === 0 ? 'auto' : 'none',
  };

  // Calculer les styles pour l'animation de la deuxième page
  const secondPageStyle = {
    opacity: currentPage === 1 ? 1 : 0,
    transform: currentPage === 1 ? 'translateY(0)' : 'translateY(30px)',
    pointerEvents: currentPage === 1 ? 'auto' : 'none',
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '100vh', touchAction: 'none' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fond avec dégradé qui reste fixe */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(to bottom, #000000, #8A9A80)`,
        }}
      />

      {/* Première page - Informations du salon */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-between px-4 py-12 overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          ...firstPageStyle,
          height: viewportHeight ? `${viewportHeight}px` : '100vh',
          fontFamily: "var(--font-jetbrains-mono)",
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto text-center text-white">
          <h1 className="text-4xl font-medium mb-3">Le Balzac</h1>
          
          <p className="text-sm mb-1">
            Salon de coiffure Homme et
          </p>
          <p className="text-sm mb-16">
            Femme à Décines-Charpieux
          </p>
          
          <Link
            href="/rendez-vous"
            className="border border-white rounded-full py-3 px-10 text-sm mb-16 hover:bg-white/10 transition-colors"
          >
            PRENDRE RDV
          </Link>
          
          <div className="flex items-center justify-center mb-1">
            {[1, 2, 3, 4].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                className="mx-0.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="mx-0.5"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="black"
                opacity="0.5"
                clipPath="inset(0 50% 0 0)"
              />
            </svg>
          </div>
          
          <p className="text-sm mb-2">(4.6)</p>
          
          <button className="text-xs underline">
            Voir les 1090 avis
          </button>
        </div>
        
        <div className="pb-8">
          <button 
            onClick={scrollToSecondPage}
            className="animate-bounce focus:outline-none"
            aria-label="Défiler vers le bas"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Deuxième page - Menu */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 transition-all duration-500 ease-in-out"
        style={{
          ...secondPageStyle,
          height: viewportHeight ? `${viewportHeight}px` : '100vh',
          fontFamily: "var(--font-jetbrains-mono)",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto gap-4">
          {[
            { name: "PRENDRE RDV", href: "/rendez-vous" },
            { name: "PRESTATIONS", href: "/prestations" },
            { name: "L'ÉQUIPE", href: "/equipe" },
            { name: "LES AVIS", href: "/avis" },
            { name: "ACCÈS", href: "/acces" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="border border-white rounded-full py-3 px-10 w-full max-w-xs text-center text-white hover:bg-white/10 transition-colors"
              prefetch={true}
            >
              {item.name}
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}