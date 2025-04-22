"use client";

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

        {/* Zone de réservation */}
        <div className="w-full mb-8 rounded-lg overflow-hidden bg-black/20 shadow-lg">
          <h2 className="text-lg text-white px-4 py-3 border-b border-white/10">Réservation</h2>

          <div className="relative">
            <BookingClient />
          </div>
        </div>
      </div>
    </main>
  );
}
