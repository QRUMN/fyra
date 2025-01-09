import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  AlertTriangle,
  Navigation,
  Clock,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useSafety } from '../context/SafetyContext';

interface Zone {
  id: string;
  name: string;
  currentCapacity: number;
  maxCapacity: number;
  predictedFlow: {
    time: string;
    value: number;
  }[];
  hotspots: {
    x: number;
    y: number;
    intensity: number;
  }[];
}

interface CrowdFlowPredictorProps {
  venueId: string;
}

export default function CrowdFlowPredictor({ venueId }: CrowdFlowPredictorProps) {
  const { crowdData, predictCrowdFlow } = useRealtime();
  const { createAlert } = useSafety();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'1h' | '2h' | '4h'>('1h');

  const zones: Zone[] = [
    {
      id: 'main-floor',
      name: 'Main Floor',
      currentCapacity: 250,
      maxCapacity: 500,
      predictedFlow: [
        { time: '22:00', value: 250 },
        { time: '23:00', value: 350 },
        { time: '00:00', value: 450 },
        { time: '01:00', value: 400 },
      ],
      hotspots: [
        { x: 30, y: 40, intensity: 0.8 },
        { x: 70, y: 60, intensity: 0.6 },
      ],
    },
    {
      id: 'vip-area',
      name: 'VIP Area',
      currentCapacity: 80,
      maxCapacity: 100,
      predictedFlow: [
        { time: '22:00', value: 80 },
        { time: '23:00', value: 90 },
        { time: '00:00', value: 95 },
        { time: '01:00', value: 85 },
      ],
      hotspots: [
        { x: 40, y: 30, intensity: 0.7 },
        { x: 60, y: 70, intensity: 0.9 },
      ],
    },
    {
      id: 'bar-area',
      name: 'Bar Area',
      currentCapacity: 120,
      maxCapacity: 150,
      predictedFlow: [
        { time: '22:00', value: 120 },
        { time: '23:00', value: 140 },
        { time: '00:00', value: 145 },
        { time: '01:00', value: 130 },
      ],
      hotspots: [
        { x: 20, y: 50, intensity: 0.9 },
        { x: 80, y: 50, intensity: 0.7 },
      ],
    },
  ];

  useEffect(() => {
    // Check for potential bottlenecks
    zones.forEach((zone) => {
      const nextHourPrediction = zone.predictedFlow[1]?.value || 0;
      if (nextHourPrediction > zone.maxCapacity * 0.9) {
        createAlert({
          type: 'crowd',
          severity: 'high',
          message: `High crowd density predicted in ${zone.name} within the next hour`,
          venueId,
          zoneId: zone.id,
        });
      }
    });
  }, [zones, createAlert, venueId]);

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getHeatmapColor = (intensity: number) => {
    if (intensity >= 0.8) return 'bg-red-500/20';
    if (intensity >= 0.6) return 'bg-yellow-500/20';
    return 'bg-green-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Zone Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZone(zone.id)}
            className={`p-6 rounded-xl transition-colors ${
              selectedZone === zone.id
                ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {zone.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current Capacity
                </p>
              </div>
              <span
                className={`text-lg font-bold ${getCapacityColor(
                  zone.currentCapacity,
                  zone.maxCapacity
                )}`}
              >
                {Math.round((zone.currentCapacity / zone.maxCapacity) * 100)}%
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {zone.currentCapacity} / {zone.maxCapacity}
                </span>
                <div className="flex items-center gap-1 text-blue-500">
                  <TrendingUp size={16} />
                  <span>+{zone.predictedFlow[1]?.value - zone.currentCapacity}</span>
                </div>
              </div>

              <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${(zone.currentCapacity / zone.maxCapacity) * 100}%`,
                  }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detailed View */}
      {selectedZone && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {zones.find((z) => z.id === selectedZone)?.name} - Crowd Flow Analysis
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Predicted crowd movement and density
              </p>
            </div>

            <div className="flex gap-2">
              {(['1h', '2h', '4h'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    timeRange === range
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Heatmap */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {zones
                .find((z) => z.id === selectedZone)
                ?.hotspots.map((hotspot, index) => (
                  <div
                    key={index}
                    className={`absolute w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${getHeatmapColor(
                      hotspot.intensity
                    )}`}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      filter: 'blur(16px)',
                    }}
                  />
                ))}
              <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <span className="text-gray-600 dark:text-gray-300">High Density</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <span className="text-gray-600 dark:text-gray-300">Medium Density</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  <span className="text-gray-600 dark:text-gray-300">Low Density</span>
                </div>
              </div>
            </div>

            {/* Flow Prediction */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Predicted Flow
                </h4>
                {zones
                  .find((z) => z.id === selectedZone)
                  ?.predictedFlow.map((prediction, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <Clock className="text-gray-400" size={20} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {prediction.time}
                          </span>
                          <span
                            className={getCapacityColor(
                              prediction.value,
                              zones.find((z) => z.id === selectedZone)?.maxCapacity || 0
                            )}
                          >
                            {prediction.value} people
                          </span>
                        </div>
                        <div className="mt-2 relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                            style={{
                              width: `${
                                (prediction.value /
                                  (zones.find((z) => z.id === selectedZone)
                                    ?.maxCapacity || 0)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Recommendations
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <AlertTriangle className="text-yellow-500 mt-0.5" size={16} />
                    <span>
                      Consider opening additional entry points between 23:00 - 00:00
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Navigation className="text-blue-500 mt-0.5" size={16} />
                    <span>
                      Direct crowd flow towards the east side to reduce congestion
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Users className="text-green-500 mt-0.5" size={16} />
                    <span>
                      Deploy additional security personnel near high-density areas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
