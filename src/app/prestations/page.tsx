import { Metadata } from 'next';
import PrestationsClient from './PrestationsClient';
import { prestations } from './data';

// Génération des keywords à partir des données de prestations
const generateKeywords = () => {
  const baseKeywords = ["salon de coiffure", "coiffeur Décines", "coupe femme", "coupe homme", "coloration", "mèches"];
  const serviceKeywords = prestations.flatMap(category => 
    category.prestations.map(service => 
      `${service.titre.toLowerCase()} Décines`
    )
  );
  
  // Ajouter des variations de prix et types de cheveux
  const additionalKeywords = [
    "prix coiffeur Décines", 
    "tarif coloration Décines",
    "cheveux courts coupe",
    "cheveux longs mèches",
    "balayage cheveux",
    "coiffeur pas cher Décines",
    "salon coiffure qualité Décines-Charpieux",
    "coiffeur près de Lyon Est",
    "expert coloration Décines"
  ];
  
  return [...baseKeywords, ...serviceKeywords, ...additionalKeywords];
};

export const metadata: Metadata = {
  title: "Nos Prestations et Tarifs de Coiffure | Coupes, Couleurs, Mèches | Le Balzac",
  description: "Découvrez nos prestations de coiffure pour femmes, hommes et enfants à Décines-Charpieux. Coupes à partir de 19€, colorations, balayages, mèches et soins personnalisés réalisés par nos experts. Réservez en ligne!",
  keywords: generateKeywords(),
  openGraph: {
    title: 'Prestations et Tarifs de Coiffure | Le Balzac Salon de Coiffure Décines',
    description: 'Consultez notre carte complète de prestations et tarifs de coiffure pour femmes et hommes: coupes, colorations, mèches et soins capillaires par nos experts coiffeurs à Décines.',
    images: [
      {
        url: '/images/salon/image2.webp',
        width: 1200,
        height: 630,
        alt: 'Prestations de coiffure à Décines au salon Le Balzac - 3 Rue Balzac, 69150 Décines-Charpieux',
        type: 'image/webp',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Le Balzac Salon de Coiffure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prestations et Tarifs | Le Balzac Salon de Coiffure à Décines',
    description: 'Découvrez nos prestations et tarifs de coiffure: coupes, colorations, mèches pour femmes, hommes et enfants à Décines-Charpieux.',
    images: ['/images/salon/image2.webp'],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/prestations",
    languages: {
      'fr-FR': "https://www.lebalzac-coiffure-decines.fr/prestations",
    },
  },
  category: 'beauty',
};

// Cette fonction génère les données structurées pour cette page spécifique
function generateJsonLd() {
  // Structure pour les offres
  const offers = prestations.flatMap(category => 
    category.prestations.map(service => ({
      "@type": "Offer",
      "name": service.titre,
      "description": `${service.titre} au salon Le Balzac à Décines-Charpieux`,
      "price": typeof service.prix === 'string' ? service.prix.replace(' €', '') : service.prix.montant.replace(' €', ''),
      "priceCurrency": "EUR",
      "availableAtOrFrom": {
        "@type": "HairSalon",
        "name": "Le Balzac",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3 Rue Balzac",
          "addressLocality": "Décines-Charpieu",
          "postalCode": "69150",
          "addressCountry": "FR"
        }
      },
      "eligibleRegion": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "45.7672",
          "longitude": "4.9684"
        },
        "geoRadius": "10000"
      }
    }))
  );

  // Données structurées pour la page de prestations
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": offers.map((offer, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": offer
    })),
    "numberOfItems": offers.length,
    "itemListOrder": "https://schema.org/ItemListUnordered"
  };
}

export default function PrestationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd())
        }}
      />
      <PrestationsClient />
    </>
  );
}