import RdvClient from './RdvClient';

export const metadata = {
  title: 'Prise de rendez-vous en ligne | Le Balzac Salon de Coiffure',
  description: 'Réservez facilement votre rendez-vous en ligne au salon Le Balzac à Décines-Charpieux. Coupes, couleurs, mèches et soins pour femmes et hommes.',
  keywords: ['rendez-vous coiffeur', 'réservation salon de coiffure', 'RDV coiffure Décines', 'Le Balzac'],
  openGraph: {
    title: 'Prise de rendez-vous en ligne | Le Balzac Salon de Coiffure',
    description: 'Réservez facilement votre rendez-vous en ligne au salon Le Balzac à Décines-Charpieux. Coupes, couleurs, mèches et soins pour femmes et hommes.',
    images: [
      {
        url: '/images/salon/image2.webp',
        width: 1200,
        height: 630,
        alt: 'Réservation au salon Le Balzac',
      },
    ],
  },
};

export default function RendezVousPage() {
  return <RdvClient />;
}