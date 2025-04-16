'use client';

import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

interface PaymentFormProps {
  amount: number;
  serviceTitle: string;
  clientName: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}

export default function PaymentForm({
  amount,
  serviceTitle,
  clientName,
  onPaymentSuccess,
  onPaymentError
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Créer un PaymentIntent dès que le composant est monté
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            serviceTitle,
            clientName,
          }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la création du paiement');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        onPaymentError(error instanceof Error ? error.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount, serviceTitle, clientName, onPaymentError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Élément de carte non trouvé');
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: clientName,
        },
      },
    });

    if (error) {
      setError(error.message || 'Une erreur est survenue lors du paiement');
      onPaymentError(error.message || 'Une erreur est survenue lors du paiement');
    } else if (paymentIntent.status === 'succeeded') {
      onPaymentSuccess(paymentIntent.id);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h3 className="text-lg font-medium mb-4">Paiement sécurisé</h3>
      <p className="text-sm text-white/70 mb-6">
        Votre paiement est sécurisé par Stripe. Vous serez débité de {amount}€ pour {serviceTitle}.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.6)',
                  },
                },
                invalid: {
                  color: '#ff3860',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="py-2 px-4 bg-red-800/50 text-white rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || !elements || loading || !clientSecret}
          className={`w-full py-3 rounded-lg text-center font-medium transition-colors ${
            !stripe || !elements || loading || !clientSecret
              ? 'bg-white/30 cursor-not-allowed'
              : 'bg-white text-purple-700 hover:bg-gray-100'
          }`}
        >
          {loading ? 'Traitement en cours...' : `Payer ${amount}€`}
        </button>
      </form>
    </motion.div>
  );
}