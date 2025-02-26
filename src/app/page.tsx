"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Gestion du défilement
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const position = window.scrollY;
      
      // Mettre à jour la position de défilement
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effet pour défiler vers la deuxième page lorsqu'on clique sur la flèche
  const scrollToSecondPage = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  // Calculer le pourcentage de défilement pour les animations
  const scrollPercentage = Math.min(1, scrollPosition / window.innerHeight);

  return (
    <div 
      className="relative"
      ref={containerRef}
      style={{
        height: "200vh", // Deux fois la hauteur de l'écran pour permettre le défilement
      }}
    >
      {/* Fond avec dégradé qui reste fixe */}
      <div
        className="fixed inset-0 z-0 transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, #000000, #8A9A80)`,
        }}
      />

      {/* Première page - Informations du salon */}
      <div
        className="fixed inset-0 z-10 flex flex-col items-center justify-between px-4 py-12 overflow-fix"
        style={{
          opacity: 1 - scrollPercentage * 1.2, // Disparaît progressivement
          transform: `translateY(${scrollPercentage * -30}px)`, // Léger effet de parallaxe
          pointerEvents: scrollPercentage > 0.8 ? "none" : "auto", // Désactiver les interactions quand presque invisible
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
        className="absolute top-[100vh] h-screen w-full flex flex-col items-center justify-center px-4 overflow-fix"
        style={{
          opacity: Math.max(0, scrollPercentage * 1.5 - 0.3), // Apparaît progressivement
          transform: `translateY(${(1 - scrollPercentage) * 30}px)`, // Effet de parallaxe inverse
          pointerEvents: scrollPercentage < 0.2 ? "none" : "auto", // Activer les interactions quand visible
          fontFamily: "var(--font-jetbrains-mono)",
          zIndex: 20,
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