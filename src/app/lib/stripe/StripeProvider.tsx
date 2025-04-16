'use client';

import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Récupérer la clé publique de Stripe depuis les variables d'environnement
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeProviderProps {
  children: ReactNode;
  clientSecret?: string | null;
}

export default function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret: clientSecret || undefined }}>
      {children}
    </Elements>
  );
}