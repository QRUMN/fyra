import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Music,
  Users,
  MapPin,
  Calendar,
  Star,
  Clock,
  TrendingUp,
  Coffee,
} from 'lucide-react';
import { useMatching } from '../context/MatchingContext';
import { useRealtime } from '../context/RealtimeContext';

interface RecommendationProps {
  type?: 'all' | 'venues' | 'events' | 'djs' | 'food' | 'people';
  userId: string;
  maxItems?: number;
  filters?: any;
}

export default function SmartRecommendations({
  type = 'all',
  userId,
  maxItems = 5,
  filters = {},
}: RecommendationProps) {
  const { getUserMatches, getRecommendations } = useMatching();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchScores, setMatchScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const matches = await getUserMatches(userId);
        let items: any[] = [];

        switch (type) {
          case 'all':
            items = [
              ...matches.venues,
              ...matches.events,
              ...matches.djs,
              ...matches.food,
              ...matches.people,
            ];
            break;
          case 'venues':
            items = matches.venues;
            break;
          case 'events':
            items = matches.events;
            break;
          case 'djs':
            items = matches.djs;
            break;
          case 'food':
            items = matches.food;
            break;
          case 'people':
            items = matches.people;
            break;
        }

        // Apply additional filters
        const filtered = items.filter((item) => {
          // Apply custom filters based on the filters prop
          return true; // Placeholder
        });

        // Sort by match score and limit to maxItems
        const sorted = filtered
          .sort((a, b) => matchScores[b.id] - matchScores[a.id])
          .slice(0, maxItems);

        setRecommendations(sorted);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [type, userId, maxItems, filters]);

  const renderRecommendation = (item: any) => {
    const matchScore = matchScores[item.id] || 0;
    const matchPercentage = Math.round(matchScore * 100);

    return (
      <div
        key={item.id}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 relative overflow-hidden"
      >
        {/* Match Score Badge */}
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Sparkles size={14} />
          {matchPercentage}% Match
        </div>

        {/* Content based on type */}
        {item.type === 'venue' && (
          <div className="flex items-start gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin size={14} />
                <span>{item.location}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Music size={14} />
                <span>{item.music.currentGenre}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded text-xs">
                  {item.atmosphere[0]}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.currentOccupancy}/{item.capacity} capacity
                </span>
              </div>
            </div>
          </div>
        )}

        {item.type === 'event' && (
          <div className="flex items-start gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Users size={14} />
                <span>{item.registrations}/{item.capacity} attending</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.theme.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {item.type === 'dj' && (
          <div className="flex items-start gap-4">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Music size={14} />
                <span>{item.genres.join(', ')}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Star size={14} />
                <span>{item.rating} ({item.reviews} reviews)</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.style.map((style: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded text-xs"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {item.type === 'food' && (
          <div className="flex items-start gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Coffee size={14} />
                <span>{item.cuisine}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock size={14} />
                <span>{item.deliveryTime} min</span>
                <span>•</span>
                <span>${item.deliveryFee} delivery</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({item.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Common action buttons */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/${item.type}/${item.id}`}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            View Details
          </Link>
          <div className="flex items-center gap-2">
            <TrendingUp
              size={14}
              className={`${
                matchScore > 0.8
                  ? 'text-green-500'
                  : matchScore > 0.6
                  ? 'text-yellow-500'
                  : 'text-gray-400'
              }`}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {matchScore > 0.8
                ? 'Perfect match'
                : matchScore > 0.6
                ? 'Good match'
                : 'Moderate match'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 h-32 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((item) => renderRecommendation(item))}
    </div>
  );
}
