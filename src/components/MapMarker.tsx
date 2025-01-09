import React from 'react';
import { Marker } from 'react-map-gl';

interface MapMarkerProps {
  longitude: number;
  latitude: number;
  color: string;
  onClick?: () => void;
  selected?: boolean;
  pulse?: boolean;
}

export default function MapMarker({ 
  longitude, 
  latitude, 
  color, 
  onClick,
  selected = false,
  pulse = false,
}: MapMarkerProps) {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="center">
      <div 
        className={`relative cursor-pointer transform transition-all duration-200 ${
          selected ? 'scale-125' : 'hover:scale-110'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <div
          className={`w-4 h-4 rounded-full transition-shadow duration-200 ${
            selected ? 'shadow-lg shadow-brand-lime/30' : ''
          }`}
          style={{ backgroundColor: color }}
        />
        {pulse && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: color, opacity: 0.4 }}
          />
        )}
      </div>
    </Marker>
  );
}