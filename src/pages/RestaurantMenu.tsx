import React, { useState } from 'react';
import {
  Star,
  Clock,
  MapPin,
  DollarSign,
  Info,
  Plus,
  Minus,
  AlertCircle,
  Heart,
  Share2,
  ChevronDown,
  Truck,
  Leaf,
  Flame,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  popular: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  allergens?: string[];
  customization?: {
    type: string;
    required?: boolean;
    multiple?: boolean;
    options: {
      name: string;
      price: number;
    }[];
  }[];
}

interface RestaurantDetails {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$';
  deliveryTime: string;
  deliveryFee: number;
  distance: number;
  address: string;
  isOpen: boolean;
  closingTime: string;
  tags: string[];
  promotion?: {
    type: 'discount' | 'freeDelivery' | 'reward';
    description: string;
  };
}

export default function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Popular');
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const restaurant: RestaurantDetails = {
    id: '1',
    name: "Night Owl's Diner",
    image: '/images/restaurants/night-owls.jpg',
    coverImage: '/images/restaurants/night-owls-cover.jpg',
    cuisine: 'American',
    rating: 4.8,
    reviewCount: 342,
    priceRange: '$$',
    deliveryTime: '25-35',
    deliveryFee: 3.99,
    distance: 1.2,
    address: '123 Late Night St, Foodville',
    isOpen: true,
    closingTime: '4:00 AM',
    tags: ['24/7', 'Breakfast', 'Burgers'],
    promotion: {
      type: 'discount',
      description: '20% off on orders above $30',
    },
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Midnight Burger',
      description: 'Angus beef patty with caramelized onions, bacon, and special sauce',
      price: 14.99,
      image: '/images/menu/midnight-burger.jpg',
      category: 'Burgers',
      popular: true,
      customization: [
        {
          type: 'Cheese',
          required: true,
          options: [
            { name: 'American', price: 0 },
            { name: 'Cheddar', price: 0 },
            { name: 'Swiss', price: 1 },
          ],
        },
        {
          type: 'Extras',
          multiple: true,
          options: [
            { name: 'Extra Patty', price: 4 },
            { name: 'Avocado', price: 2 },
            { name: 'Fried Egg', price: 2 },
          ],
        },
      ],
    },
    // More menu items...
  ];

  const categories = ['Popular', 'Burgers', 'Sandwiches', 'Sides', 'Drinks', 'Desserts'];

  const addToCart = (item: MenuItem) => {
    if (item.customization && item.customization.length > 0) {
      setCustomizingItem(item);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, { item, quantity }) => total + item.price * quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Restaurant Header */}
      <div className="relative h-64">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {restaurant.name}
                </h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{restaurant.rating}</span>
                    <span>({restaurant.reviewCount})</span>
                  </div>
                  <span>•</span>
                  <span>{restaurant.cuisine}</span>
                  <span>•</span>
                  <span>{restaurant.priceRange}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              {menuItems
                .filter(
                  (item) =>
                    selectedCategory === 'Popular'
                      ? item.popular
                      : item.category === selectedCategory
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-4"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.vegetarian && (
                            <Leaf className="text-green-500" size={16} />
                          )}
                          {item.spicy && (
                            <Flame className="text-red-500" size={16} />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Cart */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Your Order
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-gray-900 dark:text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-300">
                        Subtotal
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-300">
                        Delivery Fee
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ${restaurant.deliveryFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">
                        ${(getCartTotal() + restaurant.deliveryFee).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                    Checkout
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {restaurant.deliveryTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck size={16} />
                    {restaurant.distance} mi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Customize {customizingItem.name}
            </h3>
            {/* Add customization options here */}
          </div>
        </div>
      )}
    </div>
  );
}
