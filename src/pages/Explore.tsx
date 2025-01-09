import React, { useState, useEffect } from 'react';
import { Filter, Calendar, Music2, Utensils, Users } from 'lucide-react';
import MapHero from '../components/MapHero';
import VenueCapacityCard from '../components/VenueCapacityCard';
import { useTheme } from '../context/ThemeContext';
import { useRealtime } from '../context/RealtimeContext';

type FilterType = 'all' | 'events' | 'venues' | 'restaurants' | 'friends';

// Mock venue data
const mockVenues = [
  { id: 'venue1', name: 'The Blue Room' },
  { id: 'venue2', name: 'Skyline Lounge' },
  { id: 'venue3', name: 'The Underground' },
];

export default function Explore() {
  const { isDark } = useTheme();
  const { updateVenueCapacity } = useRealtime();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [dateFilter, setDateFilter] = useState('tonight');

  // Initialize mock venue capacities
  useEffect(() => {
    mockVenues.forEach(venue => {
      updateVenueCapacity(venue.id, {
        currentCapacity: Math.floor(Math.random() * 100),
        maxCapacity: 100,
        crowdDensity: 'medium',
        waitTime: Math.floor(Math.random() * 30),
        predictedPeakTime: '11:30 PM'
      });
    });
  }, []);

  const filters: { type: FilterType; label: string; icon: React.ReactNode }[] = [
    { type: 'all', label: 'All', icon: <Filter size={18} /> },
    { type: 'events', label: 'Events', icon: <Music2 size={18} /> },
    { type: 'venues', label: 'Venues', icon: <Calendar size={18} /> },
    { type: 'restaurants', label: 'Restaurants', icon: <Utensils size={18} /> },
    { type: 'friends', label: 'Friends', icon: <Users size={18} /> },
  ];

  const dateFilters = ['tonight', 'tomorrow', 'this weekend', 'next week'];

  return (
    <div className="h-screen pt-16 grid grid-cols-1 md:grid-cols-[320px,1fr]">
      {/* Sidebar */}
      <div className="bg-white dark:bg-[#4C4E46]/80 p-4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        {/* Filters */}
        <div className="space-y-4">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeFilter === type
                    ? 'bg-[#FF715B] text-white'
                    : 'bg-gray-100 dark:bg-[#4C4E46] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#4C4E46]/70'
                  }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Date Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">When</h3>
            <div className="flex flex-wrap gap-2">
              {dateFilters.map((date) => (
                <button
                  key={date}
                  onClick={() => setDateFilter(date)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all
                    ${dateFilter === date
                      ? 'bg-[#FF715B] text-white'
                      : 'bg-gray-100 dark:bg-[#4C4E46] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#4C4E46]/70'
                    }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Venue Capacities */}
          <div className="space-y-4 mt-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Venue Status</h3>
            <div className="space-y-4">
              {mockVenues.map(venue => (
                <VenueCapacityCard
                  key={venue.id}
                  venueId={venue.id}
                  venueName={venue.name}
                />
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Music Genre */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Music Genre</h3>
              <div className="space-y-2">
                {['House', 'Hip-Hop', 'R&B', 'Techno', 'Latin', 'Dance', 'Afrobeat'].map((genre) => (
                  <label key={genre} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-[#FF715B] focus:ring-[#FF715B]" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</h3>
              <div className="space-y-2">
                {['Free', '$', '$$', '$$$'].map((price) => (
                  <label key={price} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-[#FF715B] focus:ring-[#FF715B]" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-full">
        <MapHero />
      </div>
    </div>
  );
}