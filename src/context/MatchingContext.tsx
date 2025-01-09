import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRealtime } from './RealtimeContext';
import { MLService } from '../services/MLService';

interface UserPreferences {
  music: {
    genres: string[];
    artists: string[];
    vibe: string[];
    tempo: number[];
  };
  venue: {
    types: string[];
    size: string[];
    atmosphere: string[];
    price: number;
  };
  food: {
    cuisines: string[];
    dietaryRestrictions: string[];
    priceRange: string;
    spiceLevel: number;
  };
  social: {
    groupSize: number[];
    interests: string[];
    activityLevel: string;
    interactionStyle: string[];
  };
  schedule: {
    preferredTimes: string[];
    availability: string[];
    frequency: string;
  };
}

interface VenueData {
  id: string;
  name: string;
  type: string;
  capacity: number;
  currentOccupancy: number;
  music: {
    currentGenre: string;
    plannedGenres: string[];
    djs: string[];
  };
  atmosphere: string[];
  price: number;
  events: any[];
  realTimeData: {
    crowdDemographic: any;
    energyLevel: number;
    waitTime: number;
  };
}

interface DJData {
  id: string;
  name: string;
  genres: string[];
  style: string[];
  popularity: number;
  schedule: any[];
  currentVenue?: string;
  upcomingGigs: any[];
}

interface EventData {
  id: string;
  type: string;
  venue: string;
  djs: string[];
  theme: string[];
  capacity: number;
  registrations: number;
  targetDemographic: any;
}

interface MatchingContextType {
  getUserMatches: (userId: string) => Promise<{
    venues: VenueData[];
    events: EventData[];
    djs: DJData[];
    people: any[];
    food: any[];
  }>;
  getVenueMatches: (venueId: string) => Promise<{
    djs: DJData[];
    events: EventData[];
    targetAudience: any[];
  }>;
  getDJMatches: (djId: string) => Promise<{
    venues: VenueData[];
    events: EventData[];
    collaborators: DJData[];
  }>;
  getEventMatches: (eventId: string) => Promise<{
    venues: VenueData[];
    djs: DJData[];
    similarEvents: EventData[];
  }>;
  updatePreferences: (userId: string, preferences: Partial<UserPreferences>) => Promise<void>;
  getRecommendations: (type: string, filters: any) => Promise<any[]>;
}

const MatchingContext = createContext<MatchingContextType | undefined>(undefined);

export function MatchingProvider({ children }: { children: React.ReactNode }) {
  const { subscribeToArea, subscribeToUser } = useRealtime();
  const mlService = MLService.getInstance();

  useEffect(() => {
    const initializeML = async () => {
      await mlService.initialize();
    };
    initializeML();
  }, []);

  // Enhanced matching algorithm
  const calculateMatchScore = async (
    userId: string,
    entity: VenueData | DJData | EventData,
    context: any
  ) => {
    return await mlService.calculateHybridScore(userId, entity, context);
  };

  const getUserMatches = async (userId: string) => {
    const context = {
      time: new Date(),
      location: await getCurrentLocation(),
      weather: await getCurrentWeather(),
      mood: await getUserMood(userId),
      groupSize: await getGroupSize(userId)
    };

    const [venues, events, djs, people, food] = await Promise.all([
      fetchNearbyVenues(),
      fetchUpcomingEvents(),
      fetchAvailableDJs(),
      fetchPotentialConnections(),
      fetchFoodOptions()
    ]);

    // Calculate scores using ML service
    const venueScores = await Promise.all(
      venues.map(async (venue) => ({
        ...venue,
        score: await calculateMatchScore(userId, venue, context)
      }))
    );

    const eventScores = await Promise.all(
      events.map(async (event) => ({
        ...event,
        score: await calculateMatchScore(userId, event, context)
      }))
    );

    const djScores = await Promise.all(
      djs.map(async (dj) => ({
        ...dj,
        score: await calculateMatchScore(userId, dj, context)
      }))
    );

    // Sort by scores and apply trend analysis
    const trendingVenues = await mlService.analyzeTrends('venues', '24h');
    const trendingEvents = await mlService.analyzeTrends('events', '24h');
    const trendingDjs = await mlService.analyzeTrends('djs', '24h');

    return {
      venues: applyTrends(sortByScore(venueScores), trendingVenues),
      events: applyTrends(sortByScore(eventScores), trendingEvents),
      djs: applyTrends(sortByScore(djScores), trendingDjs),
      people: sortByScore(people),
      food: sortByScore(food)
    };
  };

  // Enhanced venue matching
  const getVenueMatches = async (venueId: string) => {
    const venue = await fetchVenueDetails(venueId);
    const context = {
      time: new Date(),
      location: venue.location,
      weather: await getCurrentWeather(),
      venueType: venue.type,
      capacity: venue.capacity
    };

    const [djs, events, audience] = await Promise.all([
      fetchAvailableDJs(),
      fetchUpcomingEvents(),
      analyzeTargetAudience(venueId)
    ]);

    const djScores = await Promise.all(
      djs.map(async (dj) => ({
        ...dj,
        score: await calculateMatchScore(venueId, dj, context)
      }))
    );

    const eventScores = await Promise.all(
      events.map(async (event) => ({
        ...event,
        score: await calculateMatchScore(venueId, event, context)
      }))
    );

    // Apply anomaly detection
    const anomalies = await mlService.detectAnomalies([...djScores, ...eventScores]);

    return {
      djs: filterAnomalies(sortByScore(djScores), anomalies),
      events: filterAnomalies(sortByScore(eventScores), anomalies),
      targetAudience: audience
    };
  };

  // Helper functions
  const sortByScore = (items: any[]) => {
    return items.sort((a, b) => b.score - a.score);
  };

  const applyTrends = (items: any[], trends: any) => {
    return items.map(item => ({
      ...item,
      trending: trends[item.id] || false
    }));
  };

  const filterAnomalies = (items: any[], anomalies: any[]) => {
    return items.filter((_, index) => !anomalies[index]);
  };

  const getCurrentLocation = async () => {
    // Implement location retrieval
    return { lat: 0, lng: 0 };
  };

  const getCurrentWeather = async () => {
    // Implement weather retrieval
    return '';
  };

  const getUserMood = async (userId: string) => {
    // Implement mood detection
    return '';
  };

  const getGroupSize = async (userId: string) => {
    // Implement group size detection
    return 1;
  };

  const getDJMatches = async (djId: string) => {
    // Implementation of DJ matching
    return {
      venues: [],
      events: [],
      collaborators: []
    };
  };

  const getEventMatches = async (eventId: string) => {
    // Implementation of event matching
    return {
      venues: [],
      djs: [],
      similarEvents: []
    };
  };

  const updatePreferences = async (
    userId: string,
    preferences: Partial<UserPreferences>
  ) => {
    // Implementation of preference updates
  };

  const getRecommendations = async (type: string, filters: any) => {
    // Implementation of recommendation system
    return [];
  };

  return (
    <MatchingContext.Provider
      value={{
        getUserMatches,
        getVenueMatches,
        getDJMatches,
        getEventMatches,
        updatePreferences,
        getRecommendations
      }}
    >
      {children}
    </MatchingContext.Provider>
  );
}

export function useMatching() {
  const context = useContext(MatchingContext);
  if (context === undefined) {
    throw new Error('useMatching must be used within a MatchingProvider');
  }
  return context;
}
