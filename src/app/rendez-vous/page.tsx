// src/app/rendez-vous/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ImageCarousel from '../components/ImageCarousel';

export default function RendezVousPage() {
  // Images du salon pour le carrousel
  const salonImages = [
    {
      src: "/images/salon/image1.webp", // Chemin relatif au dossier public
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image2.webp", // Chemin relatif au dossier public
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image3.webp", // Chemin relatif au dossier public
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image4.webp", // Chemin relatif au dossier public
      alt: "Intérieur élégant du salon Le Balzac avec décoration moderne"
    },
    {
      src: "/images/salon/image5.webp", // Chemin relatif au dossier public
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

    // Gérer le chargement initial
    iframe?.addEventListener('load', () => {
      // Appliquer un style au contenu de l'iframe
      iframe.contentWindow?.postMessage({
        type: 'applyStyle',
        style: {
          bodyBackground: 'transparent' // Fond transparent pour éviter la superposition des dégradés
        }
      }, 'https://booking-frame2.vercel.app');
      
      // Demander la hauteur
      requestHeight();
    });

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Permettre le défilement sur cette page
  useEffect(() => {
    // Sauvegarder les styles originaux
    const originalHtmlStyle = document.documentElement.style.cssText;
    const originalBodyStyle = document.body.style.cssText;
    
    // Activer le défilement pour cette page
    document.documentElement.style.cssText = 'position: relative; height: auto; overflow: auto;';
    document.body.style.cssText = 'position: relative; height: auto; overflow: auto;';
    
    // Restaurer les styles originaux lors du nettoyage
    return () => {
      document.documentElement.style.cssText = originalHtmlStyle;
      document.body.style.cssText = originalBodyStyle;
    };
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #000000, #ec8cff)",
        fontFamily: "var(--font-jetbrains-mono)",
        overflow: "auto",
        position: "relative"
      }}
    >
      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-2xl font-medium mb-6 text-white text-center">PRENDRE RENDEZ-VOUS</h1>
        
        {/* Carrousel d'images du salon */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-white opacity-80">Notre salon</h2>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-xl shadow-lg">
            <ImageCarousel images={salonImages} autoplaySpeed={6000} />
          </div>
        </div>
        
        {/* Wrapper avec un fond solide pour l'iframe */}
        <div className="w-full mb-8 rounded-xl overflow-hidden bg-black/30 backdrop-blur-sm shadow-lg">
          <h2 className="text-lg text-white px-4 py-3 opacity-80 border-b border-white/10">Réservation</h2>
          <iframe 
            id="booking-frame"
            src="https://booking-frame2.vercel.app/?id=FQPbT92r7KfV5AYwzTHQonVoYRf2"
            style={{
              width: '100%',
              height: '300px',
              border: 'none',
              transition: 'height 0.2s ease-out',
              overflow: 'auto'
            }}
          ></iframe>
        </div>
        
        <Link
          href="/"
          className="border border-white rounded-full py-3 px-10 text-white hover:bg-white/10 transition-colors"
        >
          RETOUR
        </Link>
      </div>
    </main>
  );
}