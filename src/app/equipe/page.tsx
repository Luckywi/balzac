"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
{/* Suppression de l'import du composant TeamMember */}

export default function EquipePage() {
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

  // Données des membres de l'équipe
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
  
  // Comme nous allons utiliser notre propre affichage rectangulaire au lieu du composant TeamMember,
  // nous n'avons plus besoin d'importer le composant TeamMember
  // Cela sera géré directement dans cette page

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
      <motion.div 
        className="w-full py-12 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full max-w-md mx-auto mb-8">
          <div className="w-full flex gap-4 justify-center mb-6">
            <Link
              href="/menu"
              className="py-2 px-4 rounded-xl border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
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
            <Link
              href="/rendez-vous"
              className="py-2 px-4 rounded-xl border border-white/150 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              PRENDRE RDV
            </Link>
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto">
      
          
          <div className="flex flex-col gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
              >
                <div className="w-full h-64 relative">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-medium text-white mb-3">{member.name}</h3>
                  <p className="text-white/80 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}