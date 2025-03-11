import { Metadata } from 'next';
import AvisClient from './AvisClient';

export const metadata: Metadata = {
  title: "Avis Clients - Plus de 130 témoignages | Note 4.8/5",
  description: "Découvrez plus de 130 avis et témoignages de nos clients satisfaits. Notre salon de coiffure Le Balzac à Décines-Charpieux est noté 4.8/5 pour la qualité de ses prestations.",
  openGraph: {
    title: 'Avis Clients - Plus de 130 témoignages | Le Balzac',
    description: "Découvrez les avis authentiques de nos clients. Notre salon de coiffure à Décines-Charpieux est fier d'avoir une note moyenne de 4.8/5 sur plus de 130 témoignages.",
    images: [
      {
        url: '/images/salon/image4.webp',
        width: 1200,
        height: 630,
        alt: 'Avis clients du salon de coiffure Le Balzac',
      },
    ],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/avis",
  }
};

export default function AvisPage() {
  return <AvisClient />;
}