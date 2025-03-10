import EquipeClient from './EquipeClient';

export const metadata = {
  title: 'Notre Équipe de Coiffeurs | Le Balzac',
  description: 'Découvrez notre équipe de coiffeurs professionnels à Décines-Charpieux. Béa et Cyrille, experts en coupe, coloration et soins capillaires.',
  keywords: ['équipe coiffeurs', 'salon coiffure Décines', 'stylistes Le Balzac', 'coiffeurs professionnels'],
  openGraph: {
    title: 'Notre Équipe de Coiffeurs | Le Balzac',
    description: 'Découvrez notre équipe de coiffeurs professionnels à Décines-Charpieux. Béa et Cyrille, experts en coupe, coloration et soins capillaires.',
    images: [
      {
        url: '/images/salon/image1.webp',
        width: 1200,
        height: 630,
        alt: 'Équipe du salon Le Balzac',
      },
    ],
  },
};

export default function EquipePage() {
  return <EquipeClient />;
}