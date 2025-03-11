// Types pour les prestations
export interface Prestation {
  id: string;
  titre: string;
  duree: string;
  prix: string | { montant: string; description: string };
}

export interface CategoriePrestation {
  id: string;
  titre: string;
  description?: string;
  note?: string;
  prestations: Prestation[];
  matchedByCategory?: boolean;
}

// Données des prestations
export const prestations: CategoriePrestation[] = [
  {
    id: "femmes-cheveux-courts",
    titre: "Femmes Cheveux Courts",
    description: "Le shampooing, la mousses et les soins sont offertes dans toutes les prestations.",
    note: "Cheveux épais, frisés un supplément de 6€ sera appliqué.",
    prestations: [
      { id: "meches-courts", titre: "Mèches + Brushing", duree: "1h 10min", prix: "61 €" },
      { id: "meches-coupe-courts", titre: "Mèches + Coupe + Brushing", duree: "1h 20min", prix: "80 €" },
      { id: "couleur-courts", titre: "Couleur + Brushing", duree: "1h 5min", prix: "46 €" },
      { id: "couleur-coupe-courts", titre: "Couleur + Coupe + Brushing", duree: "1h 30min", prix: "61 €" },
      { id: "coupe-courts", titre: "Coupe + Brushing", duree: "30min", prix: "36 €" },
      { id: "brushing-courts", titre: "Brushing", duree: "20min", prix: "17 €" }
    ]
  },
  {
    id: "femmes-cheveux-carre",
    titre: "Femmes Cheveux Carré (Épaules)",
    description: "Le shampooing, la mousses et les soins sont offertes dans toutes les prestations",
    note: "Cheveux épais, frisés un supplément de 6€ sera appliqué.",
    prestations: [
      { id: "meches-carre", titre: "Mèches + Brushing", duree: "1h 20min", prix: "67 €" },
      { id: "meches-coupe-carre", titre: "Mèches + Coupe + Brushing", duree: "1h 20min", prix: "86 €" },
      { id: "couleur-carre", titre: "Couleur + Brushing", duree: "1h 15min", prix: "48 €" },
      { id: "couleur-coupe-carre", titre: "Couleur + Coupe + Brushing", duree: "1h 30min", prix: "63 €" },
      { id: "coupe-carre", titre: "Coupe + Brushing", duree: "30min", prix: "38 €" },
      { id: "brushing-carre", titre: "Brushing", duree: "30min", prix: "19 €" }
    ]
  },
  {
    id: "femmes-cheveux-longs",
    titre: "Femmes Cheveux Longs",
    description: "Le shampooing, la mousses et les soins sont offertes dans toutes les prestations",
    note: "Au delà de la poitrine, un supplément longueur sera appliqué. Cheveux épais, frisés un supplément de 6€ sera appliqué.",
    prestations: [
      { id: "meches-longs", titre: "Mèches + Brushing", duree: "1h 25min", prix: "82 €" },
      { id: "meches-coupe-longs", titre: "Mèches + Coupe + Brushing", duree: "1h 25min", prix: "101 €" },
      { id: "couleur-longs", titre: "Couleur + Brushing", duree: "1h 25min", prix: "53 €" },
      { id: "couleur-coupe-longs", titre: "Couleur + Coupe + Brushing", duree: "1h 45min", prix: "66 €" },
      { id: "coupe-longs", titre: "Coupe + Brushing", duree: "45min", prix: "41 €" },
      { id: "brushing-longs", titre: "Brushing", duree: "35min", prix: "23 €" }
    ]
  },
  {
    id: "hommes",
    titre: "Hommes",
    description: "Le shampooing et la mise en place sont offertes dans toutes les prestations.",
    prestations: [
      { id: "homme-complet", titre: "Coupe + Coiffage", duree: "30min", prix: "19 €" },
      { id: "homme-barbe", titre: "Entretien barbe tondeuse", duree: "15min", prix: "5 €" }
    ]
  },
  {
    id: "enfants",
    titre: "Les Petits Loups",
    description: "Le shampooing et la mise en place sont offertes dans toutes les prestations.",
    prestations: [
      { id: "garcons-moins-13", titre: "Garçons jusqu'à 13 ans - Coupe + Mise en forme", duree: "20min", prix: "14 €" },
      { id: "garcons-plus-13", titre: "Garçons + de 13 ans - Coupe + Mise en forme", duree: "20min", prix: "17 €" }
    ]
  }
];