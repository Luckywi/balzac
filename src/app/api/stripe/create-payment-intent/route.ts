import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialiser l'instance Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Laisser Stripe utiliser la version API par défaut
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, serviceTitle, clientName } = body;

    // Vérifier les données requises
    if (!amount || !serviceTitle) {
      return NextResponse.json(
        { error: 'Montant et titre du service requis' },
        { status: 400 }
      );
    }

    // Créer un PaymentIntent avec le montant et la devise
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe attend le montant en centimes
      currency: 'eur',
      metadata: {
        serviceTitle,
        clientName: clientName || 'Client anonyme',
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