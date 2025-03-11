import { Metadata } from 'next';
import RdvClient from './RdvClient';

export const metadata: Metadata = {
  title: "Prendre Rendez-vous en Ligne | Réservation Coiffeur",
  description: "Réservez facilement votre rendez-vous en ligne au salon Le Balzac à Décines-Charpieux. Horaires flexibles, confirmation immédiate.",
  openGraph: {
    title: 'Réserver un Rendez-vous | Le Balzac Salon de Coiffure',
    description: 'Prenez rendez-vous en ligne en quelques clics pour votre prochaine coupe, coloration ou soin capillaire au salon Le Balzac à Décines-Charpieux.',
    images: [
      {
        url: '/images/salon/image2.webp',
        width: 1200,
        height: 630,
        alt: 'Réservation en ligne au salon de coiffure Le Balzac à Décines',
      },
    ],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/rendez-vous",
  }
};

export default function RendezVousPage() {
  return <RdvClient />;
}