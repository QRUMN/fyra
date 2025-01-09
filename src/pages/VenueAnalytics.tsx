import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Filter,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useBooking } from '../context/BookingContext';

type TimeRange = '24h' | '7d' | '30d' | '90d';
type MetricType = 'revenue' | 'attendance' | 'bookings' | 'capacity';

interface Metric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: typeof BarChart3;
}

export default function VenueAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const { venueMetrics, crowdData } = useRealtime();
  const { bookingStats } = useBooking();

  const metrics: Metric[] = [
    {
      label: 'Total Revenue',
      value: 52890,
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Total Attendance',
      value: 15234,
      change: 8.3,
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Bookings',
      value: 423,
      change: -2.1,
      trend: 'down',
      icon: Calendar,
    },
    {
      label: 'Avg. Capacity',
      value: 78,
      change: 5.2,
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case '24h':
        return 'Last 24 Hours';
      case '7d':
        return 'Last 7 Days';
      case '30d':
        return 'Last 30 Days';
      case '90d':
        return 'Last 90 Days';
    }
  };

  const formatValue = (value: number, type: MetricType) => {
    switch (type) {
      case 'revenue':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'capacity':
        return `${value}%`;
      default:
        return new Intl.NumberFormat('en-US').format(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your venue's performance and trends
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(['24h', '7d', '30d', '90d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <metric.icon className="w-6 h-6 text-blue-500" />
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up'
                      ? 'text-green-500'
                      : metric.trend === 'down'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(metric.change)}%
                </span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {metric.label}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatValue(metric.value, metric.label.toLowerCase().includes('revenue') ? 'revenue' : metric.label.toLowerCase().includes('capacity') ? 'capacity' : 'attendance')}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Attendance Over Time
              </h3>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Filter className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              [Attendance Chart Placeholder]
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Breakdown
              </h3>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Filter className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              [Revenue Chart Placeholder]
            </div>
          </div>
        </div>

        {/* Popular Times */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Popular Times
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Based on historical attendance data
              </p>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
                  {day}
                </h4>
                <div className="space-y-1">
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <div
                      key={hour}
                      className={`h-1 rounded-full ${
                        hour >= 20 && hour <= 23
                          ? 'bg-blue-500'
                          : hour >= 17 && hour <= 19
                          ? 'bg-blue-300'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      title={`${hour}:00`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Peak Hours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-300 rounded-full" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Busy Hours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Regular Hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
