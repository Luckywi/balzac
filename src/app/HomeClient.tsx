"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";

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

  // Solution spécifique pour iOS
  if (typeof window !== 'undefined') {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (iOS) {
      // Définir la couleur de fond pour la barre d'état
      document.body.style.setProperty('background-color', '#000000');
      document.documentElement.style.setProperty('background-color', '#000000');
      
      // Force le rendu de la barre d'état par un léger scroll
      window.scrollTo(0, 1);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      // Ajouter la classe pour le mode iOS
      document.documentElement.classList.add('ios-device');
      
      // Gérer l'interface en plein écran
      if (navigator.standalone) {
        document.documentElement.classList.add('ios-standalone');
      }
    }
  }

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


  // Calculer les styles pour l'animation de la première page
  const firstPageStyle = {
    opacity: currentPage === 0 ? 1 : 0,
    transform: currentPage === 0 ? 'translateY(0)' : 'translateY(-30px)',
    pointerEvents: currentPage === 0 ? 'auto' : 'none' as const,
  };

  // Calculer les styles pour l'animation de la deuxième page
  const secondPageStyle = {
    opacity: currentPage === 1 ? 1 : 0,
    transform: currentPage === 1 ? 'translateY(0)' : 'translateY(30px)',
    pointerEvents: currentPage === 1 ? 'auto' : 'none' as const,
  };

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

  return (
    <>
      <Head>
        {/* Meta tag pour gérer la barre d'état sur iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      
      <div 
        ref={containerRef}
        className="relative overflow-hidden safe-area-top"
        style={{ 
          height: '100vh', 
          touchAction: 'none',
          // Ajouter un padding pour la barre d'état sur iOS
          paddingTop: 'env(safe-area-inset-top)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Fond avec dégradé qui reste fixe */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: "linear-gradient(to bottom, #333333, #ec8cff)",
          }}
        />

        {/* Première page - Informations du salon */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-between px-4 py-12 overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            ...firstPageStyle,
            height: viewportHeight ? `${viewportHeight}px` : '100vh',
            fontFamily: "var(--font-jetbrains-mono)",
          } as React.CSSProperties}
        >
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto text-center text-white">
            <h1 className="text-4xl font-medium mb-3">Le Balzac</h1>
            
            <p className="text-sm mb-1">
              Salon de coiffure Femme et
            </p>
            <p className="text-sm mb-16">
              Homme à Décines-Charpieux
            </p>
            
            <Link
              href="/rendez-vous"
              className="border border-white rounded-lg py-3 px-10 text-sm mb-16 hover:bg-white/10 transition-colors"
            >
              PRENDRE RDV
            </Link>
            
            <div className="flex items-center justify-center mb-1">
              {/* 4 étoiles pleines */}
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
              
              {/* 5ème étoile 80% remplie (4.8) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mx-0.5"
              >
                <defs>
                  <linearGradient id="homePartialFill" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="80%" stopColor="white" />
                    <stop offset="80%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path 
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                  fill="url(#homePartialFill)"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            </div>
            
            <p className="text-sm mb-2">(4.8)</p>
            
            <Link href="/avis" className="text-xs underline">
              Voir les 136 avis
            </Link>
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
          } as React.CSSProperties}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto gap-6">
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
                className="border border-white rounded-lg py-3 px-10 w-full max-w-xs text-center text-white hover:bg-white/10 transition-colors"
                prefetch={true}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}