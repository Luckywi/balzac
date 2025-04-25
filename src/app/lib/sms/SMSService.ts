import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export class SMSService {
  private static formatPhoneNumber(phone: string): string {
    return phone.replace(/\s/g, '').replace(/^0/, '33');
  }

  public static async sendConfirmationSMS(appointmentId: string): Promise<void> {
    try {
      const appointmentDoc = await getDoc(doc(db, 'rdvs', appointmentId));
      if (!appointmentDoc.exists()) throw new Error('Rendez-vous introuvable');

      const appointmentData = appointmentDoc.data();

      // infos client
      const formattedPhone = this.formatPhoneNumber(appointmentData.clientPhone);

      // format de la date/heure
      const startDate = new Date(appointmentData.start);
      const appointmentDate = format(new Date(appointmentData.start), 'dd/MM', { locale: fr });
      const appointmentTime = format(startDate, 'HH:mm');

      const confirmationUrl = `https://www.lebalzac-coiffure-decines.fr/confirmation/${appointmentId}`;

      const requestBody = {
        "data": {
          "from": 'LE BALZAC',
          "to": [formattedPhone],
          "parameters": {
            [formattedPhone]: [appointmentDate, appointmentTime, confirmationUrl]
          },
          "text": `Bonjour, RDV confirmé pour le {appointmentDate} à {appointmentTime}. 3 Rue Balzac, 69150 Décines-Charpieux 0472020056. Gérez ici : {confirmationUrl} · À bientôt !`,
          "request_id": appointmentId,
          "shorten_URLs": true
        }
      };

      console.log('Envoi SMS avec:', requestBody);

      const response = await fetch('https://api.topmessage.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-topmessage-key': process.env.NEXT_PUBLIC_TOPMESSAGE_API_KEY || ''
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur API: ${JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      console.log('SMS envoyé avec succès:', responseData);
    } catch (error) {
      console.error('Erreur envoi SMS:', error);
      throw error;
    }
  }
}
