'use client';

import { useState, useEffect } from 'react';
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import type { PaymentRequest } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Lock } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  serviceId: string;
  serviceTitle: string;
  serviceDuration: number;
  staffId: string;
  startTime: string;
  endTime: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string | null;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}

export default function PaymentForm({
  amount,
  serviceId,
  serviceTitle,
  serviceDuration,
  staffId,
  startTime,
  endTime,
  clientName,
  clientPhone,
  clientEmail,
  onPaymentSuccess,
  onPaymentError
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            serviceId,
            serviceTitle,
            serviceDuration,
            staffId,
            startTime,
            endTime,
            clientName,
            clientPhone,
            clientEmail,
          }),
        });

        if (!response.ok) throw new Error('Erreur lors de la création du paiement');

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Erreur:', error);
        const message = error instanceof Error ? error.message : 'Une erreur est survenue';
        setError(message);
        onPaymentError(message);
      } finally {
        setLoading(false);
      }
    };

    if (amount > 0) createPaymentIntent();
  }, [amount, serviceId, serviceTitle, serviceDuration, staffId, startTime, endTime, clientName, clientPhone, clientEmail, onPaymentError]);

  // Initialiser PaymentRequest (Apple Pay / Google Pay)
  useEffect(() => {
    if (!stripe || !clientSecret) return;
  
    const pr = stripe.paymentRequest({
      country: 'FR',
      currency: 'eur',
      total: {
        label: serviceTitle,
        amount: Math.round(amount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
    });
  
    // Vérifier si Apple Pay ou Google Pay est disponible
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
        setCanMakePayment(true);
      }
    });
  
    // Gérer le paiement avec Apple Pay / Google Pay
    pr.on('paymentmethod', async (ev) => {
      if (!stripe || !clientSecret) {
        ev.complete('fail');
        return;
      }
  
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: ev.paymentMethod.id,
      });
  
      if (confirmError) {
        console.error('Erreur Stripe Apple Pay:', confirmError);
        ev.complete('fail');
        setError(confirmError.message || 'Erreur Apple Pay');
        onPaymentError(confirmError.message || 'Erreur Apple Pay');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        ev.complete('success');
        onPaymentSuccess(paymentIntent.id);
      } else {
        ev.complete('fail');
        setError('Le paiement n’a pas pu être confirmé');
        onPaymentError('Le paiement n’a pas pu être confirmé');
      }
    });
  }, [stripe, clientSecret, amount, serviceTitle, onPaymentError, onPaymentSuccess]);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

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
        billing_details: { name: clientName },
      },
    });

    if (error) {
      const msg = error.message || 'Une erreur est survenue lors du paiement';
      setError(msg);
      onPaymentError(msg);
    } else if (paymentIntent.status === 'succeeded') {
      onPaymentSuccess(paymentIntent.id);
    }

    setLoading(false);
  };

  const formattedDate = format(new Date(startTime), 'EEEE d MMMM yyyy', { locale: fr });
  const formattedTime = format(new Date(startTime), 'HH:mm');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-white" />
          <h3 className="text-lg font-medium">Paiement sécurisé</h3>
        </div>
        <p className="text-sm text-white/70">
          Votre paiement est sécurisé par Stripe. Vous serez débité de {amount}€ pour {serviceTitle} au Salon Balzac coiffure (3 Rue Balzac, 69150 Décines-Charpieu) le {formattedDate} à {formattedTime}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Apple Pay / Google Pay */}
        {canMakePayment && paymentRequest && (
          <div className="mb-4">
            <PaymentRequestButtonElement
              options={{ paymentRequest }}
              className="PaymentRequestButton"
            />
            <p className="text-xs text-white/60 text-center mt-2">Ou payez avec une carte bancaire</p>
          </div>
        )}

        {/* CB classique */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' },
                },
                invalid: { color: '#ff3860' },
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
              : 'bg-white text-purple-900 hover:bg-gray-100'
          }`}
        >
          {loading ? 'Traitement en cours...' : `Payer ${amount}€`}
        </button>
      </form>
    </motion.div>
  );
}
