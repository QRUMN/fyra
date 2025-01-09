import React, { useState } from 'react';
import {
  Clock,
  Search,
  MapPin,
  Star,
  Filter,
  ChevronDown,
  Utensils,
  Coffee,
  Pizza,
  Sandwich,
  Truck,
  Heart,
  Clock4,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import RatingsReviews from '../components/RatingsReviews';
import FavoritesOrders from '../components/FavoritesOrders';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$';
  deliveryTime: string;
  deliveryFee: number;
  distance: number;
  isOpen: boolean;
  closingTime: string;
  tags: string[];
  featured: boolean;
  promotion?: {
    type: 'discount' | 'freeDelivery' | 'reward';
    description: string;
  };
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  popular: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  allergens?: string[];
  customization?: {
    type: string;
    options: {
      name: string;
      price: number;
    }[];
  }[];
}

export default function LateNiteBites() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'deliveryTime' | 'price'>('rating');

  const restaurants: Restaurant[] = [
    {
      id: '1',
      name: "Night Owl's Diner",
      image: '/images/restaurants/night-owls.jpg',
      cuisine: 'American',
      rating: 4.8,
      reviewCount: 342,
      priceRange: '$$',
      deliveryTime: '25-35',
      deliveryFee: 3.99,
      distance: 1.2,
      isOpen: true,
      closingTime: '4:00 AM',
      tags: ['24/7', 'Breakfast', 'Burgers'],
      featured: true,
      promotion: {
        type: 'discount',
        description: '20% off on orders above $30',
      },
    },
    // More restaurants...
  ];

  const cuisineTypes = [
    { icon: <Pizza />, name: 'Pizza' },
    { icon: <Coffee />, name: 'Cafe' },
    { icon: <Utensils />, name: 'American' },
    { icon: <Sandwich />, name: 'Fast Food' },
    // More cuisines...
  ];

  const getCurrentTimeStatus = (closingTime: string) => {
    const now = new Date();
    const [hours, minutes] = closingTime.split(':');
    const closing = new Date();
    closing.setHours(parseInt(hours), parseInt(minutes));
    
    const diff = closing.getTime() - now.getTime();
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `Closing in ${hoursLeft}h ${minutesLeft}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Late Nite Bites
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Satisfy your midnight cravings
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <button className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="text-gray-600 dark:text-gray-300" size={20} />
            </button>
          </div>
        </div>

        {/* Cuisine Types */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {cuisineTypes.map((cuisine) => (
            <button
              key={cuisine.name}
              onClick={() => setSelectedCuisine(cuisine.name)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                selectedCuisine === cuisine.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {cuisine.icon}
              <span className="text-sm font-medium">{cuisine.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Restaurants */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Featured Tonight
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => r.featured)
              .map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.promotion && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                        {restaurant.promotion.description}
                      </div>
                    )}
                    <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500">
                      <Heart size={20} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{restaurant.cuisine}</span>
                          <span>•</span>
                          <span>{restaurant.priceRange}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-sm">
                        <Star size={16} />
                        {restaurant.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <Truck size={16} />
                          {restaurant.deliveryTime} min
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <MapPin size={16} />
                          {restaurant.distance} mi
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <Clock4 size={16} />
                        {getCurrentTimeStatus(restaurant.closingTime)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* All Restaurants */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Open Now
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm"
              >
                <option value="rating">Top Rated</option>
                <option value="deliveryTime">Fastest Delivery</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => !r.featured)
              .map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.promotion && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                        {restaurant.promotion.description}
                      </div>
                    )}
                    <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500">
                      <Heart size={20} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{restaurant.cuisine}</span>
                          <span>•</span>
                          <span>{restaurant.priceRange}</span>
                          <span>•</span>
                          <span>{restaurant.reviewCount} reviews</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-sm">
                        <Star size={16} />
                        {restaurant.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <Truck size={16} />
                          {restaurant.deliveryTime} min
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <DollarSign size={16} />
                          {restaurant.deliveryFee.toFixed(2)} delivery
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <Clock4 size={16} />
                        {getCurrentTimeStatus(restaurant.closingTime)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Ratings & Reviews
          </h2>
          <RatingsReviews />
        </div>

        {/* Favorites & Recent Orders Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Favorites & Orders
          </h2>
          <FavoritesOrders />
        </div>
      </div>
    </div>
  );
}
