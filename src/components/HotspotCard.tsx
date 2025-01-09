import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import FriendAvatars from './FriendAvatars';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface Location {
  type: 'event' | 'restaurant';
  name?: string;
  description?: string;
  status?: 'Live' | 'Upcoming' | 'Open Late';
  startTime?: string;
  endTime?: string;
  attendees?: {
    total: number;
    friends: Friend[];
  };
}

interface HotspotCardProps {
  location: Location;
  distance: number;
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}

export default function HotspotCard({ location, distance }: HotspotCardProps) {
  const { isDark } = useTheme();

  const getStatusColors = (status: string) => {
    if (isDark) {
      switch (status) {
        case 'Live':
          return 'bg-brand-lime/20 text-brand-lime';
        case 'Upcoming':
          return 'bg-brand-blue/20 text-brand-blue';
        case 'Open Late':
          return 'bg-brand-red/20 text-brand-red';
        default:
          return 'bg-gray-500/20 text-gray-300';
      }
    }
    switch (status) {
      case 'Live':
        return 'bg-brand-lime/20 text-brand-dark';
      case 'Upcoming':
        return 'bg-brand-blue/20 text-brand-dark';
      case 'Open Late':
        return 'bg-brand-red/20 text-brand-dark';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-4 h-4">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-red dark:bg-brand-lime rounded-full transform scale-75" />
        <div className="absolute top-0 left-0 w-full h-full bg-brand-red/30 dark:bg-brand-lime/30 rounded-full animate-ping" />
      </div>

      <div className={`w-[240px] ${
        isDark ? 'bg-brand-dark/90' : 'bg-white/95'
      } backdrop-blur-sm rounded-2xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover overflow-hidden transition-shadow`}>
        <div className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold text-sm ${
              isDark ? 'text-white' : 'text-brand-dark'
            } leading-tight`}>
              {location.name}
            </h3>
            {location.status && (
              <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full whitespace-nowrap ${
                getStatusColors(location.status)
              }`}>
                {location.status}
              </span>
            )}
          </div>

          <p className={`text-xs ${
            isDark ? 'text-brand-blue' : 'text-brand-olive'
          } leading-snug line-clamp-2`}>
            {location.description}
          </p>

          <div className={`flex items-center gap-3 text-xs ${
            isDark ? 'text-brand-blue' : 'text-brand-olive'
          }`}>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="flex-shrink-0" />
              <span>{distance.toFixed(1)} mi</span>
            </div>

            {location.type === 'event' && location.startTime && (
              <div className="flex items-center gap-1">
                <Clock size={12} className="flex-shrink-0" />
                <span>{formatTime(location.startTime)}</span>
              </div>
            )}

            {location.attendees && (
              <div className="flex items-center gap-1">
                <Users size={12} className="flex-shrink-0" />
                <span>{location.attendees.total}+</span>
              </div>
            )}
          </div>

          {location.type === 'event' && location.attendees?.friends.length > 0 && (
            <div className="pt-1">
              <FriendAvatars friends={location.attendees.friends} />
            </div>
          )}

          <button className={`w-full px-3 py-1.5 ${
            isDark 
              ? 'bg-brand-lime hover:bg-brand-lime/90 text-brand-dark' 
              : 'bg-brand-red hover:bg-brand-red/90 text-white'
          } text-xs font-medium rounded-lg transition-colors`}>
            {location.type === 'event' ? 'Get Tickets' : 'View Menu'}
          </button>
        </div>
      </div>
    </div>
  );
}