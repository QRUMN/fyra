import React, { useState, useEffect } from 'react';
import {
  Navigation,
  MapPin,
  Compass,
  AlertTriangle,
  Info,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Layers,
  Sun,
  Moon,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useSafety } from '../context/SafetyContext';

interface NavigationStep {
  instruction: string;
  distance: number;
  duration: number;
  maneuver: 'straight' | 'left' | 'right' | 'uturn' | 'merge' | 'exit';
  street: string;
}

interface Route {
  steps: NavigationStep[];
  totalDistance: number;
  totalDuration: number;
  trafficLevel: 'low' | 'medium' | 'high';
  alternateRoutes: {
    duration: number;
    trafficLevel: 'low' | 'medium' | 'high';
  }[];
}

interface RoadAlert {
  type: 'accident' | 'construction' | 'closure' | 'weather' | 'police';
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export default function DriverNavigation() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [route, setRoute] = useState<Route>({
    steps: [
      {
        instruction: 'Continue straight on Main Street',
        distance: 0.5,
        duration: 2,
        maneuver: 'straight',
        street: 'Main Street',
      },
      {
        instruction: 'Turn right onto Park Avenue',
        distance: 0.3,
        duration: 1,
        maneuver: 'right',
        street: 'Park Avenue',
      },
      // More steps...
    ],
    totalDistance: 3.2,
    totalDuration: 12,
    trafficLevel: 'medium',
    alternateRoutes: [
      { duration: 15, trafficLevel: 'low' },
      { duration: 18, trafficLevel: 'low' },
    ],
  });
  const [alerts, setAlerts] = useState<RoadAlert[]>([]);
  const [mapSettings, setMapSettings] = useState({
    zoom: 15,
    style: 'day',
    showTraffic: true,
    muted: false,
  });

  const { createAlert } = useSafety();

  useEffect(() => {
    // Monitor for road alerts
    alerts.forEach((alert) => {
      if (alert.severity === 'high') {
        createAlert({
          type: 'road',
          severity: 'high',
          message: `${alert.type}: ${alert.description}`,
        });
      }
    });
  }, [alerts, createAlert]);

  const getManeuverIcon = (maneuver: NavigationStep['maneuver']) => {
    switch (maneuver) {
      case 'straight':
        return '↑';
      case 'left':
        return '←';
      case 'right':
        return '→';
      case 'uturn':
        return '↩';
      case 'merge':
        return '↱';
      case 'exit':
        return '↳';
    }
  };

  const getTrafficColor = (level: Route['trafficLevel']) => {
    switch (level) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      {/* Map Area */}
      <div className="relative h-2/3 bg-gray-200 dark:bg-gray-800">
        {/* Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          [Map View]
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <ZoomIn className="text-gray-600 dark:text-gray-300" size={20} />
          </button>
          <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <ZoomOut className="text-gray-600 dark:text-gray-300" size={20} />
          </button>
          <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Layers className="text-gray-600 dark:text-gray-300" size={20} />
          </button>
          <button
            onClick={() =>
              setMapSettings((prev) => ({
                ...prev,
                style: prev.style === 'day' ? 'night' : 'day',
              }))
            }
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            {mapSettings.style === 'day' ? (
              <Sun className="text-gray-600 dark:text-gray-300" size={20} />
            ) : (
              <Moon className="text-gray-600 dark:text-gray-300" size={20} />
            )}
          </button>
          <button
            onClick={() =>
              setMapSettings((prev) => ({ ...prev, muted: !prev.muted }))
            }
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            {mapSettings.muted ? (
              <VolumeX className="text-gray-600 dark:text-gray-300" size={20} />
            ) : (
              <Volume2 className="text-gray-600 dark:text-gray-300" size={20} />
            )}
          </button>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="absolute top-4 left-4 space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              >
                <AlertTriangle
                  className={
                    alert.severity === 'high'
                      ? 'text-red-500'
                      : alert.severity === 'medium'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                  }
                  size={20}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {alert.description}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Panel */}
      <div className="h-1/3 bg-white dark:bg-gray-800 p-4">
        <div className="h-full flex flex-col">
          {/* Current Step */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
              {getManeuverIcon(route.steps[currentStep].maneuver)}
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {route.steps[currentStep].instruction}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {route.steps[currentStep].distance} mi • {route.steps[currentStep].duration}{' '}
                min
              </p>
            </div>
          </div>

          {/* Route Overview */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Distance
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {route.totalDistance} mi
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Estimated Time
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {route.totalDuration} min
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Traffic</p>
              <p
                className={`text-lg font-medium ${getTrafficColor(
                  route.trafficLevel
                )}`}
              >
                {route.trafficLevel.charAt(0).toUpperCase() +
                  route.trafficLevel.slice(1)}
              </p>
            </div>
          </div>

          {/* Alternate Routes */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Alternate Routes
            </p>
            <div className="flex gap-2">
              {route.alternateRoutes.map((alt, index) => (
                <button
                  key={index}
                  className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                >
                  <p className="font-medium text-gray-900 dark:text-white">
                    {alt.duration} min
                  </p>
                  <p
                    className={`text-xs ${getTrafficColor(alt.trafficLevel)}`}
                  >
                    {alt.trafficLevel} traffic
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
