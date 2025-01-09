import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  DollarSign,
  Star,
  Users,
  Navigation,
  Shield,
  Award,
  ThumbsUp,
  Zap,
  Calendar,
  Filter,
  Download,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';

interface PerformanceMetric {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  target: number;
}

interface ServiceQuality {
  rating: number;
  totalReviews: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recentReviews: {
    id: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface SafetyScore {
  overall: number;
  categories: {
    braking: number;
    acceleration: number;
    cornering: number;
    speeding: number;
    distraction: number;
  };
  incidents: {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high';
    date: string;
    description: string;
  }[];
}

export default function DriverAnalytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>(
    'month'
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const metrics: PerformanceMetric[] = [
    {
      label: 'Trips Completed',
      value: 128,
      previousValue: 115,
      change: 11.3,
      trend: 'up',
      target: 130,
    },
    {
      label: 'Average Rating',
      value: 4.8,
      previousValue: 4.7,
      change: 2.1,
      trend: 'up',
      target: 4.9,
    },
    {
      label: 'Acceptance Rate',
      value: 92,
      previousValue: 88,
      change: 4.5,
      trend: 'up',
      target: 95,
    },
    {
      label: 'Completion Rate',
      value: 98,
      previousValue: 97,
      change: 1.0,
      trend: 'up',
      target: 99,
    },
  ];

  const serviceQuality: ServiceQuality = {
    rating: 4.8,
    totalReviews: 450,
    breakdown: {
      5: 350,
      4: 80,
      3: 15,
      2: 3,
      1: 2,
    },
    recentReviews: [
      {
        id: '1',
        rating: 5,
        comment: 'Excellent service, very professional driver',
        date: '2025-01-08',
      },
      // More reviews...
    ],
  };

  const safetyScore: SafetyScore = {
    overall: 95,
    categories: {
      braking: 94,
      acceleration: 96,
      cornering: 95,
      speeding: 98,
      distraction: 92,
    },
    incidents: [
      {
        id: '1',
        type: 'Hard Braking',
        severity: 'low',
        date: '2025-01-08',
        description: 'Sudden stop due to pedestrian',
      },
      // More incidents...
    ],
  };

  const formatMetricValue = (metric: PerformanceMetric) => {
    if (metric.label.includes('Rating')) {
      return metric.value.toFixed(1);
    }
    if (metric.label.includes('Rate')) {
      return `${Math.round(metric.value)}%`;
    }
    return Math.round(metric.value).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Performance Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track and analyze your driving performance
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            <button className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Download className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 dark:text-gray-300 font-medium">
                  {metric.label}
                </h3>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up'
                      ? 'text-green-500'
                      : metric.trend === 'down'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {metric.trend === 'up' ? '+' : ''}
                  {metric.change}%
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatMetricValue(metric)}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Target: {formatMetricValue({ ...metric, value: metric.target })}
                  </span>
                  <span className="text-blue-500">
                    Previous: {formatMetricValue({ ...metric, value: metric.previousValue })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Quality */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Service Quality
            </h3>
            <div className="flex items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {serviceQuality.rating}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(serviceQuality.rating)
                          ? 'text-yellow-500'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill={i < Math.floor(serviceQuality.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {serviceQuality.totalReviews} reviews
                </p>
              </div>
              <div className="flex-1">
                {Object.entries(serviceQuality.breakdown)
                  .reverse()
                  .map(([rating, count]) => (
                    <div key={rating} className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-4">
                        {rating}
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500"
                          style={{
                            width: `${(count / serviceQuality.totalReviews) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                        {Math.round((count / serviceQuality.totalReviews) * 100)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="space-y-4">
              {serviceQuality.recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Score */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Safety Score
            </h3>
            <div className="flex items-center justify-between mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {safetyScore.overall}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Overall Score
                </p>
              </div>
              <Shield
                className={`w-12 h-12 ${
                  safetyScore.overall >= 90
                    ? 'text-green-500'
                    : safetyScore.overall >= 80
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              />
            </div>
            <div className="space-y-4">
              {Object.entries(safetyScore.categories).map(([category, score]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        score >= 90
                          ? 'text-green-500'
                          : score >= 80
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {score}
                    </span>
                  </div>
                  <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full ${
                        score >= 90
                          ? 'bg-green-500'
                          : score >= 80
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Incidents
          </h3>
          <div className="space-y-4">
            {safetyScore.incidents.map((incident) => (
              <div
                key={incident.id}
                className={`p-4 rounded-lg ${
                  incident.severity === 'high'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : incident.severity === 'medium'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle
                    className={
                      incident.severity === 'high'
                        ? 'text-red-500'
                        : incident.severity === 'medium'
                        ? 'text-yellow-500'
                        : 'text-blue-500'
                    }
                    size={24}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {incident.type}
                      </p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(incident.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {incident.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
