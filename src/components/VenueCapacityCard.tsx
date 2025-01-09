import React from 'react';
import { Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useSafety } from '../context/SafetyContext';

interface VenueCapacityCardProps {
  venueId: string;
  venueName: string;
  maxCapacity: number;
}

export default function VenueCapacityCard({
  venueId,
  venueName,
  maxCapacity,
}: VenueCapacityCardProps) {
  const { currentCapacity, capacityTrend } = useRealtime();
  const { createAlert } = useSafety();

  const capacity = currentCapacity[venueId] || 0;
  const trend = capacityTrend[venueId] || 'stable';
  const percentage = Math.round((capacity / maxCapacity) * 100);

  const getStatusColor = () => {
    if (percentage >= 90) return 'text-red-500 dark:text-red-400';
    if (percentage >= 75) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-green-500 dark:text-green-400';
  };

  const getStatusBg = () => {
    if (percentage >= 90) return 'bg-red-100 dark:bg-red-900/20';
    if (percentage >= 75) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-green-100 dark:bg-green-900/20';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing':
        return <TrendingUp className="w-4 h-4 text-green-500 transform rotate-180" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500 transform rotate-90" />;
    }
  };

  const handleAlertClick = () => {
    if (percentage >= 90) {
      createAlert({
        type: 'crowd',
        severity: 'high',
        message: `${venueName} is at ${percentage}% capacity. Consider alternative venues.`,
        venueId,
      });
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      onClick={handleAlertClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {venueName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current Capacity
          </p>
        </div>
        <div className={`p-2 rounded-lg ${getStatusBg()}`}>
          <Users className={getStatusColor()} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getStatusColor()}`}>
              {percentage}%
            </span>
            {getTrendIcon()}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {capacity} / {maxCapacity}
          </span>
        </div>

        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
              percentage >= 90
                ? 'bg-red-500'
                : percentage >= 75
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {percentage >= 90 && (
          <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Critical capacity reached
            </span>
          </div>
        )}

        {percentage >= 75 && percentage < 90 && (
          <div className="flex items-center gap-2 text-yellow-500 dark:text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Approaching capacity
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
