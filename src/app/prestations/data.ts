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
      id: "femmes-meches",
      titre: "Femmes Mèches & Soins",
      description: "",
      note: "Au delà de la poitrine, un supplément longueur sera appliqué. Cheveux épais, frisés un supplément de 6€ sera appliqué",
      prestations: [
        { id: "meches-courts", titre: "Shampooing + Mèches + Brushing - Cheveux courts", duree: "1h 10min", prix: "à partir de 61 €" },
        { id: "meches-carre", titre: "Shampooing + Mèches + Brushing - Cheveux Carré (Épaules)", duree: "1h 20min", prix: "à partir de 67 €" },
        { id: "meches-longs", titre: "Shampooing + Mèches + Brushing - Cheveux Longs (jusqu'à poitrine)", duree: "1h 25min", prix: "à partir de 82 €" },
        { id: "meches-coupe-courts", titre: "Shampooing + Mèches + Coupe & Brushing - Cheveux courts", duree: "1h 20min", prix: "à partir de 80 €" },
        { id: "meches-coupe-carre", titre: "Shampooing + Mèches + Coupe & Brushing - Cheveux Carré (Épaules)", duree: "1h 20min", prix: "à partir de 86 €" },
        { id: "meches-coupe-longs", titre: "Shampooing + Mèches + Coupe & Brushing - Cheveux Longs (jusqu'à poitrine)", duree: "1h 25min", prix: "à partir de 101 €" }
      ]
    },
    {
      id: "femmes-couleur",
      titre: "Femmes Couleurs & Shampooing & Brushing & Soins",
      description: "",
      note: "Au delà de la poitrine, un supplément longueur sera appliqué. Cheveux épais, frisés un supplément de 6€ sera appliqué",
      prestations: [
        { id: "couleur-courts", titre: "Shampooing + Couleur + Brushing - Cheveux Courts", duree: "1h 5min", prix: "à partir de 46 €" },
        { id: "couleur-carre", titre: "Shampooing + Couleur + Brushing - Cheveux Carré (Épaules)", duree: "1h 15min", prix: "à partir de 48 €" },
        { id: "couleur-longs", titre: "Shampooing + Couleur + Brushing - Cheveux Longs (jusqu'à poitrine)", duree: "1h 25min", prix: "à partir de 53 €" }
      ]
    },
    {
      id: "femmes-couleur-coupe",
      titre: "Femmes Couleurs & Shampooing + Coupe & Brushing & Soins",
      description: "",
      note: "Au delà de la poitrine, un supplément longueur sera appliqué. Cheveux épais, frisés un supplément de 6€ sera appliqué",
      prestations: [
        { id: "couleur-coupe-courts", titre: "Shampooing + Couleur + Coupe Brushing - Cheveux Courts", duree: "1h 30min", prix: "à partir de 61 €" },
        { id: "couleur-coupe-carre", titre: "Shampooing + Couleur + Coupe Brushing - Cheveux Carré (Épaules)", duree: "1h 30min", prix: "à partir de 63 €" },
        { id: "couleur-coupe-longs", titre: "Shampooing + Couleur + Coupe Brushing - Cheveux Longs (jusqu'à poitrine)", duree: "1h 45min", prix: "à partir de 66 €" }
      ]
    },
    {
      id: "femmes-shampooing-coupe",
      titre: "Femmes Shampooing & Coupe & Brushing & Soins",
      description: "",
      prestations: [
        { id: "coupe-courts", titre: "Shampooing + Coupe + Brushing - Cheveux Courts", duree: "30min", prix: "36 €" },
        { id: "coupe-carre", titre: "Shampooing + Coupe + Brushing - Cheveux Carrés (Épaules)", duree: "30min", prix: "38 €" },
        { id: "coupe-longs", titre: "Shampooing + Coupe + Brushing - Cheveux Longs", duree: "45min", prix: "41 €" },
        { id: "coupe-extra-longs", titre: "Shampooing + Coupe + Brushing - Cheveux Extra Longs (Niveau poitrine et plus)", duree: "50min", prix: "56 €" }
      ]
    },
    {
      id: "femmes-shampooing-brushing",
      titre: "Femmes Shampooing & Brushing",
      description: "",
      prestations: [
        { id: "brushing-courts", titre: "Shampooing + Brushing - Cheveux courts", duree: "20min", prix: "17 €" },
        { id: "brushing-carre", titre: "Shampooing + Brushing - Cheveux Carré (Épaules)", duree: "30min", prix: "19 €" },
        { id: "brushing-longs", titre: "Shampooing + Brushing - Cheveux Longs", duree: "35min", prix: "23 €" },
        { id: "brushing-extra-longs", titre: "Shampooing + Brushing - Cheveux Extra Longs (Niveau poitrine et plus)", duree: "40min", prix: "28 €" }
      ]
    },
    {
      id: "hommes",
      titre: "Hommes",
      prestations: [
        { id: "homme-complet", titre: "Shampooing + Coupe + Coiffage", duree: "30min", prix: "19 €" },
        { id: "homme-barbe", titre: "Entretien barbe tondeuse", duree: "15min", prix: "5 €" }
      ]
    },
    {
      id: "enfants",
      titre: "Les Petits Loups",
      prestations: [
        { id: "garcons-moins-13", titre: "Garçons jusqu'à 13 ans - Coupe + Mise en forme", duree: "20min", prix: "14 €" },
        { id: "garcons-plus-13", titre: "Garçons + de 13 ans - Coupe + Mise en forme", duree: "20min", prix: "17 €" }
      ]
    }
  ];