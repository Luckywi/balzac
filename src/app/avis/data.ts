export interface Avis {
    id: number;
    service: string;
    coiffeur: string;
    client: string;
    date: string;
    commentaire?: string;
    note: number; // Note sur 5
  }
  
  export const avis: Avis[] = [
    {
      id: 1,
      service: "Forfait Couleur (racines) et Soin",
      coiffeur: "Béa",
      client: "Stéphanie",
      date: "16/02/2025",
      note: 5
    },
    {
      id: 2,
      service: "Forfait Balayage, Coupe, Patine et Soin",
      coiffeur: "Béa",
      client: "Zahoua",
      date: "14/02/2025",
      commentaire: "Très bien",
      note: 4.5
    },
    {
      id: 3,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Béa",
      client: "Anne-Lise",
      date: "08/02/2025",
      note: 5
    },
    {
      id: 4,
      service: "Couleur (tête entière) et coupe Femme",
      coiffeur: "Cyril",
      client: "Christine",
      date: "29/01/2025",
      note: 5
    },
    {
      id: 5,
      service: "Forfait Couleur (tête entière) , Coupe et Soin",
      coiffeur: "Béa",
      client: "Angelina",
      date: "14/01/2025",
      note: 5
    },
    {
      id: 6,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Cyril",
      client: "Anne Lise",
      date: "14/01/2025",
      commentaire: "Salon propre. A tout ce qu'il faut. Facile de se garer",
      note: 4.5
    },
    {
      id: 7,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Béa",
      client: "Anne Lise",
      date: "14/01/2025",
      commentaire: "Facile de se garer ! Salon propre. A tout ce qu'il faut.",
      note: 4.5
    },
    {
      id: 8,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Béa",
      client: "Isabelle",
      date: "19/01/2025",
      commentaire: "Salon propre et bien tenu",
      note: 4.2
    },
    {
      id: 9,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Cyril",
      client: "Eliane",
      date: "08/01/2025",
      commentaire: "Toujours un plaisir d'aller chez chez masculin féminin parc ol",
      note: 4.5
    },
    {
      id: 10,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Cyril",
      client: "Rora",
      date: "16/01/2025",
      commentaire: "Accessible et bien aéré",
      note: 4.0
    },
    {
      id: 11,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Béa",
      client: "Agnes",
      date: "18/01/2025",
      note: 5
    },
    {
      id: 12,
      service: "Forfait Mèches, Coupe, Patine et Soin",
      coiffeur: "Béa",
      client: "laetitia",
      date: "15/01/2025",
      note: 5
    },
    {
      id: 13,
      service: "Forfait Couleur (tête entière) , Coupe et Soin",
      coiffeur: "Cyril",
      client: "MARIE-ANNE",
      date: "09/12/2024",
      commentaire: "Salon agréable avec une ambiance très sympathique.",
      note: 4.5
    },
    {
      id: 14,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Cyril",
      client: "sandrine",
      date: "20/12/2024",
      note: 5
    },
    {
      id: 15,
      service: "Couleur (tête entière) et coupe Femme",
      coiffeur: "Cyril",
      client: "Isabelle",
      date: "23/12/2024",
      commentaire: "Personnelle très accueillant et rapide belle déco de fêtes 🥳",
      note: 4.5
    },
    {
      id: 16,
      service: "Forfait Couleur (tête entière) et Soin",
      coiffeur: "Cyril",
      client: "Angelina",
      date: "08/12/2024",
      note: 5
    },
    {
      id: 17,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Cyril",
      client: "MARGUERITE",
      date: "06/12/2024",
      commentaire: "Très bien , place de parking , salon propre et ambiance sympa .",
      note: 4.5
    },
    {
      id: 18,
      service: "Forfait Couleur (tête entière) , Coupe et Soin",
      coiffeur: "Cyril",
      client: "Gaelle",
      date: "16/12/2024",
      commentaire: "Personnes très accueillante",
      note: 4.2
    },
    {
      id: 19,
      service: "Forfait Couleur (tête entière) , Coupe et Soin",
      coiffeur: "Cyril",
      client: "Hind",
      date: "07/12/2024",
      commentaire: "Je n'y reviendrais pas ! Je préfère payer une prestation coiffure chez ma coiffeuse ou je passe un moment agréable plutôt que de payer quelques euros moins cher pour me sentir si mal traiter et ressortir avec des cheveux horribles !",
      note: 1.5
    },
    {
      id: 20,
      service: "Forfait Couleur (racines) , Coupe et Soin",
      coiffeur: "Cyril",
      client: "Martine",
      date: "02/12/2024",
      commentaire: "Bien placé, accessible avec un grand parking. Dommage on ne le voit pas bien de la route",
      note: 3.8
    },
    {
      id: 21,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Cyril",
      client: "marinelli",
      date: "05/12/2024",
      note: 5
    },
    {
      id: 22,
      service: "Forfait Couleur (racines) , Coupe et Soin",
      coiffeur: "Cyril",
      client: "Manuella",
      date: "09/12/2024",
      commentaire: "Personnel très sympathique et attentionné",
      note: 4.5
    },
    {
      id: 23,
      service: "Forfait Couleur (tête entière) , Coupe et Soin",
      coiffeur: "Cyril",
      client: "Lamia",
      date: "29/11/2024",
      commentaire: "Accueil au top, propreté rien à redire, très bien situé, a côté du thiriet",
      note: 4.5
    },
    {
      id: 24,
      service: "Forfait Couleur (tête entière) , Coupe et Soin",
      coiffeur: "Cyril",
      client: "Aline",
      date: "03/12/2024",
      commentaire: "J'adore ce salon au calme, propre, belle déco et on se gare facilement juste devant. Accueil chaleureux des 3 coiffeurs, ambiance cocooning très agréable. On en sort avec le sourire et on a envie de revenir.",
      note: 5.0
    },
    {
      id: 25,
      service: "Forfait Couleur (racines) , Coupe et Soin",
      coiffeur: "Béa",
      client: "Cathy",
      date: "19/11/2024",
      note: 5
    },
    {
      id: 26,
      service: "Forfait Balayage, Coupe, Patine et Soin",
      coiffeur: "Cyril",
      client: "Angelina",
      date: "25/11/2024",
      note: 5
    },
    {
      id: 27,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Béa",
      client: "laetitia",
      date: "27/11/2024",
      commentaire: "Salon propre et sérieux",
      note: 4.2
    },
    {
      id: 28,
      service: "Forfait Coupe et Soin Femme",
      coiffeur: "Béa",
      client: "Frida",
      date: "21/11/2024",
      commentaire: "Chouette salon que je ne connaissais pas. Je reviendrais. Merci de vitre accueil",
      note: 4.5
    },
    {
      id: 29,
      service: "Forfait Couleur (tête entière) , Coupe et Soin",
      coiffeur: "Béa",
      client: "veronique",
      date: "16/11/2024",
      commentaire: "Salon très sobre dans sa déco",
      note: 3.8
    },
    {
        id: 30,
        service: "Forfait Balayage, Coupe, Patine et Soin",
        coiffeur: "Béa",
        client: "Zahoua",
        date: "16/11/2024",
        commentaire: "Très bel accueil et satisfaite du résultat. Merci",
        note: 4.5
      },
      {
        id: 31,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Laetitia",
        date: "15/11/2024",
        commentaire: "Pratique pour se garer",
        note: 4.0
      },
      {
        id: 32,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Audrey",
        date: "13/11/2024",
        commentaire: "Salon très propre. Parking devant.",
        note: 4.2
      },
      {
        id: 33,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "CHANTAL",
        date: "13/11/2024",
        commentaire: "Le salon est accueillant et très propre",
        note: 4.3
      },
      {
        id: 34,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Annie",
        date: "12/11/2024",
        commentaire: "Ambiance chaleureuse on ne vous traite pas comme un numéro on vous écoute",
        note: 4.8
      },
      {
        id: 35,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "MARGUERITE",
        date: "11/11/2024",
        commentaire: "Bon accueil , salon très propre facile d'accès plus parking au poil .",
        note: 4.5
      },
      {
        id: 36,
        service: "Forfait Balayage, Coupe, Patine et Soin",
        coiffeur: "Béa",
        client: "estele",
        date: "04/11/2024",
        commentaire: "Un salon propre et accueillant avec une ambiance chaleureuse 🥰",
        note: 4.8
      },
      {
        id: 37,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Rora",
        date: "29/10/2024",
        commentaire: "Très éclairé et bien agencé",
        note: 4.0
      },
      {
        id: 38,
        service: "Forfait Couleur (tête entière) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Elodie",
        date: "28/10/2024",
        note: 5
      },
      {
        id: 39,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Cyril",
        client: "Mireille",
        date: "15/10/2024",
        commentaire: "Sympa agréable",
        note: 4.2
      },
      {
        id: 40,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "Angelina",
        date: "14/10/2024",
        note: 5
      },
      {
        id: 41,
        service: "Coupe Femme (sans soin)",
        coiffeur: "Cyril",
        client: "Angelina",
        date: "14/10/2024",
        note: 5
      },
      {
        id: 42,
        service: "Coupe Femme (sans soin)",
        coiffeur: "Cyril",
        client: "Soledad",
        date: "20/10/2024",
        note: 5
      },
      {
        id: 43,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Agnes",
        date: "14/10/2024",
        commentaire: "Toujours aussi calme",
        note: 4.3
      },
      {
        id: 44,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Sylvie",
        date: "12/10/2024",
        note: 5
      },
      {
        id: 45,
        service: "Forfait Balayage et Soin",
        coiffeur: "Cyril",
        client: "Karine",
        date: "20/10/2024",
        commentaire: "Salon très propre, accueil souriant On a envie d'y retourner",
        note: 4.7
      },
      {
        id: 46,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Muriel",
        date: "14/10/2024",
        commentaire: "Bien reçue au salon, tout était parfait.",
        note: 4.5
      },
      {
        id: 47,
        service: "Forfait Mèches et Soin",
        coiffeur: "Cyril",
        client: "Milka",
        date: "08/10/2024",
        commentaire: "Bonne ambiance !!!",
        note: 4.5
      },
      {
        id: 48,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Delphine",
        date: "30/09/2024",
        commentaire: "Très bien situé avec parking, propre et toujours un très bon accueil.",
        note: 4.7
      },
      {
        id: 49,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Anaelle",
        date: "06/10/2024",
        commentaire: "Salon de coiffure autant chaleureux et accueillant.",
        note: 4.5
      },
      {
        id: 50,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Martine",
        date: "05/10/2024",
        commentaire: "Propreté correcte. Dommage on ne voit pas bien le salon de la route",
        note: 3.7
      },
      {
        id: 51,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Laetitia",
        date: "01/10/2024",
        note: 5
      },
      {
        id: 52,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Celine",
        date: "02/10/2024",
        note: 5
      },
      {
        id: 53,
        service: "Forfait Mèches et Soin",
        coiffeur: "Cyril",
        client: "laetitia",
        date: "29/09/2024",
        commentaire: "Salon propre et très accueillant avec parking",
        note: 4.5
      },
      {
        id: 54,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Manuella",
        date: "11/09/2024",
        commentaire: "Le salon est propre ordonné et clair",
        note: 4.3
      },
      {
        id: 55,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Mylène",
        date: "20/09/2024",
        note: 5
      },
      {
        id: 56,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Chenda",
        date: "18/09/2024",
        commentaire: "Salon très accueillant",
        note: 4.5
      },
      {
        id: 57,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "océane",
        date: "27/08/2024",
        commentaire: "Salon propre et beau",
        note: 4.3
      },
      {
        id: 58,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Ophélie",
        date: "04/09/2024",
        commentaire: "Salon avec ambiance familiale très appréciable, on s'y sent très bien et le salon est lumineux. De plus il y a un parking gratuit juste devant.",
        note: 4.8
      },
      {
        id: 59,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Sabine",
        date: "22/08/2024",
        commentaire: "Bon accueil",
        note: 4.0
      },
      {
        id: 60,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "laetitia",
        date: "22/08/2024",
        note: 5
      },
      {
        id: 61,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Eleonore",
        date: "20/08/2024",
        note: 5
      },
      {
        id: 62,
        service: "Forfait Couleur (tête entière) et Soin",
        coiffeur: "Cyril",
        client: "Séverine",
        date: "22/08/2024",
        commentaire: "Très propre,",
        note: 4.2
      },
      {
        id: 63,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Martine",
        date: "05/08/2024",
        commentaire: "Le salon est ok , la localisation est correcte avec un grand parking mais peu visible",
        note: 3.8
      },
      {
        id: 64,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "jacqueline",
        date: "05/08/2024",
        note: 5
      },
      {
        id: 65,
        service: "Forfait Mèches et Soin",
        coiffeur: "Béa",
        client: "Amandine",
        date: "06/08/2024",
        commentaire: "Salon propre, agréable. Super accueil",
        note: 4.5
      },
      {
        id: 66,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Evelyne",
        date: "25/07/2024",
        commentaire: "Salon spacieux, clair et climatisé.",
        note: 4.3
      },
      {
        id: 67,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Rora",
        date: "26/07/2024",
        note: 5
      },
      {
        id: 68,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Béa",
        client: "Carli",
        date: "26/07/2024",
        commentaire: "Salon lumineux",
        note: 4.0
      },
      {
        id: 69,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "Mireille",
        date: "16/07/2024",
        commentaire: "propre, rien à idire",
        note: 4.0
      },
      {
        id: 70,
        service: "Forfait Mèches et Soin",
        coiffeur: "Béa",
        client: "Laetitia",
        date: "23/07/2024",
        commentaire: "On est bien installé salon sobre parking en face bien pratique",
        note: 4.2
      },
      {
        id: 71,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Soade",
        date: "22/07/2024",
        commentaire: "Salon convivial et local très propre.",
        note: 4.5
      },
      {
        id: 72,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Cyril",
        client: "Marion",
        date: "20/07/2024",
        note: 5
      },
      {
        id: 73,
        service: "Forfait Mèches, Coupe et Soin",
        coiffeur: "Béa",
        client: "Evelyne",
        date: "13/07/2024",
        commentaire: "Simple et sympa",
        note: 4.0
      },
      {
        id: 74,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "Zahra",
        date: "14/07/2024",
        commentaire: "Le salon est lumineux, spacieux et propre, l'accueil est chaleureux :)",
        note: 4.7
      },
      {
        id: 75,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "laetitia",
        date: "14/07/2024",
        commentaire: "Petit salon propre pas d attente les coiffeurs sont organisés",
        note: 4.3
      },
      {
        id: 76,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "nadia",
        date: "06/07/2024",
        note: 5
      },
      {
        id: 77,
        service: "Forfait Balayage, Patine et Soin",
        coiffeur: "Cyril",
        client: "Fayza",
        date: "12/07/2024",
        commentaire: "Très bon accueil et salon bien équipée",
        note: 4.5
      },
      {
        id: 78,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Cyril",
        client: "Pascal",
        date: "11/07/2024",
        commentaire: "Bonjour, Je ne suis pas satisfait du tout. J'y suis allé pour faire des mèches (cheveux courts) et on voit rien (c'est comme si j'avais rien fait) Je suis donc obligé de retourner chez un autre coiffeur pour faire mes mèches. En revanche en ce qui concerne la coupe à la tondeuse je suis satisfait mais j'ai en travers de la gorge mes 44,50€ règle à l'avance par CB sur l'application kiute.",
        note: 2.0
      },
      {
        id: 79,
        service: "Forfait Ombré Hair, Patine et Soin",
        coiffeur: "Béa",
        client: "Marie",
        date: "05/07/2024",
        note: 5
      },
      {
        id: 80,
        service: "Forfait Mèches, Coupe et Soin",
        coiffeur: "Cyril",
        client: "Corinne",
        date: "29/06/2024",
        note: 5
      },
      {
        id: 81,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "chama",
        date: "01/07/2024",
        commentaire: "J'aime le calme et l'ambiance du salon",
        note: 4.5
      },
      {
        id: 82,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "IRENE",
        date: "29/06/2024",
        commentaire: "Parfait",
        note: 5.0
      },
      {
        id: 83,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Malika",
        date: "23/06/2024",
        commentaire: "Salon très accueillant facile de se garer et très propre",
        note: 4.7
      },
      {
        id: 84,
        service: "Forfait Couleur (tête entière) et Soin",
        coiffeur: "Cyril",
        client: "Sarah",
        date: "15/06/2024",
        commentaire: "Je recommande à mon entourage",
        note: 4.5
      },
      {
        id: 85,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Cyril",
        client: "Séverine",
        date: "13/06/2024",
        commentaire: "Très lumineux très propre",
        note: 4.3
      },
      {
        id: 86,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "Mireille",
        date: "19/05/2024",
        commentaire: "très bien, propre, bonne ambiance",
        note: 4.5
      },
      {
        id: 87,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "sandrine",
        date: "16/05/2024",
        note: 5
      },
      {
        id: 88,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "Stéphanie",
        date: "18/05/2024",
        note: 5
      },
      {
        id: 89,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Alexandrine",
        date: "10/05/2024",
        note: 5
      },
      {
        id: 90,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Cyril",
        client: "Laetitia",
        date: "06/05/2024",
        commentaire: "Toujours contente de venir depuis plus d'un an je recommande",
        note: 4.8
      },
      {
        id: 91,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "Mireille",
        date: "29/04/2024",
        commentaire: "très bien",
        note: 4.5
      },
      {
        id: 92,
        service: "Forfait Ombré Hair, Patine et Soin",
        coiffeur: "Béa",
        client: "Marie",
        date: "28/04/2024",
        commentaire: "Salon très bien et Béa et Cyril très sympa s",
        note: 4.7
      },
      {
        id: 93,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "CLEMENTINE",
        date: "20/04/2024",
        note: 5
      },
      {
        id: 94,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Béa",
        client: "Natalia",
        date: "17/04/2024",
        note: 5
      },
      {
        id: 95,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Béa",
        client: "Karine",
        date: "03/04/2024",
        commentaire: "Salon très propre",
        note: 4.3
      },
      {
        id: 96,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Béa",
        client: "EVELINE",
        date: "07/04/2024",
        commentaire: "Salon propre",
        note: 4.0
      },
      {
        id: 97,
        service: "Forfait Couleur (tête entière) et Soin",
        coiffeur: "Béa",
        client: "Mireille",
        date: "04/04/2024",
        commentaire: "cadre agréable, bien reçu",
        note: 4.3
      },
      {
        id: 98,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Angelina",
        date: "05/04/2024",
        note: 5
      },
      {
        id: 99,
        service: "Forfait Couleur (racines) et Soin",
        coiffeur: "Cyril",
        client: "Maria",
        date: "05/04/2024",
        note: 5
      },
      {
        id: 100,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Stéphanie",
        date: "27/03/2024",
        note: 5
      },
      {
        id: 101,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Florence",
        date: "30/03/2024",
        note: 5
      },
      {
        id: 102,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Milka",
        date: "01/04/2024",
        commentaire: "Une bonne ambiance et accueil chaleureux",
        note: 4.5
      },
      {
        id: 103,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "chama",
        date: "31/03/2024",
        commentaire: "Très agréable",
        note: 4.3
      },
      {
        id: 104,
        service: "Forfait Mèches et Soin",
        coiffeur: "Béa",
        client: "laetitia",
        date: "22/03/2024",
        note: 5
      },
      {
        id: 105,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Béa",
        client: "Evelyne",
        date: "21/03/2024",
        commentaire: "Bea et Cyril sont accueillants et agréables. Je reviens sais hésitations.",
        note: 4.8
      },
      {
        id: 106,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Besset",
        date: "15/03/2024",
        note: 5
      },
      {
        id: 107,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Aline",
        date: "13/03/2024",
        commentaire: "Salon propre et spacieux, facile d'accès, parking gratuit juste devant.",
        note: 4.5
      },
      {
        id: 108,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Béa",
        client: "EVELINE",
        date: "05/03/2024",
        commentaire: "Super agréable pas chichi et propre",
        note: 4.5
      },
      {
        id: 109,
        service: "Forfait Mèches et Soin",
        coiffeur: "Cyril",
        client: "Valérie",
        date: "02/03/2024",
        commentaire: "Salon agréable",
        note: 4.0
      },
      {
        id: 110,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Claire",
        date: "01/03/2024",
        commentaire: "Ambiance chaleureuse",
        note: 4.5
      },
      {
        id: 111,
        service: "Forfait Couleur (tête entière) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Sophie",
        date: "25/02/2024",
        note: 5
      },
      {
        id: 112,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Kaotar",
        date: "01/03/2024",
        note: 5
      },
      {
        id: 113,
        service: "Forfait Mèches et Soin",
        coiffeur: "Cyril",
        client: "sandrine",
        date: "20/02/2024",
        note: 5
      },
      {
        id: 114,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Mireille",
        date: "23/02/2024",
        commentaire: "très correcte",
        note: 4.0
      },
      {
        id: 115,
        service: "Forfait Couleur (tête entière) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Clara",
        date: "08/02/2024",
        commentaire: "Convivialité et bonne humeur, ponctualité et très facile d'accès",
        note: 4.8
      },
      {
        id: 116,
        service: "Forfait Mèches et Soin",
        coiffeur: "Cyril",
        client: "Laetitia",
        date: "08/02/2024",
        commentaire: "Toujours bien accueilli et bien installé je recommande ce salon",
        note: 4.7
      },
      {
        id: 117,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Soade",
        date: "15/02/2024",
        note: 5
      },
      {
        id: 118,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Béa",
        client: "Zora",
        date: "05/02/2024",
        commentaire: "J'étais déjà venue dans ce salon qui est très bien tenu et j'y suis retourné encore, l'acceuil est chaleureux, l'embiance est agréable, Béa est une vrai pro, je reprendrais rdv régulièrement dorenavant.",
        note: 5.0
      },
      {
        id: 119,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Béa",
        client: "caroline",
        date: "01/02/2024",
        commentaire: "Très joli salon bien décoré et très agréable.",
        note: 4.6
      },
      {
        id: 120,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "laetitia",
        date: "28/01/2024",
        commentaire: "Salon nickel",
        note: 4.5
      },
      {
        id: 121,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Marie",
        date: "24/01/2024",
        commentaire: "Bin accueil. Pas d attente",
        note: 4.0
      },
      {
        id: 122,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Agnes",
        date: "29/01/2024",
        commentaire: "Accueil et ambiance chaleureux",
        note: 4.5
      },
      {
        id: 123,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "noelle",
        date: "29/01/2024",
        commentaire: "Impeccable ! et excellent accuel",
        note: 5.0
      },
      {
        id: 124,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Béa",
        client: "Besset",
        date: "25/01/2024",
        note: 5
      },
      {
        id: 125,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Cyril",
        client: "Natalia",
        date: "23/01/2024",
        note: 5
      },
      {
        id: 126,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Anicet",
        date: "24/01/2024",
        commentaire: "Parfait",
        note: 5
      },
      {
        id: 127,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Louise",
        date: "20/01/2024",
        commentaire: "Ambiance très froide et pas agréable.",
        note: 2.5
      },
      {
        id: 128,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Béa",
        client: "Geraldine",
        date: "16/01/2024",
        commentaire: "Stationnement facile",
        note: 4.0
      },
      {
        id: 129,
        service: "Forfait Balayage, Coupe et Soin",
        coiffeur: "Cyril",
        client: "Caroline",
        date: "12/01/2024",
        note: 5
      },
      {
        id: 130,
        service: "Forfait Couleur (racines) , Coupe et Soin",
        coiffeur: "Béa",
        client: "Stéphanie",
        date: "23/12/2023",
        commentaire: "Bon accueil",
        note: 4.0
      },
      {
        id: 131,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Stéphanie",
        date: "02/01/2024",
        commentaire: "un peu daté, mais très propre et confortable",
        note: 3.8
      },
      {
        id: 132,
        service: "Forfait Mèches, Coupe, Patine et Soin",
        coiffeur: "Cyril",
        client: "sandrine",
        date: "31/12/2023",
        note: 5
      },
      {
        id: 133,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Florence",
        date: "30/12/2023",
        note: 5
      },
      {
        id: 134,
        service: "Forfait Coupe et Soin Femme",
        coiffeur: "Cyril",
        client: "Anouk",
        date: "28/12/2023",
        commentaire: "Bonne ambiance !",
        note: 4.3
      },
      {
        id: 135,
        service: "Forfait Couleur (tête entière) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Cathy",
        date: "27/12/2023",
        note: 5
      },
      {
        id: 136,
        service: "Forfait Couleur (tête entière) , Coupe et Soin",
        coiffeur: "Cyril",
        client: "Anaïs",
        date: "27/12/2023",
        note: 5
      },
  ];