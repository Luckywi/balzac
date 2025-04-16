// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createRdv } from '@/app/lib/firebase/service';

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
        
        // Vérifier si nous avons toutes les métadonnées nécessaires
        if (
          paymentIntent.metadata.serviceId &&
          paymentIntent.metadata.serviceTitle &&
          paymentIntent.metadata.serviceDuration &&
          paymentIntent.metadata.staffId &&
          paymentIntent.metadata.startTime &&
          paymentIntent.metadata.endTime &&
          paymentIntent.metadata.clientName
        ) {
          try {
            // Créer le RDV directement avec le statut payé
            const rdvData = {
              serviceId: paymentIntent.metadata.serviceId,
              serviceTitle: paymentIntent.metadata.serviceTitle,
              serviceDuration: parseInt(paymentIntent.metadata.serviceDuration),
              staffId: paymentIntent.metadata.staffId,
              start: paymentIntent.metadata.startTime,
              end: paymentIntent.metadata.endTime,
              clientName: paymentIntent.metadata.clientName,
              clientPhone: paymentIntent.metadata.clientPhone,
              clientEmail: paymentIntent.metadata.clientEmail || undefined,
              price: paymentIntent.amount / 100, // Convertir les centimes en euros
              paymentIntentId: paymentIntent.id,
              paymentStatus: 'completed',
              paid: true,
            };
            
            const rdvId = await createRdv(rdvData);
            console.log(`RDV créé avec succès après paiement, ID: ${rdvId}`);
            
            // Vous pourriez également envoyer un email ou un SMS de confirmation ici
            
            return NextResponse.json({ 
              received: true, 
              success: true,
              bookingId: rdvId
            });
          } catch (error) {
            console.error('Erreur lors de la création du RDV:', error);
            return NextResponse.json({ 
              received: true, 
              success: false,
              error: 'Erreur lors de la création du RDV'
            });
          }
        } else {
          console.error('Métadonnées manquantes dans le payment intent:', paymentIntent.metadata);
          return NextResponse.json({ 
            received: true, 
            success: false,
            error: 'Métadonnées manquantes dans le payment intent'
          });
        }
        break;
        
      case 'payment_intent.payment_failed':
        // Le paiement a échoué - aucune action nécessaire car nous ne créons pas de RDV
        console.log(`Échec de paiement, aucun RDV créé. PaymentIntent ID: ${event.data.object.id}`);
        return NextResponse.json({ 
          received: true, 
          success: false,
          error: 'Échec du paiement'
        });
        
      default:
        // Ignorer les autres événements
        console.log(`Événement webhook non traité: ${event.type}`);
        return NextResponse.json({ received: true });
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