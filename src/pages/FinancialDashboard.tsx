import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  Calendar,
  Filter,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useBooking } from '../context/BookingContext';

type TimeRange = 'day' | 'week' | 'month' | 'quarter' | 'year';
type RevenueType = 'tickets' | 'bar' | 'vip' | 'events' | 'other';

interface FinancialMetric {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  forecast: number;
}

interface RevenueStream {
  type: RevenueType;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'neutral';
}

export default function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { revenueData } = useRealtime();
  const { bookingRevenue } = useBooking();

  const metrics: FinancialMetric[] = [
    {
      label: 'Total Revenue',
      value: 158920,
      previousValue: 142500,
      change: 11.5,
      trend: 'up',
      forecast: 175000,
    },
    {
      label: 'Average Transaction',
      value: 85,
      previousValue: 78,
      change: 9.0,
      trend: 'up',
      forecast: 90,
    },
    {
      label: 'Operating Costs',
      value: 45600,
      previousValue: 42000,
      change: 8.6,
      trend: 'up',
      forecast: 48000,
    },
    {
      label: 'Net Profit',
      value: 113320,
      previousValue: 100500,
      change: 12.8,
      trend: 'up',
      forecast: 127000,
    },
  ];

  const revenueStreams: RevenueStream[] = [
    {
      type: 'tickets',
      amount: 75000,
      percentage: 47.2,
      trend: 'up',
    },
    {
      type: 'bar',
      amount: 45000,
      percentage: 28.3,
      trend: 'up',
    },
    {
      type: 'vip',
      amount: 25000,
      percentage: 15.7,
      trend: 'down',
    },
    {
      type: 'events',
      amount: 10000,
      percentage: 6.3,
      trend: 'neutral',
    },
    {
      type: 'other',
      amount: 3920,
      percentage: 2.5,
      trend: 'up',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRevenueColor = (type: RevenueType) => {
    switch (type) {
      case 'tickets':
        return 'bg-blue-500';
      case 'bar':
        return 'bg-purple-500';
      case 'vip':
        return 'bg-yellow-500';
      case 'events':
        return 'bg-green-500';
      case 'other':
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Financial Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track revenue, costs, and financial forecasts
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {(['day', 'week', 'month', 'quarter', 'year'] as TimeRange[]).map(
                (range) => (
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
                )
              )}
            </div>
            <button className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Download className="text-gray-600 dark:text-gray-300" />
            </button>
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
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(metric.change)}%
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(metric.value)}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Previous: {formatCurrency(metric.previousValue)}
                  </span>
                  <span className="text-blue-500">
                    Forecast: {formatCurrency(metric.forecast)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Streams */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Revenue Streams
            </h3>
            <div className="space-y-4">
              {revenueStreams.map((stream) => (
                <div key={stream.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getRevenueColor(
                          stream.type
                        )}`}
                      />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {stream.type.charAt(0).toUpperCase() + stream.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 dark:text-gray-300">
                        {formatCurrency(stream.amount)}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          stream.trend === 'up'
                            ? 'text-green-500'
                            : stream.trend === 'down'
                            ? 'text-red-500'
                            : 'text-gray-500'
                        }`}
                      >
                        {stream.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full ${getRevenueColor(
                        stream.type
                      )}`}
                      style={{ width: `${stream.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Trends
              </h3>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Filter className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              [Revenue Trend Chart Placeholder]
            </div>
          </div>
        </div>

        {/* Financial Forecasting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Financial Forecast
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Projected revenue and costs for the next 6 months
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Generate Report
            </button>
          </div>
          <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
            [Financial Forecast Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
