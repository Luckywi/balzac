// src/app/components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm py-6 px-4 mt-auto">
      <div className="max-w-md mx-auto">
        {/* Coordonnées du salon */}
        <div className="text-center mb-4">
          <h3 className="text-white font-medium mb-2">Le Balzac</h3>
          <p className="text-white/80 text-sm">3 Rue Balzac, 69150 Décines-Charpieux</p>
          <p className="text-white/80 text-sm">Tél: 04 72 02 00 56</p>
        </div>
        
        {/* Liens de navigation rapide */}
        <div className="flex justify-center gap-4 flex-wrap mb-4">
          <Link href="/rendez-vous" className="text-white/80 text-xs hover:text-white transition-colors">
            Rendez-vous
          </Link>
          <Link href="/prestations" className="text-white/80 text-xs hover:text-white transition-colors">
            Prestations
          </Link>
          <Link href="/equipe" className="text-white/80 text-xs hover:text-white transition-colors">
            Équipe
          </Link>
          <Link href="/avis" className="text-white/80 text-xs hover:text-white transition-colors">
            Avis
          </Link>
          <Link href="/acces" className="text-white/80 text-xs hover:text-white transition-colors">
            Accès
          </Link>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-white/60 text-xs">
          <p>© {new Date().getFullYear()} Le Balzac - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}