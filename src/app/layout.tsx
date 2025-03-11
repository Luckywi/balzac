import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap", // Optimisation pour le chargement des polices
});

export const metadata: Metadata = {
  title: {
    default: "Le Balzac | Salon de coiffure à Décines-Charpieux",
    template: "%s | Le Balzac Salon de Coiffure"
  },
  description: "Salon de coiffure pour femme et homme à Décines-Charpieux. Coupes, couleurs, mèches, balayages et soins par des experts passionnés. Grand parking gratuit, ambiance chaleureuse.",
  keywords: ["salon de coiffure", "coiffeur Décines", "coupe femme", "coupe homme", "coloration", "balayage", "mèches", "Décines-Charpieux", "Le Balzac"],
  authors: [{ name: "Le Balzac" }],
  creator: "Le Balzac",
  publisher: "Le Balzac",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://www.lebalzac-coiffure-decines.fr"), // Remplacez par votre domaine réel
  alternates: {
    canonical: "/",
    languages: {
      'fr-FR': "/",
    },
  },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Le Balzac"
  },
  applicationName: "Le Balzac",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.lebalzac-coiffure-decines.fr',
    title: 'Le Balzac | Salon de coiffure à Décines-Charpieux',
    description: 'Salon de coiffure à Décines-Charpieux. Prestations femme et homme: coupes, couleurs, mèches et soins par des experts. Réservez en ligne dès maintenant.',
    siteName: 'Le Balzac',
    images: [
      {
        url: '/images/salon/image1.webp',
        width: 1200,
        height: 630,
        alt: 'Le Balzac - Salon de coiffure à Décines-Charpieux',
      },
    ],
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'votre-code-verification-google', // Ajoutez votre code de vérification Google ici
  },
  category: 'beauty',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "Le Balzac",
              "image": "https://www.lebalzac-coiffure-decines.fr/images/salon/image1.webp",
              "url": "https://www.lebalzac-coiffure-decines.fr",
              "telephone": "0472000000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3 Rue Balzac",
                "addressLocality": "Décines-Charpieu",
                "postalCode": "69150",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 45.7672,
                "longitude": 4.9684
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday"],
                  "opens": "00:00",
                  "closes": "00:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Tuesday"],
                  "opens": "08:30",
                  "closes": "11:45"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Tuesday"],
                  "opens": "14:00",
                  "closes": "18:15"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Wednesday", "Thursday"],
                  "opens": "08:30",
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
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Sunday"],
                  "opens": "00:00",
                  "closes": "00:00"
                }
              ],
              "priceRange": "€€",
              "servesCuisine": "Haircut, Hair Coloring, Hair Styling",
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "4.8",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Clients du salon Le Balzac"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "136",
                "bestRating": "5"
              }
            })
          }}
        />
      </head>
      <body className={`${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}