import React, { useState, useEffect } from 'react';
import {
  Navigation,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PhoneCall,
  MessageSquare,
  Shield,
  Battery,
  Zap,
  ThermometerSun,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useSafety } from '../context/SafetyContext';

interface Trip {
  id: string;
  pickupLocation: {
    address: string;
    coordinates: [number, number];
  };
  dropoffLocation: {
    address: string;
    coordinates: [number, number];
  };
  passengers: {
    name: string;
    phone: string;
    rating: number;
  }[];
  status: 'pending' | 'en-route' | 'arrived' | 'completed' | 'cancelled';
  estimatedDuration: number;
  estimatedDistance: number;
  fare: number;
  specialInstructions?: string;
}

interface VehicleStatus {
  batteryLevel: number;
  temperature: number;
  tirePressure: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
  engineStatus: 'good' | 'warning' | 'critical';
  nextService: string;
  mileage: number;
}

export default function DriverDashboard() {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus>({
    batteryLevel: 85,
    temperature: 72,
    tirePressure: {
      frontLeft: 32,
      frontRight: 32,
      rearLeft: 32,
      rearRight: 31,
    },
    engineStatus: 'good',
    nextService: '2025-02-15',
    mileage: 12500,
  });
  const [driverStatus, setDriverStatus] = useState<'online' | 'offline' | 'break'>(
    'online'
  );
  const [earnings, setEarnings] = useState({
    today: 245,
    week: 1250,
    month: 4800,
  });

  const { createAlert } = useSafety();

  // Simulated trips data
  const trips: Trip[] = [
    {
      id: '1',
      pickupLocation: {
        address: '123 Main St, City',
        coordinates: [40.7128, -74.006],
      },
      dropoffLocation: {
        address: '456 Park Ave, City',
        coordinates: [40.7589, -73.9851],
      },
      passengers: [
        {
          name: 'John Smith',
          phone: '(555) 123-4567',
          rating: 4.8,
        },
      ],
      status: 'en-route',
      estimatedDuration: 25,
      estimatedDistance: 3.2,
      fare: 35,
      specialInstructions: 'Please wait at the lobby',
    },
    // More trips...
  ];

  useEffect(() => {
    // Monitor vehicle status
    if (vehicleStatus.tirePressure.frontLeft < 30) {
      createAlert({
        type: 'vehicle',
        severity: 'medium',
        message: 'Low tire pressure detected - Front Left',
      });
    }
  }, [vehicleStatus, createAlert]);

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'en-route':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'arrived':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'completed':
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
      case 'cancelled':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Driver Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your trips and vehicle status
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={driverStatus}
              onChange={(e) =>
                setDriverStatus(e.target.value as 'online' | 'offline' | 'break')
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                driverStatus === 'online'
                  ? 'bg-green-500 text-white'
                  : driverStatus === 'break'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="break">On Break</option>
            </select>
          </div>
        </div>

        {/* Active Trip */}
        {activeTrip && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Current Trip
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  activeTrip.status
                )}`}
              >
                {activeTrip.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trip Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <MapPin className="text-blue-500" size={20} />
                    </div>
                    <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-700" />
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <Navigation className="text-green-500" size={20} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pickup
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {activeTrip.pickupLocation.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dropoff
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {activeTrip.dropoffLocation.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Duration
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {activeTrip.estimatedDuration} min
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Distance
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {activeTrip.estimatedDistance} mi
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fare</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      ${activeTrip.fare}
                    </p>
                  </div>
                </div>
              </div>

              {/* Passenger Info & Actions */}
              <div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <Users className="text-gray-500 dark:text-gray-400" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {activeTrip.passengers[0].name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500" size={16} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {activeTrip.passengers[0].rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      <PhoneCall size={20} />
                      Call
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                      <MessageSquare size={20} />
                      Message
                    </button>
                  </div>
                </div>

                {activeTrip.specialInstructions && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      {activeTrip.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Battery</h3>
              <Battery className="text-gray-400" size={20} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vehicleStatus.batteryLevel}%
                </span>
                <span className="text-sm text-green-500">Charging</span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${vehicleStatus.batteryLevel}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Temperature
              </h3>
              <ThermometerSun className="text-gray-400" size={20} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vehicleStatus.temperature}°F
                </span>
                <span className="text-sm text-blue-500">Normal</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Engine Status
              </h3>
              <Zap className="text-gray-400" size={20} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vehicleStatus.engineStatus === 'good' ? 'Good' : 'Check'}
                </span>
                <span
                  className={`text-sm ${
                    vehicleStatus.engineStatus === 'good'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {vehicleStatus.mileage} mi
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Safety</h3>
              <Shield className="text-gray-400" size={20} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Active
                </span>
                <span className="text-sm text-green-500">All Systems</span>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Earnings Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${earnings.today}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${earnings.week}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${earnings.month}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
