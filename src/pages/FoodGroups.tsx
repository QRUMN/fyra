import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Plus,
  Search,
  MapPin,
  Calendar,
  MessageCircle,
  Image as ImageIcon,
  Settings,
  ChevronRight,
  Filter,
  TrendingUp,
} from 'lucide-react';

interface FoodGroup {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  category: string;
  location: string;
  memberCount: number;
  posts: number;
  events: number;
  isPrivate: boolean;
  isMember: boolean;
  recentActivity: {
    type: 'post' | 'event' | 'review';
    user: string;
    content: string;
    timestamp: string;
  }[];
  upcomingEvents: {
    id: string;
    name: string;
    date: string;
    attendees: number;
  }[];
}

export default function FoodGroups() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = [
    'All Groups',
    'Food Adventures',
    'Cooking Classes',
    'Restaurant Reviews',
    'Recipe Sharing',
    'Wine Tasting',
    'Food Photography',
    'Late Night Eats',
  ];

  const groups: FoodGroup[] = [
    {
      id: '1',
      name: 'NYC Late Night Foodies',
      description: 'Exploring the best late-night food spots in New York City',
      coverImage: '/images/groups/late-night-foodies.jpg',
      category: 'Late Night Eats',
      location: 'New York City',
      memberCount: 1250,
      posts: 324,
      events: 12,
      isPrivate: false,
      isMember: true,
      recentActivity: [
        {
          type: 'post',
          user: 'Sarah K.',
          content: 'Just discovered an amazing 24/7 ramen spot!',
          timestamp: '2025-01-09T04:30:00-05:00',
        },
      ],
      upcomingEvents: [
        {
          id: 'e1',
          name: 'Midnight Food Crawl',
          date: '2025-01-15T23:00:00-05:00',
          attendees: 45,
        },
      ],
    },
    // More groups...
  ];

  const handleJoinGroup = (groupId: string) => {
    // Implementation to join group
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Food Groups
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Connect with fellow food enthusiasts and join exciting culinary adventures
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            Create Group
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative col-span-2">
            <input
              type="text"
              placeholder="Search groups..."
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
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={group.coverImage}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                {group.isPrivate && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-gray-900/70 text-white text-sm rounded-full">
                    Private
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin size={16} />
                      <span>{group.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {group.memberCount} members
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {group.posts} posts
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {group.description}
                </p>

                <div className="mt-6 space-y-4">
                  {/* Recent Activity */}
                  {group.recentActivity.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Recent Activity
                      </h4>
                      {group.recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="font-medium">{activity.user}</span>
                          <span>{activity.content}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upcoming Events */}
                  {group.upcomingEvents.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Upcoming Events
                      </h4>
                      {group.upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-300">
                            {event.name}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    to={`/groups/${group.id}`}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    View Group
                  </Link>
                  {!group.isMember && (
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Join Group
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
