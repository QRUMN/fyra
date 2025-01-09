import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Star,
  Clock,
  TrendingUp,
  Users,
  Coffee,
  Utensils,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import SocialShare from './SocialShare';

interface Activity {
  id: string;
  type: 'review' | 'checkin' | 'photo' | 'achievement' | 'recommendation';
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  location: {
    name: string;
    address: string;
    coordinates: [number, number];
  };
  content: {
    text?: string;
    rating?: number;
    images?: string[];
    achievement?: {
      title: string;
      icon: string;
      description: string;
    };
  };
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
  isLiked: boolean;
}

export default function SocialFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<'all' | 'trending' | 'following'>('all');
  const [timeRange, setTimeRange] = useState<'now' | '24h' | 'week'>('now');
  const { subscribeToArea } = useRealtime();

  useEffect(() => {
    // Subscribe to real-time updates for the area
    const unsubscribe = subscribeToArea({
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 5000, // meters
      callback: (update) => {
        // Handle real-time updates
        setActivities((prev) => [update, ...prev]);
      },
    });

    return () => unsubscribe();
  }, []);

  const getTimeAgo = (timestamp: string) => {
    const now = new Date('2025-01-09T05:28:12-05:00');
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleLike = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              isLiked: !activity.isLiked,
              metrics: {
                ...activity.metrics,
                likes: activity.isLiked
                  ? activity.metrics.likes - 1
                  : activity.metrics.likes + 1,
              },
            }
          : activity
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => setFilter('trending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'trending'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setFilter('following')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'following'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Following
          </button>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <option value="now">Happening Now</option>
          <option value="24h">Last 24 Hours</option>
          <option value="week">This Week</option>
        </select>
      </div>

      {/* Activity Feed */}
      <div className="space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${activity.userId}`}>
                  <img
                    src={activity.userAvatar}
                    alt={activity.userName}
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
                <div>
                  <Link
                    to={`/profile/${activity.userId}`}
                    className="font-medium text-gray-900 dark:text-white hover:text-blue-500"
                  >
                    {activity.userName}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{getTimeAgo(activity.timestamp)}</span>
                    <span>•</span>
                    <MapPin size={14} />
                    <span>{activity.location.name}</span>
                  </div>
                </div>
              </div>
              <SocialShare
                type={activity.type}
                itemId={activity.id}
                title={activity.location.name}
                description={activity.content.text || ''}
                url={`https://fyra.app/activity/${activity.id}`}
              />
            </div>

            {/* Content */}
            <div className="mt-4">
              {activity.type === 'review' && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < (activity.content.rating || 0)
                            ? 'text-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill={i < (activity.content.rating || 0) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{activity.content.text}</p>
                </div>
              )}

              {activity.content.images && activity.content.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {activity.content.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ))}
                </div>
              )}

              {activity.type === 'achievement' && activity.content.achievement && (
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 rounded-full">
                    <img
                      src={activity.content.achievement.icon}
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {activity.content.achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.content.achievement.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-6">
              <button
                onClick={() => handleLike(activity.id)}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500"
              >
                <Heart
                  className={activity.isLiked ? 'fill-current text-red-500' : ''}
                  size={20}
                />
                <span>{activity.metrics.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-600">
                <MessageCircle size={20} />
                <span>{activity.metrics.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-600">
                <Share2 size={20} />
                <span>{activity.metrics.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
