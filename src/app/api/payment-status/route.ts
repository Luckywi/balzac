import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '../../lib/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Initialiser Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Version API par défaut
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'ID de paiement manquant' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status === 'succeeded') {
      // 🔍 Chercher dans Firestore le document correspondant à ce paiement
      const rdvRef = collection(db, 'rdvs');
      const rdvQuery = query(rdvRef, where('paymentIntentId', '==', paymentId));
      const rdvSnapshot = await getDocs(rdvQuery);

      if (!rdvSnapshot.empty) {
        const rdvDoc = rdvSnapshot.docs[0];
        const bookingId = rdvDoc.id;

        return NextResponse.json({
          status: 'succeeded',
          message: 'Paiement confirmé par Stripe',
          bookingId, // 👈 voilà la clé !
        });
      } else {
        return NextResponse.json({
          status: 'succeeded',
          message: 'Paiement confirmé mais aucun RDV trouvé',
        });
      }
    } else if (paymentIntent.status === 'canceled' || paymentIntent.last_payment_error) {
      return NextResponse.json({
        status: 'failed',
        error: 'Le paiement a échoué'
      });
    } else {
      return NextResponse.json({
        status: 'pending',
        message: 'Statut du paiement: ' + paymentIntent.status
      });
    }
  } catch (error) {
    console.error('Erreur dans /api/payment-status:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
