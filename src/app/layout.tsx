// src/app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import Footer from './components/Footer';
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lebalzac-coiffure-decines.fr'),
  title: {
    default: "Le Balzac | Salon de coiffure à Décines-Charpieux",
    template: "%s | Le Balzac Salon de Coiffure"
  },
  description: "Salon de coiffure expert pour femmes et hommes au 3 Rue Balzac, 69150 Décines-Charpieux. Spécialistes en coupes, colorations, mèches et soins personnalisés.",
  openGraph: {
    title: "Le Balzac | Salon de Coiffure à Décines-Charpieux",
    description: "Bienvenue au salon Le Balzac, votre salon de coiffure expert au 3 Rue Balzac, 69150 Décines-Charpieux.",
    url: 'https://www.lebalzac-coiffure-decines.fr',
    siteName: 'Le Balzac Salon de Coiffure',
    images: [
      {
        url: '/images/salon/image1.webp',
        width: 1200,
        height: 630,
        alt: 'Salon de coiffure Le Balzac à Décines-Charpieux',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Balzac | Salon de coiffure Femme et Hommes à Décines-Charpieux',
    description: 'Salon de coiffure à Décines-Charpieux. Prestations femme et homme: coupes, couleurs, mèches et soins par des experts.',
    images: ['/images/salon/image1.webp'],
    creator: '@lebalzac',
  },
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
  keywords: ["salon de coiffure", "coiffeur Décines", "coupe femme", "coupe homme", "coloration", "balayage", "mèches", "Décines-Charpieux", "Le Balzac", "3 Rue Balzac"],
  alternates: {
    canonical: "/",
    languages: {
      'fr-FR': "/",
    },
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Le Balzac"
  },
  applicationName: "Le Balzac",
  category: 'beauty',
  verification: {
    google: 'votre-code-verification-google', // Ajoutez votre code de vérification Google ici
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </head>
      <body className={`${jetbrainsMono.variable}`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}