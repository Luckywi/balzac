// src/app/page.tsx
import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Le Balzac | Salon de Coiffure à Décines-Charpieux",
  description: "Bienvenue au salon Le Balzac, votre salon de coiffure expert au 3 Rue Balzac, 69150 Décines-Charpieux. Prestations femmes et hommes, réservation en ligne, grand parking gratuit.",
  openGraph: {
    title: 'Le Balzac | Salon de Coiffure à Décines-Charpieux',
    description: "Bienvenue au salon Le Balzac, votre salon de coiffure expert au 3 Rue Balzac, 69150 Décines-Charpieux. Prestations femmes et hommes, réservation en ligne, grand parking gratuit.",
    images: [
      {
        url: '/images/salon/image1.webp',
        width: 1200,
        height: 630,
        alt: "Salon de coiffure Le Balzac - 3 Rue Balzac, 69150 Décines-Charpieux",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/",
  }
};

export default function HomePage() {
  return <HomeClient />;
}