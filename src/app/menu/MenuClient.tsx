"use client";

import Link from "next/link";
import Image from "next/image";

export default function MenuClient() {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(to bottom, #333333, #ec8cff)",
          fontFamily: "var(--font-jetbrains-mono)",
        }}
      >

<div className="mb-4 w-full flex flex-col items-center">
  <Link href="/">
              <Image 
                src="/images/salon/le-balzac-logo.png" 
                alt="Logo Le Balzac Salon de Coiffure Décines" 
                width={260}
                height={128}
                priority
                className="mb-2"
              />
              </Link>
              <br></br>
              <h1 className="sr-only">Salon de coiffure Masculin Féminin <br></br> Le Balzac à Décines</h1>
              <br></br>
            </div>
        <nav aria-label="Navigation principale" className="w-full max-w-md mx-auto">
  <ul className="flex flex-col items-center justify-center gap-6">
    {[
      { name: "PRENDRE RDV", href: "/rendez-vous" },
      { name: "PRESTATIONS", href: "/prestations" },
      { name: "L'ÉQUIPE", href: "/equipe" },
      { name: "LES AVIS", href: "/avis" },
      { name: "ACCÈS", href: "/acces" },
    ].map((item) => (
      <li key={item.name} className="w-full max-w-xs">
        <Link
          href={item.href}
          className="border border-white rounded-lg py-3 px-10 w-full text-center text-white hover:bg-white/10 transition-colors block"
          prefetch={true}
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</nav>
        
        {/* Contenu caché sémantique pour le SEO */}
        <div className="sr-only">
          <h1>Menu principal du salon de coiffure Le Balzac à Décines-Charpieux</h1>
          <p>
            Bienvenue sur le menu principal du salon Le Balzac. Accédez à nos différentes sections pour prendre rendez-vous, 
            consulter nos prestations et tari, découvrir notre équipe de coiffeurs professionnels,
            lire les avis de nos clients ou trouver nos coordonnées et plan d&aposaccès.
          </p>
        </div>
      </main>
    );
  }