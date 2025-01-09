import React, { useState } from 'react';
import { Calendar, Clock, Users, CreditCard, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface ReservationFlowProps {
  venueId: string;
  venueName: string;
  onComplete: () => void;
  onCancel: () => void;
}

type Step = 'date' | 'details' | 'payment' | 'confirmation';

export default function ReservationFlow({
  venueId,
  venueName,
  onComplete,
  onCancel,
}: ReservationFlowProps) {
  const { createReservation, processPayment } = useBooking();
  const [currentStep, setCurrentStep] = useState<Step>('date');
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    partySize: 1,
    specialRequests: '',
    amount: 0, // This would be calculated based on venue pricing
  });
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'debit_card' | 'apple_pay' | 'google_pay'>('credit_card');
  const [reservationId, setReservationId] = useState<string | null>(null);

  const handleDateSelect = (date: string) => {
    setReservationData(prev => ({ ...prev, date }));
    setCurrentStep('details');
  };

  const handleDetailsSubmit = async () => {
    const id = await createReservation({
      userId: 'current-user', // Replace with actual user ID
      venueId,
      date: reservationData.date,
      time: reservationData.time,
      partySize: reservationData.partySize,
      specialRequests: reservationData.specialRequests,
      amount: reservationData.amount,
    });
    setReservationId(id);
    setCurrentStep('payment');
  };

  const handlePayment = async () => {
    if (!reservationId) return;
    
    const success = await processPayment(reservationId, paymentMethod);
    if (success) {
      setCurrentStep('confirmation');
    } else {
      // Handle payment failure
      alert('Payment failed. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'date':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Date & Time
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Calendar className="w-full h-48" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Available Times</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setReservationData(prev => ({ ...prev, time }))}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        reservationData.time === time
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDateSelect(new Date().toISOString())}
                disabled={!reservationData.time}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reservation Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Party Size
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReservationData(prev => ({
                      ...prev,
                      partySize: Math.max(1, prev.partySize - 1)
                    }))}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{reservationData.partySize}</span>
                  <button
                    onClick={() => setReservationData(prev => ({
                      ...prev,
                      partySize: Math.min(20, prev.partySize + 1)
                    }))}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Requests
                </label>
                <textarea
                  value={reservationData.specialRequests}
                  onChange={(e) => setReservationData(prev => ({
                    ...prev,
                    specialRequests: e.target.value
                  }))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Any special requests or preferences?"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCurrentStep('date')}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleDetailsSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Payment Method
            </h3>
            <div className="space-y-4">
              {[
                { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
                { id: 'debit_card', label: 'Debit Card', icon: CreditCard },
                { id: 'apple_pay', label: 'Apple Pay', icon: CreditCard },
                { id: 'google_pay', label: 'Google Pay', icon: CreditCard },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPaymentMethod(id as any)}
                  className={`w-full p-4 rounded-lg border transition-colors flex items-center gap-3 ${
                    paymentMethod === id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className={paymentMethod === id ? 'text-blue-500' : 'text-gray-400'} />
                  <span className={paymentMethod === id ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCurrentStep('details')}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reservation Confirmed!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your reservation at {venueName} has been confirmed. We've sent you a confirmation email with all the details.
            </p>
            <button
              onClick={onComplete}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Done
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl m-4">
        {renderStep()}
      </div>
    </div>
  );
}
