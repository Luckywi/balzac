import { Metadata } from 'next';
import AccesClient from './AccesClient';

export const metadata: Metadata = {
  title: "Accès et Horaires | Plan d'accès et Parking Gratuit",
  description: "Comment accéder au salon de coiffure Le Balzac à Décines-Charpieux. Adresse: 3 Rue Balzac, 69150. Grand parking gratuit. Horaires d'ouverture et contact.",
  openGraph: {
    title: 'Accès et Horaires | Le Balzac Salon de Coiffure',
    description: "Trouvez facilement notre salon de coiffure à Décines-Charpieux. Grand parking gratuit, horaires d'ouverture adaptés et accès facilité.",
    images: [
      {
        url: '/images/salon/image5.webp',
        width: 1200,
        height: 630,
        alt: 'Accès et horaires du salon de coiffure Le Balzac à Décines-Charpieux - 3 Rue Balzac, 69150 Décines-Charpieux',
      }
    ]
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/acces",
  }
};

export default function AccesPage() {
  return <AccesClient />;
}