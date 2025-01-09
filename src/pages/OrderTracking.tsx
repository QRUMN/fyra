import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle,
  Truck,
  Package,
  ThumbsUp,
  AlertCircle,
  ChevronDown,
  User,
  Star,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';

interface OrderStatus {
  id: string;
  status: 'preparing' | 'ready' | 'picked_up' | 'on_way' | 'delivered';
  estimatedDelivery: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  restaurant: {
    name: string;
    address: string;
    phone: string;
  };
  driver?: {
    name: string;
    phone: string;
    photo: string;
    rating: number;
    vehicle: {
      model: string;
      color: string;
      plate: string;
    };
  };
  items: {
    name: string;
    quantity: number;
    special?: string;
  }[];
  updates: {
    time: string;
    message: string;
    type: 'info' | 'warning' | 'success';
  }[];
}

export default function OrderTracking() {
  const [order, setOrder] = useState<OrderStatus>({
    id: 'ORD-123456',
    status: 'on_way',
    estimatedDelivery: '2025-01-09T05:45:00-05:00',
    restaurant: {
      name: "Night Owl's Diner",
      address: '123 Late Night St, Foodville',
      phone: '+1 (555) 123-4567',
    },
    driver: {
      name: 'John Driver',
      phone: '+1 (555) 987-6543',
      photo: '/images/drivers/john.jpg',
      rating: 4.9,
      vehicle: {
        model: 'Toyota Prius',
        color: 'Silver',
        plate: 'ABC 123',
      },
    },
    items: [
      {
        name: 'Midnight Burger',
        quantity: 2,
        special: 'No onions, extra cheese',
      },
      {
        name: 'Fries',
        quantity: 1,
      },
      {
        name: 'Chocolate Shake',
        quantity: 1,
      },
    ],
    updates: [
      {
        time: '2025-01-09T05:05:00-05:00',
        message: 'Order confirmed',
        type: 'success',
      },
      {
        time: '2025-01-09T05:15:00-05:00',
        message: 'Restaurant is preparing your order',
        type: 'info',
      },
      {
        time: '2025-01-09T05:30:00-05:00',
        message: 'Driver picked up your order',
        type: 'success',
      },
    ],
  });

  const getStatusStep = () => {
    switch (order.status) {
      case 'preparing':
        return 1;
      case 'ready':
        return 2;
      case 'picked_up':
        return 3;
      case 'on_way':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 0;
    }
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const delivery = new Date(order.estimatedDelivery);
    const diff = delivery.getTime() - now.getTime();
    const minutes = Math.max(0, Math.floor(diff / 1000 / 60));
    return `${minutes} minutes`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Order #{order.id}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Estimated delivery in {getTimeRemaining()}
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                order.status === 'delivered'
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                  : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
              }`}
            >
              {order.status.replace('_', ' ').toUpperCase()}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-blue-500 transition-all duration-500"
              style={{ width: `${(getStatusStep() / 5) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {[
                { icon: Package, label: 'Confirmed' },
                { icon: ThumbsUp, label: 'Preparing' },
                { icon: CheckCircle, label: 'Ready' },
                { icon: Truck, label: 'On the way' },
                { icon: MapPin, label: 'Delivered' },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    index <= getStatusStep()
                      ? 'text-blue-500'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= getStatusStep()
                        ? 'bg-blue-100 dark:bg-blue-900/40'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <step.icon size={20} />
                  </div>
                  <span className="mt-2 text-xs font-medium">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Driver Info */}
        {order.driver && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Driver
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={order.driver.photo}
                alt={order.driver.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {order.driver.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="text-yellow-500" size={16} />
                    <span className="text-gray-600 dark:text-gray-300">
                      {order.driver.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {order.driver.vehicle.color} {order.driver.vehicle.model} •{' '}
                  {order.driver.vehicle.plate}
                </p>
                <div className="flex gap-2">
                  <a
                    href={`tel:${order.driver.phone}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <MessageSquare size={16} />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Details
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Restaurant
              </h3>
              <div className="flex items-start gap-4">
                <MapPin className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-gray-900 dark:text-white">
                    {order.restaurant.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {order.restaurant.address}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Items
              </h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white">
                        {item.quantity}x {item.name}
                      </p>
                      {item.special && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Note: {item.special}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Updates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Updates
          </h2>
          <div className="space-y-4">
            {order.updates.map((update, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg ${
                  update.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : update.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    update.type === 'success'
                      ? 'bg-green-100 dark:bg-green-900/40 text-green-500'
                      : update.type === 'warning'
                      ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-500'
                      : 'bg-blue-100 dark:bg-blue-900/40 text-blue-500'
                  }`}
                >
                  {update.type === 'success' ? (
                    <CheckCircle size={20} />
                  ) : update.type === 'warning' ? (
                    <AlertCircle size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={
                      update.type === 'success'
                        ? 'text-green-800 dark:text-green-200'
                        : update.type === 'warning'
                        ? 'text-yellow-800 dark:text-yellow-200'
                        : 'text-blue-800 dark:text-blue-200'
                    }
                  >
                    {update.message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(update.time).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
