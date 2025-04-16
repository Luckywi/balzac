import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialiser l'instance Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Laisser Stripe utiliser la version API par défaut
});

// Dans src/app/api/stripe/create-payment-intent/route.ts
export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { 
        amount, 
        serviceId, 
        serviceTitle, 
        serviceDuration, 
        staffId, 
        startTime, 
        endTime, 
        clientName, 
        clientPhone, 
        clientEmail 
      } = body;
  
      // Vérifier les données requises
      if (!amount || !serviceTitle || !startTime || !clientName) {
        return NextResponse.json(
          { error: 'Données manquantes pour la création du payment intent' },
          { status: 400 }
        );
      }
  
      // Créer un PaymentIntent avec le montant, la devise et les métadonnées
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe attend le montant en centimes
        currency: 'eur',
        metadata: {
          serviceId,
          serviceTitle,
          serviceDuration: String(serviceDuration),
          staffId,
          startTime,
          endTime,
          clientName,
          clientPhone,
          clientEmail: clientEmail || '',
        },
      });
  
      // Renvoyer le clientSecret au client
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la création du paiement' },
        { status: 500 }
      );
    }
  }