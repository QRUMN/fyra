import React, { createContext, useContext, useState } from 'react';
import QRCode from 'qrcode';

interface Reservation {
  id: string;
  userId: string;
  venueId: string;
  eventId?: string;
  date: string;
  time: string;
  partySize: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  qrCode?: string;
  paymentStatus: 'unpaid' | 'processing' | 'paid' | 'refunded';
  amount: number;
  tableNumber?: string;
  specialRequests?: string;
}

interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'credit_card' | 'debit_card' | 'apple_pay' | 'google_pay';
  timestamp: string;
  transactionId?: string;
}

interface BookingContextType {
  reservations: Reservation[];
  payments: Payment[];
  createReservation: (reservation: Omit<Reservation, 'id' | 'qrCode' | 'status' | 'paymentStatus'>) => Promise<string>;
  cancelReservation: (reservationId: string) => void;
  processPayment: (reservationId: string, method: Payment['method']) => Promise<boolean>;
  getReservationQR: (reservationId: string) => Promise<string>;
  getActiveReservations: () => Reservation[];
  getPastReservations: () => Reservation[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const createReservation = async (
    reservation: Omit<Reservation, 'id' | 'qrCode' | 'status' | 'paymentStatus'>
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const qrCode = await QRCode.toDataURL(JSON.stringify({
      id,
      userId: reservation.userId,
      venueId: reservation.venueId,
      date: reservation.date,
      time: reservation.time,
    }));

    const newReservation: Reservation = {
      ...reservation,
      id,
      qrCode,
      status: 'pending',
      paymentStatus: 'unpaid',
    };

    setReservations(prev => [...prev, newReservation]);
    return id;
  };

  const cancelReservation = (reservationId: string) => {
    setReservations(prev =>
      prev.map(res =>
        res.id === reservationId
          ? { ...res, status: 'cancelled' }
          : res
      )
    );
  };

  const processPayment = async (reservationId: string, method: Payment['method']) => {
    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      const newPayment: Payment = {
        id: Math.random().toString(36).substr(2, 9),
        reservationId,
        amount: reservations.find(r => r.id === reservationId)?.amount || 0,
        status: 'completed',
        method,
        timestamp: new Date().toISOString(),
        transactionId: Math.random().toString(36).substr(2, 9),
      };

      setPayments(prev => [...prev, newPayment]);
      setReservations(prev =>
        prev.map(res =>
          res.id === reservationId
            ? { ...res, paymentStatus: 'paid', status: 'confirmed' }
            : res
        )
      );
    }

    return success;
  };

  const getReservationQR = async (reservationId: string) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation?.qrCode) {
      throw new Error('Reservation not found');
    }
    return reservation.qrCode;
  };

  const getActiveReservations = () => {
    return reservations.filter(r =>
      r.status !== 'cancelled' && r.status !== 'completed' &&
      new Date(r.date + ' ' + r.time) >= new Date()
    );
  };

  const getPastReservations = () => {
    return reservations.filter(r =>
      r.status === 'completed' ||
      new Date(r.date + ' ' + r.time) < new Date()
    );
  };

  return (
    <BookingContext.Provider
      value={{
        reservations,
        payments,
        createReservation,
        cancelReservation,
        processPayment,
        getReservationQR,
        getActiveReservations,
        getPastReservations,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
