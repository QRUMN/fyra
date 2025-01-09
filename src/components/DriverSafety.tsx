import React, { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  Eye,
  Camera,
  Activity,
  Clock,
  ThermometerSun,
  Wind,
  Droplets,
  CloudRain,
  Sun,
  Moon,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useSafety } from '../context/SafetyContext';

interface SafetyStatus {
  driverAttention: number;
  vehicleCondition: {
    brakes: 'good' | 'warning' | 'critical';
    tires: 'good' | 'warning' | 'critical';
    lights: 'good' | 'warning' | 'critical';
    wipers: 'good' | 'warning' | 'critical';
  };
  environmentalConditions: {
    weather: 'clear' | 'rain' | 'snow' | 'fog';
    visibility: 'good' | 'moderate' | 'poor';
    temperature: number;
    precipitation: number;
    windSpeed: number;
    daylight: 'day' | 'night' | 'dawn' | 'dusk';
  };
  alerts: {
    id: string;
    type: 'attention' | 'vehicle' | 'weather' | 'traffic';
    message: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
  }[];
}

export default function DriverSafety() {
  const [safetyStatus, setSafetyStatus] = useState<SafetyStatus>({
    driverAttention: 95,
    vehicleCondition: {
      brakes: 'good',
      tires: 'good',
      lights: 'good',
      wipers: 'good',
    },
    environmentalConditions: {
      weather: 'clear',
      visibility: 'good',
      temperature: 72,
      precipitation: 0,
      windSpeed: 5,
      daylight: 'day',
    },
    alerts: [
      {
        id: '1',
        type: 'weather',
        message: 'Light rain expected in 30 minutes',
        severity: 'low',
        timestamp: new Date().toISOString(),
      },
    ],
  });
  const [showCamera, setShowCamera] = useState(false);

  const { createAlert } = useSafety();

  useEffect(() => {
    // Monitor driver attention
    if (safetyStatus.driverAttention < 80) {
      createAlert({
        type: 'driver',
        severity: 'high',
        message: 'Driver attention level below threshold',
      });
    }

    // Monitor vehicle condition
    Object.entries(safetyStatus.vehicleCondition).forEach(([system, status]) => {
      if (status === 'critical') {
        createAlert({
          type: 'vehicle',
          severity: 'high',
          message: `${system.charAt(0).toUpperCase() + system.slice(1)} system critical`,
        });
      }
    });

    // Monitor weather conditions
    if (
      safetyStatus.environmentalConditions.visibility === 'poor' ||
      safetyStatus.environmentalConditions.weather === 'snow'
    ) {
      createAlert({
        type: 'weather',
        severity: 'high',
        message: 'Hazardous weather conditions',
      });
    }
  }, [safetyStatus, createAlert]);

  const getConditionColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
    }
  };

  const getWeatherIcon = (weather: SafetyStatus['environmentalConditions']['weather']) => {
    switch (weather) {
      case 'clear':
        return <Sun className="text-yellow-500" size={24} />;
      case 'rain':
        return <CloudRain className="text-blue-500" size={24} />;
      case 'snow':
        return <Droplets className="text-blue-300" size={24} />;
      case 'fog':
        return <Wind className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Driver Attention */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Driver Attention
          </h3>
          <Eye
            className={
              safetyStatus.driverAttention >= 90
                ? 'text-green-500'
                : safetyStatus.driverAttention >= 80
                ? 'text-yellow-500'
                : 'text-red-500'
            }
            size={24}
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {safetyStatus.driverAttention}%
            </span>
            <button
              onClick={() => setShowCamera(!showCamera)}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <Camera className="text-gray-600 dark:text-gray-300" size={20} />
            </button>
          </div>
          <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                safetyStatus.driverAttention >= 90
                  ? 'bg-green-500'
                  : safetyStatus.driverAttention >= 80
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${safetyStatus.driverAttention}%` }}
            />
          </div>
        </div>
      </div>

      {/* Vehicle Systems */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Vehicle Systems
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(safetyStatus.vehicleCondition).map(([system, status]) => (
            <div
              key={system}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {system.charAt(0).toUpperCase() + system.slice(1)}
                </span>
                <Activity className={getConditionColor(status)} size={20} />
              </div>
              <p
                className={`font-medium ${getConditionColor(status)}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Conditions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Environmental Conditions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Weather
              </span>
              {getWeatherIcon(safetyStatus.environmentalConditions.weather)}
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {safetyStatus.environmentalConditions.weather.charAt(0).toUpperCase() +
                safetyStatus.environmentalConditions.weather.slice(1)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Temperature
              </span>
              <ThermometerSun className="text-blue-500" size={20} />
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {safetyStatus.environmentalConditions.temperature}°F
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Visibility
              </span>
              <Eye
                className={
                  safetyStatus.environmentalConditions.visibility === 'good'
                    ? 'text-green-500'
                    : safetyStatus.environmentalConditions.visibility === 'moderate'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }
                size={20}
              />
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {safetyStatus.environmentalConditions.visibility.charAt(0).toUpperCase() +
                safetyStatus.environmentalConditions.visibility.slice(1)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Wind Speed
              </span>
              <Wind className="text-blue-500" size={20} />
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {safetyStatus.environmentalConditions.windSpeed} mph
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Precipitation
              </span>
              <Droplets className="text-blue-500" size={20} />
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {safetyStatus.environmentalConditions.precipitation}%
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Daylight
              </span>
              {safetyStatus.environmentalConditions.daylight === 'day' ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-blue-500" size={20} />
              )}
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {safetyStatus.environmentalConditions.daylight.charAt(0).toUpperCase() +
                safetyStatus.environmentalConditions.daylight.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Safety Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Safety Alerts
        </h3>
        <div className="space-y-4">
          {safetyStatus.alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${
                alert.severity === 'high'
                  ? 'bg-red-50 dark:bg-red-900/20'
                  : alert.severity === 'medium'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20'
                  : 'bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <AlertTriangle
                  className={
                    alert.severity === 'high'
                      ? 'text-red-500'
                      : alert.severity === 'medium'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                  }
                  size={24}
                />
                <div className="flex-1">
                  <p
                    className={
                      alert.severity === 'high'
                        ? 'text-red-800 dark:text-red-200'
                        : alert.severity === 'medium'
                        ? 'text-yellow-800 dark:text-yellow-200'
                        : 'text-blue-800 dark:text-blue-200'
                    }
                  >
                    {alert.message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
