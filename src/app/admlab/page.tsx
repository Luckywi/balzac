import { Metadata } from 'next';
import AdmClient from './AdmClient';

export const metadata: Metadata = {
  title: "ADMLAB | Agence Web Partenaire du Salon Le Balzac",
  description: "ADMLAB, l'agence web spécialisée qui a développé le site internet, le système de réservation et l'identité visuelle du salon de coiffure Le Balzac à Décines-Charpieux. Sites optimisés SEO, applications mobiles et solutions digitales sur mesure.",
  keywords: [
    "agence web Lyon", 
    "création site internet", 
    "développement web", 
    "site vitrine optimisé SEO", 
    "ADMLAB", 
    "agence digitale", 
    "applications mobiles", 
    "identité visuelle", 
    "conception web", 
    "référencement naturel", 
    "développement sur mesure", 
    "solutions digitales PME",
    "développement applications",
    "motion design",
    "animation 3D",
    "micro SaaS",
    "stratégie digitale"
  ].join(", "),
  openGraph: {
    title: 'ADMLAB | Agence Web Partenaire du Salon Le Balzac',
    description: 'ADMLAB, l\'agence web spécialisée dans la création de sites internet optimisés SEO et solutions digitales pour entrepreneurs et PME. Découvrez comment ADMLAB peut transformer votre présence en ligne.',
    images: [
      {
        url: '/images/salon/image3.webp',
        width: 1200,
        height: 630,
        alt: 'ADMLAB - Agence web partenaire du salon Le Balzac',
      },
    ],
  },
  alternates: {
    canonical: "https://www.lebalzac-coiffure-decines.fr/admlab",
  }
};

// Données structurées JSON-LD pour le SEO
const jsonLdWebDesigner = {
  "@context": "https://schema.org",
  "@type": "WebDesign",
  "name": "ADMLAB",
  "description": "Agence web spécialisée dans la création de sites internet optimisés SEO, applications mobiles et solutions digitales pour entrepreneurs et PME",
  "url": "https://admlab.fr",
  "logo": "https://www.lebalzac-coiffure-decines.fr/images/adm-logo.png",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.lebalzac-coiffure-decines.fr/admlab"
  },
  "offers": {
    "@type": "Offer",
    "name": "Site vitrine optimisé SEO",
    "description": "Création de site internet professionnel avec référencement optimisé pour les PME",
    "price": "30.00",
    "priceCurrency": "EUR",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "30.00",
      "priceCurrency": "EUR",
      "unitText": "Mensuel"
    }
  },
  "serviceOutput": {
    "@type": "WebSite",
    "url": "https://www.lebalzac-coiffure-decines.fr",
    "name": "Le Balzac Salon de Coiffure"
  }
};

// Données structurées JSON-LD pour les services
const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Organization",
    "name": "ADMLAB",
    "url": "https://admlab.fr"
  },
  "areaServed": {
    "@type": "State",
    "name": "Auvergne-Rhône-Alpes"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Digitaux",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sites Web Professionnels",
          "description": "Création de sites vitrines optimisés SEO et adaptés aux mobiles"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Applications Mobiles",
          "description": "Développement d'applications iOS et Android sur mesure"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Solutions Métiers",
          "description": "Micro-SaaS personnalisés pour optimiser vos processus internes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Image de Marque",
          "description": "Conception d'identités visuelles complètes et cohérentes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Motion Design & 3D",
          "description": "Animations et visuels 3D pour des communications impactantes"
        }
      }
    ]
  }
};

export default function AdmlabPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebDesigner)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdService)
        }}
      />
      <AdmClient />
    </>
  );
}