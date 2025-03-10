import AccesClient from './AccesClient';

export const metadata = {
  title: 'Accès et Horaires | Le Balzac Salon de Coiffure',
  description: 'Comment accéder au salon de coiffure Le Balzac à Décines-Charpieux. Adresse: 3 Rue Balzac, 69150. Grand parking gratuit. Horaires d\'ouverture et contact.',
  keywords: ['adresse salon coiffure', 'horaires coiffeur', 'Le Balzac Décines', 'accès salon coiffure', 'parking gratuit'],
  openGraph: {
    title: 'Accès et Horaires | Le Balzac Salon de Coiffure',
    description: 'Comment accéder au salon de coiffure Le Balzac à Décines-Charpieux. Adresse: 3 Rue Balzac, 69150. Grand parking gratuit. Horaires d\'ouverture et contact.',
    images: [
      {
        url: '/images/salon/image5.webp',
        width: 1200,
        height: 630,
        alt: 'Le Balzac Salon de Coiffure - Accès et Horaires',
      },
    ],
  },
  // Ajouter les coordonnées pour les moteurs de recherche locaux
  alternates: {
    canonical: '/acces',
  },
};

export default function AccesPage() {
  return <AccesClient />;
}