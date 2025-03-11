import { Metadata } from 'next';
import MenuClient from './MenuClient';

export const metadata: Metadata = {
  title: "Menu Principal | Navigation du Salon de Coiffure",
  description: "Menu principal du salon de coiffure Le Balzac à Décines-Charpieux. Accédez à nos prestations, réservations, équipe, avis et informations d'accès.",
  openGraph: {
    title: 'Menu Principal | Le Balzac Salon de Coiffure',
    description: 'Navigation principale du salon de coiffure Le Balzac à Décines-Charpieux.',
    images: [
      {
        url: '/images/salon/image5.webp',
        width: 1200,
        height: 630,
        alt: 'Menu Principal - Salon de coiffure Le Balzac à Décines-Charpieux',
      },
    ],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/menu",
  }
};

export default function MenuPage() {
  return <MenuClient />;
}