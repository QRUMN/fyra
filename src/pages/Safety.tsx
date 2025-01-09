import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  Car,
  Users,
  Phone,
  Plus,
  MapPin,
  Bell,
  X,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export default function Safety() {
  const {
    alerts,
    safeRides,
    emergencyContacts,
    createAlert,
    resolveAlert,
    requestSafeRide,
    addEmergencyContact,
    removeEmergencyContact,
    triggerEmergency,
  } = useSafety();

  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone || !newContact.relationship) return;
    
    addEmergencyContact(newContact);
    setNewContact({ name: '', phone: '', relationship: '' });
    setShowAddContact(false);
  };

  const handleSafeRide = async () => {
    // In a real app, we would get the user's current location
    const pickup = {
      address: '123 Current St',
      lat: 40.7128,
      lng: -74.0060,
    };

    const dropoff = {
      address: '456 Home Ave',
      lat: 40.7589,
      lng: -73.9851,
    };

    await requestSafeRide(pickup, dropoff);
  };

  const handleEmergency = () => {
    // In a real app, we would get the user's current location
    triggerEmergency({
      lat: 40.7128,
      lng: -74.0060,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Emergency Button */}
        <div className="bg-red-500 p-6 rounded-xl shadow-lg text-center">
          <button
            onClick={handleEmergency}
            className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors mx-auto"
          >
            <Shield className="w-16 h-16 text-red-500" />
          </button>
          <h2 className="mt-4 text-xl font-bold text-white">Emergency Assistance</h2>
          <p className="mt-2 text-red-100">
            Tap for immediate emergency assistance
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Safe Ride */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Safe Ride
              </h3>
              <Car className="text-blue-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Request a safe ride home with trusted drivers
            </p>
            <button
              onClick={handleSafeRide}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Request Ride
            </button>
          </div>

          {/* Active Alerts */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Alerts
              </h3>
              <AlertTriangle className="text-yellow-500" />
            </div>
            <div className="space-y-3">
              {alerts.filter(a => a.active).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    alert.severity === 'critical'
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                      : alert.severity === 'high'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                      : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                  }`}
                >
                  <span>{alert.message}</span>
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="p-1 hover:bg-white/20 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Crowd Density */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Crowd Density
              </h3>
              <Users className="text-purple-500" />
            </div>
            <div className="space-y-3">
              {alerts
                .filter(a => a.type === 'crowd' && a.active)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-lg"
                  >
                    {alert.message}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Emergency Contacts
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                These contacts will be notified in case of emergency
              </p>
            </div>
            <button
              onClick={() => setShowAddContact(true)}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Plus className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <Phone className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {contact.relationship} • {contact.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeEmergencyContact(contact.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md m-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Emergency Contact
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({
                    ...prev,
                    relationship: e.target.value
                  }))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
