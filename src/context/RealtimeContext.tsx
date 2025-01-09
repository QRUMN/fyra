import React, { createContext, useContext, useState, useEffect } from 'react';

interface VenueCapacity {
  id: string;
  currentCapacity: number;
  maxCapacity: number;
  crowdDensity: 'low' | 'medium' | 'high';
  waitTime: number; // in minutes
  predictedPeakTime: string;
}

interface Notification {
  id: string;
  type: 'alert' | 'message' | 'event' | 'booking' | 'safety' | 'reward';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

interface RealtimeContextType {
  venueCapacities: Record<string, VenueCapacity>;
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  updateVenueCapacity: (venueId: string, capacity: Partial<VenueCapacity>) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [venueCapacities, setVenueCapacities] = useState<Record<string, VenueCapacity>>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updateVenueCapacity = (venueId: string, capacity: Partial<VenueCapacity>) => {
    setVenueCapacities(prev => ({
      ...prev,
      [venueId]: { ...prev[venueId], ...capacity },
    }));
  };

  // Mock real-time updates (replace with actual WebSocket implementation)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random capacity updates
      Object.keys(venueCapacities).forEach(venueId => {
        const currentCapacity = Math.floor(Math.random() * 100);
        updateVenueCapacity(venueId, { currentCapacity });
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [venueCapacities]);

  return (
    <RealtimeContext.Provider
      value={{
        venueCapacities,
        notifications,
        unreadCount,
        addNotification,
        markNotificationAsRead,
        updateVenueCapacity,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
}

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};
