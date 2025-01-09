import { ViewState } from 'react-map-gl';

export interface Location {
  id: string;
  longitude: number;
  latitude: number;
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

export interface Friend {
  id: string;
  name: string;
  avatar: string;
}

export interface MapHeroProps {
  minimal?: boolean;
}

export interface MapConfig {
  initialViewState: Partial<ViewState>;
  mapboxAccessToken: string;
  lightStyle: string;
  darkStyle: string;
}

export const mapConfig: MapConfig = {
  initialViewState: {
    longitude: -73.935242,
    latitude: 40.730610,
    zoom: 13,
    pitch: 75,
    bearing: -17.6,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  },
  mapboxAccessToken: "pk.eyJ1IjoicXJ1bW4iLCJhIjoiY20zN2V0ZHBtMDRqajJxcHhrejI5cmlpYSJ9.qCAYS34VtDnEUC5pr28Q8g",
  lightStyle: "mapbox://styles/mapbox/light-v11?optimize=true&bgcolor=rgb(236,238,240)",
  darkStyle: "mapbox://styles/mapbox/dark-v11"
};