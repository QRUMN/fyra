import React, { useEffect, useState, useCallback } from 'react';
import Map, { NavigationControl, Popup, ViewState } from 'react-map-gl';
import { Locate } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapMarker from './MapMarker';
import HotspotCard from './HotspotCard';
import { calculateDistance } from '../utils/distance';
import { useTheme } from '../context/ThemeContext';
import { Location, MapHeroProps, mapConfig } from '../types/map';

export default function MapHero({ minimal = false }: MapHeroProps) {
  const { isDark } = useTheme();
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [viewState, setViewState] = useState<ViewState>({
    ...mapConfig.initialViewState,
    zoom: minimal ? 12 : 13
  } as ViewState);

  const sampleLocations: Location[] = [
    {
      id: "1",
      longitude: -73.945242,
      latitude: 40.735610,
      type: "event",
      name: "House Music Night",
      description: "Deep house and techno with NYC's finest DJs",
      status: "Live",
      startTime: "22:00",
      endTime: "04:00",
      attendees: {
        total: 250,
        friends: [
          {
            id: "1",
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop"
          },
          {
            id: "2",
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop"
          },
          {
            id: "3",
            name: "Mike Rodriguez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop"
          },
          {
            id: "4",
            name: "Emma Wilson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop"
          }
        ]
      }
    },
    {
      id: "2",
      longitude: -73.925242,
      latitude: 40.725610,
      type: "event",
      name: "R&B Social",
      description: "The best R&B and Soul music experience",
      status: "Upcoming",
      startTime: "23:00",
      endTime: "03:00",
      attendees: {
        total: 180,
        friends: [
          {
            id: "2",
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop"
          },
          {
            id: "6",
            name: "James Lee",
            avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=64&h=64&fit=crop"
          }
        ]
      }
    },
    {
      id: "3",
      longitude: -73.955242,
      latitude: 40.745610,
      type: "restaurant",
      name: "Late Night Bites",
      description: "Open 24/7 - Full menu available",
      status: "Open Late"
    }
  ];

  useEffect(() => {
    setLocations(sampleLocations);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(newLocation);
          if (!minimal) {
            setViewState(prev => ({
              ...prev,
              longitude: newLocation[0],
              latitude: newLocation[1]
            }));
          }
        },
        () => {
          setUserLocation([-73.935242, 40.730610]);
        }
      );
    }
  }, [minimal]);

  const handleLocateUser = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(newLocation);
          setViewState(prev => ({
            ...prev,
            longitude: newLocation[0],
            latitude: newLocation[1],
            zoom: 14,
            transitionDuration: 1000
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const getMarkerColor = (type: string, status?: string) => {
    if (isDark) {
      if (type === "event") {
        return status === "Live" ? "#D4FF00" : "#93AEB8";
      }
      return type === "restaurant" ? "#DB5461" : "#FFFFFF";
    } else {
      if (type === "event") {
        return status === "Live" ? "#D4FF00" : "#DB5461";
      }
      return type === "restaurant" ? "#4C4E46" : "#292929";
    }
  };

  const handleViewStateChange = useCallback((newViewState: ViewState) => {
    setViewState(newViewState);
  }, []);

  return (
    <div className="relative h-full rounded-2xl overflow-hidden">
      <Map
        {...viewState}
        onMove={evt => handleViewStateChange(evt.viewState)}
        mapboxAccessToken={mapConfig.mapboxAccessToken}
        style={{ width: "100%", height: "100%" }}
        mapStyle={isDark ? mapConfig.darkStyle : mapConfig.lightStyle}
        attributionControl={false}
        onClick={() => setSelectedLocation(null)}
        maxPitch={85}
        minZoom={9}
        maxZoom={18}
      >
        <div className="absolute right-5 bottom-20">
          <button
            onClick={handleLocateUser}
            className="bg-white dark:bg-brand-dark p-2 rounded-md shadow-lg hover:bg-gray-100 dark:hover:bg-brand-dark/80 transition-colors"
            aria-label="Find my location"
          >
            <Locate className="text-brand-dark dark:text-white" size={20} />
          </button>
        </div>
        
        <NavigationControl position="bottom-right" />
        
        {locations.map((location) => (
          <MapMarker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            color={getMarkerColor(location.type, location.status)}
            onClick={() => setSelectedLocation(location)}
            selected={selectedLocation?.id === location.id}
            pulse={location.status === 'Live' && location.type === 'event'}
          />
        ))}

        {selectedLocation && userLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="bottom"
            onClose={() => setSelectedLocation(null)}
            closeButton={false}
            className="hotspot-popup"
            offset={20}
          >
            <HotspotCard
              location={selectedLocation}
              distance={calculateDistance(
                userLocation[1],
                userLocation[0],
                selectedLocation.latitude,
                selectedLocation.longitude
              )}
            />
          </Popup>
        )}
      </Map>
      
      {!minimal && <div className="absolute inset-0 pointer-events-none bg-black/10" />}
      
      {!minimal && (
        <div className="absolute bottom-8 left-8 z-20 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-sm rounded-lg p-4">
          <div className="text-brand-dark dark:text-white text-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-lime" />
              <span>Live Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-red dark:bg-brand-blue" />
              <span>Upcoming Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-olive dark:bg-brand-red" />
              <span>Late-night Restaurants</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}