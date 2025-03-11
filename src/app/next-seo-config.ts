// src/app/next-seo.config.ts
import { DefaultSeoProps } from 'next-seo';

const SEO_CONFIG: DefaultSeoProps = {
  titleTemplate: '%s | Le Balzac Salon de Coiffure Décines',
  defaultTitle: 'Le Balzac | Salon de Coiffure à Décines-Charpieux',
  description: 'Salon de coiffure expert pour femmes et hommes à Décines-Charpieux. Spécialistes en coupes, colorations, mèches et soins personnalisés. Grand parking gratuit.',
  canonical: 'https://www.lebalzac-coiffure-decines.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.lebalzac-coiffure-decines.fr',
    siteName: 'Le Balzac Salon de Coiffure',
    title: 'Le Balzac | Salon de Coiffure Expert à Décines-Charpieux',
    description: 'Salon de coiffure expert pour femmes et hommes à Décines-Charpieux. Nos coiffeurs expérimentés vous proposent coupes, colorations et soins de qualité dans un cadre chaleureux.',
    images: [
      {
        url: 'https://www.lebalzac-coiffure-decines.fr/images/salon/image1.webp',
        width: 1200,
        height: 630,
        alt: 'Salon de coiffure Le Balzac à Décines-Charpieux',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    handle: '@lebalzac',
    site: '@lebalzac',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover'
    },
    {
      name: 'theme-color',
      content: '#000000'
    },
    {
      name: 'keywords',
      content: 'salon coiffure, coiffeur Décines, coupe femme, coupe homme, coloration, balayage, mèches, Le Balzac, salon de coiffure Décines-Charpieux'
    },
    {
      name: 'geo.region',
      content: 'FR-ARA'
    },
    {
      name: 'geo.placename',
      content: 'Décines-Charpieux'
    },
    {
        name: 'geo.position',
        content: '45.7672;4.9684'
      },
      {
        name: 'geo.placename',
        content: 'Décines-Charpieu'
      },
      {
        name: 'geo.region',
        content: 'FR-ARA'
      },
      {
        name: 'ICBM',
        content: '45.7672, 4.9684'
      }
  ]
};

export default SEO_CONFIG;