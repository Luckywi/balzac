// src/lib/firebase/service.ts
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    addDoc, 
    updateDoc, 
    Timestamp,
  } from "firebase/firestore";
  import { db } from "./config";
  import type { 
    Section, 
    Service, 
    StaffMember, 
    StaffAvailability, 
    SalonConfig, 
    Rdv 
  } from "./types";
  
  // Collections
  const sectionsCollection = collection(db, "sections");
  const servicesCollection = collection(db, "services");
  const staffCollection = collection(db, "staff");
  const rdvsCollection = collection(db, "rdvs");
  const salonCollection = collection(db, "salon");
  
  // Services pour les sections
  export const getSections = async (): Promise<Section[]> => {
    try {
      console.log("📊 Firebase: Tentative de récupération des sections...");
      console.log("📊 Requête sur la collection:", sectionsCollection.path);
      
      const querySnapshot = await getDocs(query(sectionsCollection, orderBy("createdAt")));
      console.log(`📊 Firebase: ${querySnapshot.size} sections trouvées.`);
      
      const sections = querySnapshot.docs.map(doc => {
        console.log(`📊 Section trouvée - ID: ${doc.id}, Titre: ${doc.data().title}`);
        return { 
          id: doc.id, 
          ...doc.data() 
        } as Section;
      });
      
      return sections;
    } catch (error) {
      console.error("❌ Erreur Firebase lors de la récupération des sections:", error);
      if (error instanceof Error) {
        console.error("❌ Message d'erreur:", error.message);
        console.error("❌ Stack trace:", error.stack);
      }
      throw error;
    }
  };
  
  // Services pour les services
  export const getServices = async (sectionId?: string): Promise<Service[]> => {
    try {
      console.log(`📊 Firebase: Récupération des services ${sectionId ? `pour la section: ${sectionId}` : 'tous'}`);
      
      // Construire la requête
      const servicesQuery = sectionId 
        ? query(servicesCollection, where("sectionId", "==", sectionId))
        : query(servicesCollection);
      
      console.log("📊 Requête sur la collection:", servicesCollection.path);
      
      // Exécuter la requête
      const querySnapshot = await getDocs(servicesQuery);
      console.log(`📊 Firebase: ${querySnapshot.size} services trouvés.`);
      
      // Mapper les données
      const services = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(`📊 Service trouvé - ID: ${doc.id}, Titre: ${data.title}, Prix: ${data.originalPrice}€`);
        return { 
          id: doc.id, 
          ...data 
        } as Service;
      });
      
      return services;
    } catch (error) {
      console.error(`❌ Erreur Firebase lors de la récupération des services ${sectionId ? `pour la section ${sectionId}` : ''}:`, error);
      if (error instanceof Error) {
        console.error("❌ Message d'erreur:", error.message);
        console.error("❌ Stack trace:", error.stack);
      }
      throw error;
    }
  };
  
  export const getServiceById = async (serviceId: string): Promise<Service | null> => {
    try {
      const serviceDoc = await getDoc(doc(servicesCollection, serviceId));
      if (serviceDoc.exists()) {
        return { id: serviceDoc.id, ...serviceDoc.data() } as Service;
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la récupération du service:", error);
      throw error;
    }
  };
  
  // Services pour le staff - MODIFIÉ: récupère tous les staff sans filtre active
  export const getStaffMembers = async (): Promise<StaffMember[]> => {
    try {
      console.log("📊 Firebase: Récupération de tous les membres du staff...");
      // Récupérer tous les membres du staff sans filtre
      const querySnapshot = await getDocs(staffCollection);
      console.log(`📊 Firebase: ${querySnapshot.size} membres du staff trouvés.`);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(`📊 Staff trouvé - ID: ${doc.id}, Nom: ${data.name || 'Non spécifié'}`);
        return { 
          id: doc.id, 
          ...data,
          // Si active n'existe pas dans les données, on considère que le staff est actif par défaut
          active: data.active !== undefined ? data.active : true
        } as StaffMember;
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du personnel:", error);
      throw error;
    }
  };
  
  export const getStaffAvailability = async (staffId: string): Promise<StaffAvailability | null> => {
    try {
      console.log(`📊 Firebase: Récupération des disponibilités pour le staff: ${staffId}`);
      // Essayer d'abord de récupérer les disponibilités dans une sous-collection
      const availabilityDoc = await getDoc(doc(staffCollection, staffId));
      
      if (availabilityDoc.exists()) {
        const data = availabilityDoc.data();
        console.log(`📊 Disponibilités trouvées directement dans le document staff:`, data);
        
        // Vérifier si les données de disponibilité sont directement dans le document staff
        if (data.workingHours) {
          console.log(`📊 Structure de workingHours trouvée dans le document staff`);
          return { 
            staffId, 
            workingHours: data.workingHours || {},
            breaks: data.breaks || [],
            vacations: data.vacations || []
          } as StaffAvailability;
        }
      }
      
      // Si pas dans le document principal, essayer la sous-collection "availability"
      try {
        const subCollectionDoc = await getDoc(doc(staffCollection, staffId, "availability", "config"));
        if (subCollectionDoc.exists()) {
          console.log(`📊 Disponibilités trouvées dans la sous-collection availability`);
          return { staffId, ...subCollectionDoc.data() } as StaffAvailability;
        }
      } catch {
        console.log(`📊 Pas de sous-collection availability pour le staff ${staffId}`);
      }
      
      console.log(`⚠️ Aucune disponibilité trouvée pour le staff ${staffId}`);
      return null;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des disponibilités pour le staff ${staffId}:`, error);
      throw error;
    }
  };
  
  // Service pour la configuration du salon
  export const getSalonConfig = async (): Promise<SalonConfig | null> => {
    try {
      const configDoc = await getDoc(doc(salonCollection, "config"));
      if (configDoc.exists()) {
        return configDoc.data() as SalonConfig;
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la récupération de la configuration:", error);
      throw error;
    }
  };
  
  // Services pour les rendez-vous
  export const getRdvsByDateRange = async (startDate: Date, endDate: Date): Promise<Rdv[]> => {
    try {
      const startStr = startDate.toISOString();
      const endStr = endDate.toISOString();
      
      const rdvsQuery = query(
        rdvsCollection,
        where("start", ">=", startStr),
        where("start", "<", endStr)
      );
      
      const querySnapshot = await getDocs(rdvsQuery);
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Rdv));
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      throw error;
    }
  };
  
  export const getRdvsByStaffAndDate = async (staffId: string, date: Date): Promise<Rdv[]> => {
    try {
      // Convertir la date en début et fin de journée
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const startStr = startOfDay.toISOString();
      const endStr = endOfDay.toISOString();
      
      const rdvsQuery = query(
        rdvsCollection,
        where("staffId", "==", staffId),
        where("start", ">=", startStr),
        where("start", "<", endStr)
      );
      
      const querySnapshot = await getDocs(rdvsQuery);
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Rdv));
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      throw error;
    }
  };
  
  export const createRdv = async (rdvData: Omit<Rdv, 'id' | 'createdAt'>): Promise<string> => {
    try {
      const newRdv = {
        ...rdvData,
        createdAt: Timestamp.now(),
        source: 'client'
      };
      
      const docRef = await addDoc(rdvsCollection, newRdv);
      return docRef.id;
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error);
      throw error;
    }
  };
  
  export const updateRdv = async (rdvId: string, data: Partial<Rdv>): Promise<void> => {
    try {
      await updateDoc(doc(rdvsCollection, rdvId), data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rendez-vous:", error);
      throw error;
    }
  };