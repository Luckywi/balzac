import AvisClient from './AvisClient';
import { avis } from './data';

// Calcul de la note moyenne pour les métadonnées
const calculateAverageRating = () => {
  const sum = avis.reduce((acc, curr) => acc + curr.note, 0);
  return (sum / avis.length).toFixed(1);
};

export const metadata = {
  title: 'Avis Clients - Plus de 130 témoignages | Le Balzac',
  description: 'Découvrez les avis et témoignages de nos clients sur notre salon de coiffure Le Balzac à Décines-Charpieux. Note moyenne de 4.8/5 sur plus de 130 avis.',
  keywords: ['avis salon coiffure', 'témoignages clients', 'Le Balzac avis', 'salon coiffure Décines commentaires'],
  openGraph: {
    title: 'Avis Clients - Plus de 130 témoignages | Le Balzac',
    description: `Découvrez les avis et témoignages de nos clients sur notre salon de coiffure Le Balzac à Décines-Charpieux. Note moyenne de ${calculateAverageRating()}/5 sur plus de ${avis.length} avis.`,
    images: [
      {
        url: '/images/salon/image4.webp',
        width: 1200,
        height: 630,
        alt: 'Avis clients du salon Le Balzac',
      },
    ],
  },
};

export default function AvisPage() {
  return <AvisClient />;
}