import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Tag,
  Heart,
  Share2,
  Filter,
  Search,
  Plus,
  ChevronRight,
  Star,
  Utensils,
} from 'lucide-react';
import SocialShare from '../components/SocialShare';

interface FoodEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    coordinates: [number, number];
  };
  organizer: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    events: number;
  };
  category: string;
  tags: string[];
  price: number;
  capacity: number;
  attendees: number;
  isPrivate: boolean;
  isSaved: boolean;
  menu?: {
    items: {
      name: string;
      description: string;
      dietaryInfo?: string[];
    }[];
  };
  highlights: string[];
}

export default function FoodEvents() {
  const [view, setView] = useState<'grid' | 'calendar'>('grid');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2025-01-09T05:30:57-05:00'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = [
    'All Events',
    'Pop-up Dinners',
    'Food Festivals',
    'Cooking Classes',
    'Wine Tastings',
    'Food Tours',
    'Chef\'s Table',
    'Late Night Specials',
  ];

  const events: FoodEvent[] = [
    {
      id: '1',
      title: 'Midnight Sushi Experience',
      description: 'Join us for an exclusive late-night sushi making and tasting experience',
      image: '/images/events/sushi-night.jpg',
      date: '2025-01-15',
      time: '23:00',
      location: {
        name: 'Sushi Master Studio',
        address: '456 Foodie Ave, New York',
        coordinates: [40.7128, -74.006],
      },
      organizer: {
        id: 'org1',
        name: 'Chef Tanaka',
        avatar: '/images/avatars/chef-tanaka.jpg',
        rating: 4.9,
        events: 45,
      },
      category: 'Cooking Classes',
      tags: ['Sushi', 'Japanese', 'Hands-on', 'Late Night'],
      price: 85,
      capacity: 12,
      attendees: 8,
      isPrivate: false,
      isSaved: false,
      menu: {
        items: [
          {
            name: 'Signature Roll Set',
            description: 'Learn to make 3 signature rolls',
            dietaryInfo: ['Gluten-free available', 'Vegetarian options'],
          },
        ],
      },
      highlights: [
        'Professional sushi chef instruction',
        'All ingredients and tools provided',
        'Take home your creations',
        'Sake pairing included',
      ],
    },
    // More events...
  ];

  const handleSaveEvent = (eventId: string) => {
    // Implementation to save event
  };

  const handleRegister = (eventId: string) => {
    // Implementation to register for event
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Food Events
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Discover unique culinary experiences and food adventures
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            Host Event
          </button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative md:col-span-2">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`flex-1 px-4 py-2 rounded-lg ${
                view === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex-1 px-4 py-2 rounded-lg ${
                view === 'calendar'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleSaveEvent(event.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      event.isSaved ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                </button>
                {event.isPrivate && (
                  <div className="absolute top-4 left-4 px-2 py-1 bg-gray-900/70 text-white text-sm rounded-full">
                    Private
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${event.price}
                    </span>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      per person
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {event.organizer.name}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        <span>{event.organizer.rating}</span>
                        <span>•</span>
                        <span>{event.organizer.events} events</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} />
                    <span>{event.location.name}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Users size={16} />
                    <span>
                      {event.attendees}/{event.capacity} spots
                    </span>
                  </div>
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
