import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateRdv } from '@/app/lib/firebase/service';

// Initialiser l'instance Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Version API par défaut
});

export async function POST(request: Request) {
  try {
    // Récupérer le body de la requête en tant que texte
    const text = await request.text();
    
    // Récupérer la signature de l'en-tête
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Signature Stripe manquante' },
        { status: 400 }
      );
    }

    // Vérifier la signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Erreur de validation webhook:', err);
      return NextResponse.json(
        { error: 'Signature webhook invalide' },
        { status: 400 }
      );
    }

    // Traiter les événements selon leur type
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Le paiement a réussi
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Mettre à jour le statut dans Firebase
        if (paymentIntent.metadata.rdvId) {
          await updateRdv(paymentIntent.metadata.rdvId, {
            paymentStatus: 'completed',
            paid: true,
          });
          console.log(`Paiement confirmé pour rdv: ${paymentIntent.metadata.rdvId}`);
        }
        break;
        
      case 'payment_intent.payment_failed':
        // Le paiement a échoué
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        
        if (failedPayment.metadata.rdvId) {
          await updateRdv(failedPayment.metadata.rdvId, {
            paymentStatus: 'failed',
          });
          console.log(`Echec de paiement pour rdv: ${failedPayment.metadata.rdvId}`);
        }
        break;
        
      default:
        // Ignorer les autres événements
        console.log(`Événement webhook non traité: ${event.type}`);
    }

    // Répondre pour confirmer la réception
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json(
      { error: 'Erreur de traitement du webhook' },
      { status: 500 }
    );
  }
}