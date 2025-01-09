import React, { useState, useEffect } from 'react';
import { Bell, X, Calendar, AlertTriangle, Users, Car } from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useBooking } from '../context/BookingContext';
import { useSafety } from '../context/SafetyContext';

type NotificationType = 'booking' | 'safety' | 'social';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { bookingUpdates } = useBooking();
  const { safetyAlerts, crowdAlerts } = useSafety();
  const { realtimeEvents } = useRealtime();

  useEffect(() => {
    // Combine and sort notifications from different sources
    const allNotifications = [
      ...bookingUpdates.map((update) => ({
        id: update.id,
        type: 'booking' as NotificationType,
        title: 'Booking Update',
        message: update.message,
        timestamp: new Date(update.timestamp),
        read: false,
        priority: update.status === 'confirmed' ? 'high' : 'medium',
        action: update.status === 'confirmed' ? {
          label: 'View Booking',
          onClick: () => {/* Navigate to booking details */}
        } : undefined
      })),
      ...safetyAlerts.map((alert) => ({
        id: alert.id,
        type: 'safety' as NotificationType,
        title: 'Safety Alert',
        message: alert.message,
        timestamp: new Date(alert.timestamp),
        read: false,
        priority: 'high',
        action: {
          label: 'Take Action',
          onClick: () => {/* Navigate to safety dashboard */}
        }
      })),
      ...crowdAlerts.map((alert) => ({
        id: alert.id,
        type: 'safety' as NotificationType,
        title: 'Crowd Alert',
        message: alert.message,
        timestamp: new Date(alert.timestamp),
        read: false,
        priority: 'medium',
        action: {
          label: 'View Venue',
          onClick: () => {/* Navigate to venue details */}
        }
      }))
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setNotifications(allNotifications);
  }, [bookingUpdates, safetyAlerts, crowdAlerts]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-5 h-5" />;
      case 'safety':
        return <AlertTriangle className="w-5 h-5" />;
      case 'social':
        return <Users className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityStyles = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-50"
      >
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-64px)]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <Bell className="w-12 h-12 mb-4" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${
                        notification.read ? 'opacity-75' : ''
                      } ${getPriorityStyles(notification.priority)}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            notification.type === 'safety'
                              ? 'text-red-500'
                              : notification.type === 'booking'
                              ? 'text-blue-500'
                              : 'text-purple-500'
                          }`}
                        >
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(notification.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-600 dark:text-gray-300">
                            {notification.message}
                          </p>
                          {notification.action && (
                            <button
                              onClick={notification.action.onClick}
                              className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
