import MenuClient from './MenuClient';

export const metadata = {
  title: 'Menu Principal | Le Balzac Salon de Coiffure',
  description: 'Accédez aux différentes sections de notre salon de coiffure Le Balzac à Décines-Charpieux: prestations, rendez-vous, équipe, avis et accès.',
  keywords: ['menu salon', 'navigation salon de coiffure', 'Le Balzac Décines'],
  openGraph: {
    title: 'Menu Principal | Le Balzac Salon de Coiffure',
    description: 'Accédez aux différentes sections de notre salon de coiffure Le Balzac à Décines-Charpieux: prestations, rendez-vous, équipe, avis et accès.',
    images: [
      {
        url: '/images/salon/image5.webp',
        width: 1200,
        height: 630,
        alt: 'Le Balzac Salon de Coiffure',
      },
    ],
  },
};

export default function MenuPage() {
  return <MenuClient />;
}