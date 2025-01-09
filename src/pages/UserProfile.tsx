import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Award,
  Users,
  Settings,
  Grid,
  List,
  Camera,
  Star,
  Heart,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import SocialFeed from '../components/SocialFeed';
import RatingsReviews from '../components/RatingsReviews';
import FavoritesOrders from '../components/FavoritesOrders';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  location: string;
  joinDate: string;
  stats: {
    reviews: number;
    photos: number;
    followers: number;
    following: number;
    achievements: number;
  };
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    earnedDate: string;
  }[];
  preferences: {
    cuisines: string[];
    dietaryRestrictions: string[];
    priceRange: string;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  rewards: string[];
}

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState<
    'activity' | 'reviews' | 'photos' | 'achievements' | 'favorites'
  >('activity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(
    null
  );

  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    username: '@johndoe',
    avatar: '/images/avatars/john.jpg',
    coverPhoto: '/images/covers/food-cover.jpg',
    bio: 'Food enthusiast and late-night explorer 🌙 Always on the hunt for the best bites in town!',
    location: 'New York City',
    joinDate: '2024-06',
    stats: {
      reviews: 127,
      photos: 342,
      followers: 1205,
      following: 891,
      achievements: 15,
    },
    badges: [
      {
        id: '1',
        name: 'Night Owl',
        icon: '🦉',
        description: 'Completed 50 late-night orders',
        earnedDate: '2024-12-15',
      },
      {
        id: '2',
        name: 'Foodie Elite',
        icon: '👨‍🍳',
        description: 'Posted 100 food reviews',
        earnedDate: '2024-11-20',
      },
    ],
    preferences: {
      cuisines: ['Italian', 'Japanese', 'Mexican'],
      dietaryRestrictions: ['Vegetarian Options'],
      priceRange: '$$',
    },
  });

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Late Night Explorer',
      description: 'Order from 10 different restaurants after midnight',
      icon: '🌙',
      progress: 7,
      total: 10,
      rewards: ['Special Badge', '500 Points', 'Early Access to New Features'],
    },
    // More achievements...
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Update follower count in real-time
    setProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        followers: isFollowing
          ? prev.stats.followers - 1
          : prev.stats.followers + 1,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80">
        <img
          src={profile.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
                  />
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full" />
                </div>
                <div className="mt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profile.username}
                  </p>
                  <div className="mt-2 flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      Joined {new Date(profile.joinDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleFollow}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isFollowing
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium">
                  Message
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {Object.entries(profile.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {key}
                  </div>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Badges & Achievements
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {profile.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex-shrink-0 w-32 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(badge.earnedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'activity', label: 'Activity', icon: Clock },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'photos', label: 'Photos', icon: Camera },
                { id: 'achievements', label: 'Achievements', icon: Award },
                { id: 'favorites', label: 'Favorites', icon: Heart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon size={20} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'activity' && <SocialFeed />}
            {activeTab === 'reviews' && <RatingsReviews />}
            {activeTab === 'favorites' && <FavoritesOrders />}
            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Photo grid content */}
              </div>
            )}
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 rounded-full text-2xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${(achievement.progress / achievement.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Rewards
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {achievement.rewards.map((reward, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded text-xs"
                          >
                            {reward}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
