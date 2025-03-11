import { Metadata } from 'next';
import PrestationsClient from './PrestationsClient';

export const metadata: Metadata = {
  title: "Nos Prestations de Coiffure | Coupes, Couleurs, Mèches",
  description: "Découvrez toutes nos prestations de coiffure pour femmes et hommes à Décines-Charpieux. Coupes, colorations, balayages, mèches et soins à des prix compétitifs.",
  openGraph: {
    title: 'Prestations de Coiffure | Coupes, Couleurs, Mèches | Le Balzac',
    description: 'Consultez notre carte complète de prestations de coiffure pour femmes et hommes: coupes, colorations, mèches et soins capillaires par nos experts.',
    images: [
      {
        url: '/images/salon/image2.webp',
        width: 1200,
        height: 630,
        alt: 'Prestations de coiffure à Décines au salon Le Balzac - 3 Rue Balzac, 69150 Décines-Charpieux',
      },
    ],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/prestations",
  }
};

export default function PrestationsPage() {
  return <PrestationsClient />;
}