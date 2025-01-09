import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRealtime } from './RealtimeContext';

interface SafetyAlert {
  id: string;
  type: 'emergency' | 'crowd' | 'weather' | 'transport' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  venueId?: string;
  timestamp: string;
  active: boolean;
}

interface SafeRide {
  id: string;
  userId: string;
  driverId?: string;
  status: 'requested' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  dropoff: {
    address: string;
    lat: number;
    lng: number;
  };
  timestamp: string;
  estimatedArrival?: string;
  vehicleInfo?: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  };
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface SafetyContextType {
  alerts: SafetyAlert[];
  safeRides: SafeRide[];
  emergencyContacts: EmergencyContact[];
  createAlert: (alert: Omit<SafetyAlert, 'id' | 'timestamp' | 'active'>) => void;
  resolveAlert: (alertId: string) => void;
  requestSafeRide: (pickup: SafeRide['pickup'], dropoff: SafeRide['dropoff']) => Promise<string>;
  cancelSafeRide: (rideId: string) => void;
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  removeEmergencyContact: (contactId: string) => void;
  triggerEmergency: (location: { lat: number; lng: number }) => void;
  getCrowdDensityWarnings: () => SafetyAlert[];
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export function SafetyProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useRealtime();
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [safeRides, setSafeRides] = useState<SafeRide[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

  // Monitor venue capacities for crowd density warnings
  useEffect(() => {
    // This would be replaced with real venue capacity monitoring
    const interval = setInterval(() => {
      // Simulate crowd density checks
      const crowdCheck = Math.random();
      if (crowdCheck > 0.8) {
        createAlert({
          type: 'crowd',
          severity: 'high',
          message: 'High crowd density detected at venue. Please be cautious.',
          venueId: 'venue1',
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const createAlert = (alert: Omit<SafetyAlert, 'id' | 'timestamp' | 'active'>) => {
    const newAlert: SafetyAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      active: true,
    };

    setAlerts(prev => [...prev, newAlert]);

    // Send notification
    addNotification({
      type: 'safety',
      title: `Safety Alert: ${alert.type}`,
      message: alert.message,
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, active: false }
          : alert
      )
    );
  };

  const requestSafeRide = async (
    pickup: SafeRide['pickup'],
    dropoff: SafeRide['dropoff']
  ) => {
    const newRide: SafeRide = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'current-user', // Replace with actual user ID
      status: 'requested',
      pickup,
      dropoff,
      timestamp: new Date().toISOString(),
    };

    setSafeRides(prev => [...prev, newRide]);
    
    // Simulate driver assignment
    setTimeout(() => {
      setSafeRides(prev =>
        prev.map(ride =>
          ride.id === newRide.id
            ? {
                ...ride,
                status: 'assigned',
                driverId: 'driver-123',
                estimatedArrival: new Date(Date.now() + 5 * 60000).toISOString(),
                vehicleInfo: {
                  make: 'Toyota',
                  model: 'Camry',
                  color: 'Silver',
                  licensePlate: 'ABC123',
                },
              }
            : ride
        )
      );

      addNotification({
        type: 'alert',
        title: 'Safe Ride Assigned',
        message: 'Your driver is on the way. ETA: 5 minutes',
      });
    }, 2000);

    return newRide.id;
  };

  const cancelSafeRide = (rideId: string) => {
    setSafeRides(prev =>
      prev.map(ride =>
        ride.id === rideId
          ? { ...ride, status: 'cancelled' }
          : ride
      )
    );
  };

  const addEmergencyContact = (contact: Omit<EmergencyContact, 'id'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEmergencyContacts(prev => [...prev, newContact]);
  };

  const removeEmergencyContact = (contactId: string) => {
    setEmergencyContacts(prev =>
      prev.filter(contact => contact.id !== contactId)
    );
  };

  const triggerEmergency = (location: { lat: number; lng: number }) => {
    // Create high-priority emergency alert
    createAlert({
      type: 'emergency',
      severity: 'critical',
      message: 'Emergency assistance requested. Authorities have been notified.',
    });

    // Notify emergency contacts
    emergencyContacts.forEach(contact => {
      // In a real app, this would send SMS/calls to emergency contacts
      console.log(`Notifying emergency contact: ${contact.name}`);
    });

    // Simulate contacting emergency services
    addNotification({
      type: 'safety',
      title: 'Emergency Services Notified',
      message: 'Help is on the way. Stay calm and stay where you are.',
    });
  };

  const getCrowdDensityWarnings = () => {
    return alerts.filter(
      alert => alert.active && alert.type === 'crowd' && alert.severity !== 'low'
    );
  };

  return (
    <SafetyContext.Provider
      value={{
        alerts,
        safeRides,
        emergencyContacts,
        createAlert,
        resolveAlert,
        requestSafeRide,
        cancelSafeRide,
        addEmergencyContact,
        removeEmergencyContact,
        triggerEmergency,
        getCrowdDensityWarnings,
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
}

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
