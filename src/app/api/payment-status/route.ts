// src/app/api/payment-status/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialiser l'instance Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Version API par défaut
});

export async function GET(request: Request) {
    try {
      // Récupérer l'ID du paiement depuis les paramètres de requête
      const { searchParams } = new URL(request.url);
      const paymentId = searchParams.get('paymentId');
      
      if (!paymentId) {
        return NextResponse.json(
          { error: 'ID de paiement manquant' },
          { status: 400 }
        );
      }
      
      // Vérifier directement auprès de Stripe
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
        
        if (paymentIntent.status === 'succeeded') {
          return NextResponse.json({
            status: 'succeeded',
            message: 'Paiement confirmé par Stripe'
          });
        } else if (paymentIntent.status === 'canceled' || paymentIntent.last_payment_error) {
          return NextResponse.json({
            status: 'failed',
            error: 'Le paiement a échoué'
          });
        } else {
          // Pour tous les autres statuts (processing, requires_action, etc.)
          return NextResponse.json({
            status: 'pending',
            message: 'Statut du paiement: ' + paymentIntent.status
          });
        }
      } catch (stripeError) {
        console.error('Erreur lors de la récupération du paiement Stripe:', stripeError);
        return NextResponse.json({
          status: 'error',
          message: 'Impossible de vérifier le statut du paiement auprès de Stripe'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut du paiement:', error);
      return NextResponse.json(
        { error: 'Erreur serveur' },
        { status: 500 }
      );
    }
  }