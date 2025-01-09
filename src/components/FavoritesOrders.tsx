import React, { useState } from 'react';
import {
  Heart,
  Clock,
  Star,
  ChevronRight,
  Search,
  Filter,
  Repeat,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  isFavorite: boolean;
}

interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'delivered' | 'cancelled';
}

export default function FavoritesOrders() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'orders'>('favorites');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('all');

  const favorites: Restaurant[] = [
    {
      id: '1',
      name: "Night Owl's Diner",
      image: '/images/restaurants/night-owls.jpg',
      cuisine: 'American',
      rating: 4.5,
      deliveryTime: '25-35 min',
      deliveryFee: '$2.99',
      distance: '1.2 mi',
      isFavorite: true,
    },
    // More favorites...
  ];

  const recentOrders: Order[] = [
    {
      id: 'ORD-123',
      restaurantId: '1',
      restaurantName: "Night Owl's Diner",
      restaurantImage: '/images/restaurants/night-owls.jpg',
      date: '2025-01-08',
      items: [
        {
          name: 'Midnight Burger',
          quantity: 2,
          price: 12.99,
        },
        {
          name: 'Fries',
          quantity: 1,
          price: 4.99,
        },
      ],
      total: 30.97,
      status: 'delivered',
    },
    // More orders...
  ];

  const toggleFavorite = (restaurantId: string) => {
    // Implementation to toggle favorite status
  };

  const reorderItems = (orderId: string) => {
    // Implementation to reorder items
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'favorites'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'orders'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Recent Orders
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={`Search ${activeTab === 'favorites' ? 'favorites' : 'orders'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        {activeTab === 'favorites' && (
          <select
            value={filterCuisine}
            onChange={(e) => setFilterCuisine(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <option value="all">All Cuisines</option>
            <option value="american">American</option>
            <option value="italian">Italian</option>
            <option value="asian">Asian</option>
            <option value="mexican">Mexican</option>
          </select>
        )}
      </div>

      {/* Content */}
      {activeTab === 'favorites' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(restaurant.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      restaurant.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {restaurant.cuisine}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{restaurant.deliveryTime}</span>
                  <span>{restaurant.deliveryFee}</span>
                  <span>{restaurant.distance}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={order.restaurantImage}
                  alt={order.restaurantName}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        to={`/restaurant/${order.restaurantId}`}
                        className="font-medium text-gray-900 dark:text-white hover:text-blue-500"
                      >
                        {order.restaurantName}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/order/${order.id}`}
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                    >
                      <span className="text-sm">View Details</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  <div className="mt-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600 dark:text-gray-300">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Total: ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => reorderItems(order.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <Repeat size={16} />
                      <span className="text-sm">Reorder</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
