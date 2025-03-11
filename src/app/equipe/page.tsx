import { Metadata } from 'next';
import EquipeClient from './EquipeClient';

export const metadata: Metadata = {
  title: "Notre Équipe de Coiffeurs Experts | Béa et Cyrille",
  description: "Découvrez notre équipe de coiffeurs professionnels à Décines-Charpieux. Béa et Cyrille, experts en coupe, coloration et soins capillaires vous accueillent dans un cadre chaleureux.",
  openGraph: {
    title: 'Notre Équipe de Coiffeurs Experts | Le Balzac',
    description: 'Rencontrez Béa et Cyrille, nos coiffeurs experts passionnés qui vous accueillent au salon Le Balzac à Décines-Charpieux.',
    images: [
      {
        url: '/images/salon/image1.webp',
        width: 1200,
        height: 630,
        alt: "L'Équipe du salon de coiffure Masculin Féminin Le Balzac à Décines",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/equipe",
  }
};

export default function EquipePage() {
  return <EquipeClient />;
}