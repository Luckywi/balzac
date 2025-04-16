"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import TabNavigation from '../components/TabNavigation';
import BookingClient from './components/BookingClient';

export default function RdvClient() {

  // Images du salon pour le carrousel
  const salonImages = [
    {
      src: "/images/salon/image1.webp",
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image2.webp",
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image3.webp",
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image4.webp",
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image5.webp",
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
  ];

  useEffect(() => {
    const iframe = document.getElementById('booking-frame') as HTMLIFrameElement;
    let resizeTimeout: NodeJS.Timeout;
    let currentStep = 1;

    function updateIframeHeight(height: number) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (height > 100) { // Vérification de sécurité
          iframe.style.height = `${height}px`;
        } else {
          iframe.style.height = '300px'; // Hauteur minimale par défaut
        }
      }, 50);
    }

    function handleMessage(event: MessageEvent) {
      if (event.origin !== 'https://booking-frame2.vercel.app') return;

      if (event.data?.type === 'pageChange') {
        currentStep = event.data.step;
        // On force une réinitialisation de la hauteur
        iframe.style.height = '300px';
        // On demande une nouvelle mesure après un court délai
        setTimeout(() => {
          requestHeight();
        }, 100);
      }
      
      if (event.data?.type === 'resize') {
        const newHeight = event.data.height || 300;
        updateIframeHeight(newHeight);
      }
    }

    function requestHeight() {
      iframe?.contentWindow?.postMessage({ 
        type: 'requestHeight',
        currentStep: currentStep
      }, 'https://booking-frame2.vercel.app');
    }


    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Permettre le défilement sur cette page
  useEffect(() => {
    // Appliquer directement les styles sans modifier cssText
    document.documentElement.style.position = 'relative';
    document.documentElement.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    document.body.style.position = 'relative';
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    
    return () => {
      // Rétablir les styles par défaut au démontage
      document.documentElement.style.position = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
      
      document.body.style.position = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #444444, #ec8cff)",
        fontFamily: "var(--font-jetbrains-mono)",
        overflow: "auto",
        position: "relative"
      }}
    >
      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center">
        {/* Logo Home centré en haut */}
        <div className="w-full flex justify-center mb-6">
          <Link
            href="/menu"
            className="py-2 px-4 rounded-lg border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
            aria-label="Retour à l'accueil"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24">
              <path 
                d="M 50 15 L 15 45 L 25 45 L 25 85 L 75 85 L 75 45 L 85 45 Z" 
                stroke="white" 
                strokeWidth="6" 
                fill="none" 
              />
              <rect 
                x="42" y="60" width="16" height="25" 
                stroke="white" 
                strokeWidth="6" 
                fill="none" 
              />
            </svg>
          </Link>
        </div>

        {/* Composant TabNavigation intégré */}
        <TabNavigation salonImages={salonImages} />
        
        {/* Wrapper avec un fond solide pour l'iframe */}
        <div className="w-full mb-8 rounded-lg overflow-hidden bg-black/20 shadow-lg">
          <h2 className="text-lg text-white px-4 py-3 border-b border-white/10">Réservation</h2>
          
          {/* Conteneur pour l'iframe avec loading state */}
          <div className="relative">

              <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4">
      
              </div>
        
            
            <BookingClient />
          </div>
        </div>
      </div>
    </main>
  );
}