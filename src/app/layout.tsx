// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import Footer from './components/Footer';
import "./globals.css";

// Optimisation de la police avec un chargement prioritaire et uniquement du sous-ensemble nécessaire
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

// URL de base pour les chemins absolus
const BASE_URL = 'https://www.lebalzac-coiffure-decines.fr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Le Balzac | Salon de coiffure à Décines-Charpieux",
    template: "%s | Le Balzac Salon de Coiffure"
  },
  description: "Salon de coiffure expert pour femmes et hommes au 3 Rue Balzac, 69150 Décines-Charpieux. Spécialistes en coupes, colorations, mèches et soins personnalisés. Grand parking gratuit.",
  applicationName: "Le Balzac Salon de Coiffure",
  authors: [{ name: "Le Balzac" }],
  generator: "Next.js",
  keywords: ["salon de coiffure", "coiffeur Décines", "Salon de coiffure le Balzac", "Coiffeur le balzac Décines", "coupe femme", "coupe homme", "coloration", "balayage", "mèches", "Décines-Charpieux", "Le Balzac", "3 Rue Balzac", "coiffure", "beauté", "salon"],
  referrer: "origin-when-cross-origin",
  creator: "Le Balzac",
  publisher: "Le Balzac",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  category: 'beauty',
  
  // Open Graph
  openGraph: {
    title: "Le Balzac | Salon de Coiffure à Décines-Charpieux",
    description: "Bienvenue au salon Le Balzac, votre salon de coiffure expert au 3 Rue Balzac, 69150 Décines-Charpieux. Prestations femmes et hommes, réservation en ligne, grand parking gratuit.",
    url: BASE_URL,
    siteName: 'Le Balzac Salon de Coiffure',
    images: [
      {
        url: `${BASE_URL}/images/salon/image1.webp`,
        width: 1200,
        height: 630,
        alt: 'Salon de coiffure Le Balzac à Décines-Charpieux',
        type: 'image/webp',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Le Balzac | Salon de coiffure Femme et Hommes à Décines-Charpieux',
    description: 'Salon de coiffure à Décines-Charpieux. Prestations femme et homme: coupes, couleurs, mèches et soins par des experts.',
    images: [`${BASE_URL}/images/salon/image1.webp`],
    creator: '@lebalzac',
  },
  
  // Autres métadonnées
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      'fr-FR': "/",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Le Balzac"
  },
  verification: {
    google: 'votre-code-verification-google', // À remplacer par votre code réel
  },
  other: {
    'geo.position': '45.7672;4.9684',
    'geo.placename': 'Décines-Charpieu',
    'geo.region': 'FR-ARA',
    'ICBM': '45.7672, 4.9684',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false, // équivalent à user-scalable=no
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Données structurées JSON-LD pour Schema.org - Website
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": BASE_URL,
    "name": "Le Balzac Salon de Coiffure",
    "description": "Salon de coiffure expert pour femmes et hommes à Décines-Charpieux",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "fr-FR"
  };


  // Données structurées JSON-LD pour Schema.org - Local Business
  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${BASE_URL}/#organization`,
    "name": "Le Balzac",
    "image": `${BASE_URL}/images/salon/image1.webp`,
    "logo": `${BASE_URL}/android-chrome-192x192.png`,
    "url": BASE_URL,
    "telephone": "04 72 02 00 56",
    "email": "contact@lebalzac-coiffure-decines.fr",
    "description": "Salon de coiffure expert pour femmes et hommes à Décines-Charpieux. Nos coiffeurs expérimentés vous proposent coupes, colorations et soins de qualité dans un cadre chaleureux.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 Rue Balzac",
      "addressLocality": "Décines-Charpieu",
      "postalCode": "69150",
      "addressCountry": "FR",
      "addressRegion": "Auvergne-Rhône-Alpes"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.7672",
      "longitude": "4.9684"
    },
    "hasMap": "https://goo.gl/maps/8z9XY1zD3XYqRc7Q6",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
        "opens": "08:30",
        "closes": "11:45"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
        "opens": "14:00",
        "closes": "18:15"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday"],
        "opens": "08:30",
        "closes": "18:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:30",
        "closes": "16:00"
      }
    ],
    "priceRange": "19€-101€",
    "paymentAccepted": "Cash, Credit Card",
    "currenciesAccepted": "EUR",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "136",
      "bestRating": "5",
      "worstRating": "1"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Coupe Femme + Brushing",
        "description": "Coupe et brushing pour femme, réalisée par nos experts. Inclut shampooing et soin.",
        "price": "36.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Coloration + Coupe + Brushing",
        "description": "Coloration professionnelle, coupe et brushing pour femme, avec les produits de qualité.",
        "price": "61.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Coupe Homme",
        "description": "Coupe et coiffage pour homme, adaptée à tous les styles.",
        "price": "19.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/rendez-vous`,
        "inLanguage": "fr-FR",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Réservation en ligne"
      }
    },
    "keywords": "salon coiffure, coiffeur Décines, coupe femme, coupe homme, coloration, balayage, mèches",
    "slogan": "Votre salon de coiffure expert à Décines-Charpieux",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.7672",
        "longitude": "4.9684"
      },
      "geoRadius": "10000"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking gratuit",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Accessible PMR",
        "value": true
      }
    ]
  };

  // JSON-LD pour les professionnels (Team)
  const jsonLdPersons = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${BASE_URL}/#person-bea`,
      "name": "Béa",
      "jobTitle": "Styliste et Propriétaire",
      "description": "La patronne depuis 15 ans, une styliste chevronnée, toujours de bon conseil et à l'écoute.",
      "worksFor": {
        "@type": "HairSalon",
        "@id": `${BASE_URL}/#organization`
      },
      "image": `${BASE_URL}/images/salon/image1.webp`
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${BASE_URL}/#person-cyrille`,
      "name": "Cyrille",
      "jobTitle": "Coloriste Expert",
      "description": "Coloriste experte, passionnée par les techniques innovantes et les tendances.",
      "worksFor": {
        "@type": "HairSalon",
        "@id": `${BASE_URL}/#organization`
      },
      "image": `${BASE_URL}/images/salon/image3.webp`
    }
  ];

  // JSON-LD pour la FAQ
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quels sont les horaires d'ouverture du salon Le Balzac ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le salon est ouvert du mardi au jeudi de 8h30 à 11h45 et de 14h00 à 18h15. Le vendredi de 8h30 à 18h30 et le samedi de 8h30 à 16h00. Nous sommes fermés le lundi et le dimanche."
        }
      },
      {
        "@type": "Question",
        "name": "Comment puis-je prendre rendez-vous ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous pouvez prendre rendez-vous en ligne directement sur notre site à l'adresse lebalzac-coiffure-decines.fr/rendez-vous ou en appelant le 04 72 02 00 56."
        }
      },
      {
        "@type": "Question",
        "name": "Y a-t-il un parking à proximité ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous disposons d'un grand parking gratuit juste devant le salon pour faciliter votre venue. Pas besoin de chercher une place, vous pourrez vous garer facilement."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de services proposez-vous ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous proposons une gamme complète de services capillaires incluant coupes, colorations, mèches, balayage, soins et coiffures pour femmes et hommes. Nos tarifs varient de 19€ pour une coupe homme à 101€ pour des mèches avec coupe et brushing sur cheveux longs."
        }
      }
    ]
  };

  // JSON-LD pour les avis (avec dates passées corrigées)
  const jsonLdReviews = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Stéphanie"
          },
          "datePublished": "2024-02-16",
          "reviewBody": "Excellente expérience avec Béa pour ma couleur et mon brushing.",
          "itemReviewed": {
            "@type": "HairSalon",
            "@id": `${BASE_URL}/#organization`
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Zahoua"
          },
          "datePublished": "2024-02-14",
          "reviewBody": "Très bien",
          "itemReviewed": {
            "@type": "HairSalon",
            "@id": `${BASE_URL}/#organization`
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Anne-Lise"
          },
          "datePublished": "2024-02-08",
          "reviewBody": "Je recommande vivement ce salon pour la qualité des services.",
          "itemReviewed": {
            "@type": "HairSalon",
            "@id": `${BASE_URL}/#organization`
          }
        }
      }
    ]
  };

  // JSON-LD pour Article de blog (si vous avez une section blog)
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Prestations",
        "item": `${BASE_URL}/prestations`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Rendez-vous",
        "item": `${BASE_URL}/rendez-vous`
      }
    ]
  };
  const jsonLdNavigation = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": ["Accueil", "Prestations", "Équipe", "Avis", "Rendez-vous", "Accès"],
    "url": [
      `${BASE_URL}/`,
      `${BASE_URL}/prestations`,
      `${BASE_URL}/equipe`,
      `${BASE_URL}/avis`,
      `${BASE_URL}/rendez-vous`,
      `${BASE_URL}/acces`
    ]
  };
  

  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no" 
        />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Préchargement des ressources critiques */}
        <link rel="preload" as="image" href={`${BASE_URL}/images/salon/image1.webp`} />
        
        {/* Préconnexion aux domaines externes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Balises hreflang pour le référencement international */}
        <link rel="alternate" hrefLang="fr-fr" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        
        {/* Balises d'optimisation mobile et PWA */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        
        {/* Balisage JSON-LD pour les données structurées */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebsite)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPersons)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFAQ)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdReviews)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBreadcrumb)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdNavigation)
          }}
/>
      </head>
      <body className={`${jetbrainsMono.variable}`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}