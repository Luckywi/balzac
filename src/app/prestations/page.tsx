import PrestationsClient from './PrestationsClient';

export const metadata = {
  title: 'Prestations - Coupes, Couleurs, Mèches | Le Balzac',
  description: 'Découvrez toutes nos prestations de coiffure pour femmes et hommes à Décines-Charpieux. Coupes, couleurs, mèches, balayages et soins à des prix compétitifs.',
};

export default function PrestationsPage() {
  return <PrestationsClient />;
}