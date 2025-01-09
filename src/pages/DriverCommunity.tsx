import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Award,
  ThumbsUp,
  Share2,
  Flag,
  Search,
  Filter,
  Plus,
  Calendar,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    badges: string[];
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  liked: boolean;
  bookmarked: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: 'meetup' | 'training' | 'social';
  registered: boolean;
}

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
}

export default function DriverCommunity() {
  const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'discussions'>(
    'feed'
  );
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent'>('all');

  const posts: Post[] = [
    {
      id: '1',
      author: {
        id: 'u1',
        name: 'John Driver',
        avatar: '👨‍✈️',
        role: 'Senior Driver',
        badges: ['🏆', '⭐'],
      },
      content:
        'Just completed my 1000th ride! Thanks to all the amazing passengers and fellow drivers for the support. Here are my top tips for new drivers...',
      likes: 45,
      comments: 12,
      shares: 5,
      timestamp: '2025-01-09T09:30:00Z',
      tags: ['milestone', 'tips', 'experience'],
      liked: false,
      bookmarked: false,
    },
    // More posts...
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'Driver Appreciation Day',
      description: 'Join us for a day of celebration and recognition!',
      date: '2025-01-15',
      time: '14:00',
      location: 'Central Park',
      attendees: 50,
      type: 'social',
      registered: false,
    },
    // More events...
  ];

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'Best routes during peak hours?',
      author: {
        name: 'Sarah K.',
        avatar: '👩‍✈️',
      },
      category: 'Tips & Tricks',
      replies: 23,
      views: 156,
      lastActivity: '2025-01-09T04:30:00Z',
    },
    // More discussions...
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Driver Community
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Connect, share, and grow with fellow drivers
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="text-gray-600 dark:text-gray-300" size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
          {([
            ['feed', 'Feed'],
            ['events', 'Events'],
            ['discussions', 'Discussions'],
          ] as const).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'feed' && (
              <>
                {/* Create Post */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl">
                      👨‍✈️
                    </div>
                    <input
                      type="text"
                      placeholder="Share your thoughts..."
                      className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Plus size={20} />
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      Post
                    </button>
                  </div>
                </div>

                {/* Posts */}
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl">
                          {post.author.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {post.author.name}
                            </h4>
                            {post.author.badges.map((badge, i) => (
                              <span key={i}>{badge}</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>

                    {post.images && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {post.images.map((image, i) => (
                          <img
                            key={i}
                            src={image}
                            alt=""
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-6">
                        <button
                          className={`flex items-center gap-2 ${
                            post.liked
                              ? 'text-blue-500'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          <Heart size={20} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <MessageCircle size={20} />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Share2 size={20} />
                          {post.shares}
                        </button>
                      </div>
                      <button
                        className={`p-1 rounded-lg ${
                          post.bookmarked
                            ? 'text-blue-500'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        <Bookmark size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center ${
                          event.type === 'social'
                            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-500'
                            : event.type === 'training'
                            ? 'bg-green-100 dark:bg-green-900/40 text-green-500'
                            : 'bg-purple-100 dark:bg-purple-900/40 text-purple-500'
                        }`}
                      >
                        <span className="text-2xl">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="text-sm">
                          {new Date(event.date).toLocaleString('default', {
                            month: 'short',
                          })}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {event.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} />
                            {event.attendees} attending
                          </div>
                        </div>
                      </div>

                      <button
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          event.registered
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {event.registered ? 'Registered' : 'Register'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl">
                          {discussion.author.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {discussion.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600 dark:text-gray-300">
                              by {discussion.author.name}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-500 rounded-full text-xs">
                              {discussion.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare size={16} />
                          {discussion.replies} replies
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          {discussion.views} views
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-3xl">
                  👨‍✈️
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Your Profile
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Senior Driver
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    152
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Posts
                  </div>
                </div>
                <div>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    1.2k
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Following
                  </div>
                </div>
                <div>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    8
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Badges
                  </div>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Trending Topics
              </h3>
              <div className="space-y-4">
                {['#SafeDriving', '#TipsAndTricks', '#CommunitySupport'].map(
                  (topic) => (
                    <div
                      key={topic}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-blue-500">{topic}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {Math.floor(Math.random() * 100)} posts
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                        event.type === 'social'
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-500'
                          : event.type === 'training'
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-500'
                          : 'bg-purple-100 dark:bg-purple-900/40 text-purple-500'
                      }`}
                    >
                      <span className="text-lg font-medium">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-xs">
                        {new Date(event.date).toLocaleString('default', {
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {event.time} • {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
