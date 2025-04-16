import { Metadata } from 'next';
import RdvClient from './RdvClient';


// Définition des mots-clés et phrases pertinentes
const keywords = [
  "rendez-vous coiffeur Décines",
  "réservation salon de coiffure",
  "prendre RDV coiffeur Le Balzac",
  "réservation en ligne coiffure",
  "salon coiffure disponibilité Décines",
  "coiffeur sans attente Décines",
  "RDV coupe cheveux Lyon Est",
  "réservation coloration Décines",
  "planifier RDV coiffeur",
  "créneau disponible coiffeur Décines"
];

export const metadata: Metadata = {
  title: "Réservation En Ligne | Prendre RDV au Salon Le Balzac à Décines",
  description: "Réservez votre rendez-vous en ligne au salon Le Balzac à Décines-Charpieux en quelques clics. Disponibilités en temps réel, confirmation immédiate et rappel automatique. Tous services: coupes, colorations, mèches.",
  keywords: keywords.join(", "),
  openGraph: {
    title: 'Réserver un Rendez-vous | Le Balzac Salon de Coiffure Décines',
    description: 'Prenez rendez-vous en ligne en quelques clics pour votre prochaine coupe, coloration ou soin capillaire au salon Le Balzac à Décines-Charpieux. Créneaux disponibles, confirmation immédiate.',
    url: 'https://www.lebalzac-coiffure-decines.fr/rendez-vous',
    images: [
      {
        url: 'https://www.lebalzac-coiffure-decines.fr/images/salon/image2.webp',
        width: 1200,
        height: 630,
        alt: 'Réservation en ligne au salon de coiffure Le Balzac à Décines',
        type: 'image/webp',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Le Balzac Salon de Coiffure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réserver un RDV | Salon de Coiffure Le Balzac Décines',
    description: 'Réservez facilement votre rendez-vous de coiffure en ligne. Disponibilités en temps réel, confirmation immédiate.',
    images: ['https://www.lebalzac-coiffure-decines.fr/images/salon/image2.webp'],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/rendez-vous",
    languages: {
      'fr-FR': "https://www.lebalzac-coiffure-decines.fr/rendez-vous",
    },
  },
  category: 'beauty',
};

// Données structurées spécifiques pour cette page
const jsonLdAction = {
  "@context": "https://schema.org",
  "@type": "ReserveAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://www.lebalzac-coiffure-decines.fr/rendez-vous",
    "inLanguage": "fr-FR",
    "actionPlatform": [
      "http://schema.org/DesktopWebPlatform",
      "http://schema.org/MobileWebPlatform"
    ]
  },
  "result": {
    "@type": "Reservation",
    "name": "Réservation en ligne au salon Le Balzac",
    "provider": {
      "@type": "HairSalon",
      "name": "Le Balzac",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3 Rue Balzac",
        "addressLocality": "Décines-Charpieu",
        "postalCode": "69150",
        "addressCountry": "FR"
      }
    }
  },
  "object": {
    "@type": "Service",
    "name": "Services de coiffure",
    "description": "Coupes, colorations, mèches et soins capillaires"
  }
};

export default function RendezVousPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdAction)
        }}
      />
      <RdvClient />
    </>
  );
}