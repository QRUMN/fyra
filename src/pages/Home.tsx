import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import MapHero from '../components/MapHero';
import GenreGroup from '../components/GenreGroup';
import PlatformUserCard from '../components/PlatformUserCard';
import { useTheme } from '../context/ThemeContext';

const genreGroups = [
  {
    name: "R&B ONLY",
    memberCount: 25000,
    activeNow: 1200,
    color: "#9333EA",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop"
  },
  {
    name: "HOUSE HEADS",
    memberCount: 18000,
    activeNow: 850,
    color: "#EC4899",
    image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=400&h=400&fit=crop"
  },
  {
    name: "ALL CLUB",
    memberCount: 32000,
    activeNow: 2100,
    color: "#3B82F6",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  },
  {
    name: "HIP-HOP NATION",
    memberCount: 28000,
    activeNow: 1500,
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  }
];

const userTypes = [
  {
    type: "artist",
    title: "Artists",
    description: "DJs and musicians with smart profiles and automated bookings"
  },
  {
    type: "hotspot",
    title: "Hotspots",
    description: "Venues with dynamic capacity and crowd optimization"
  },
  {
    type: "event-architect",
    title: "Event Architects",
    description: "Professional planners with AI-powered tools"
  },
  {
    type: "navigator",
    title: "Navigators",
    description: "Smart drivers with route optimization and safety features"
  },
  {
    type: "bites",
    title: "Bites",
    description: "Restaurants integrated with venues and real-time ordering"
  }
];

const stats = [
  { value: "500K+", label: "Active Users" },
  { value: "1000+", label: "Venues" },
  { value: "2500+", label: "Artists" },
  { value: "98%", label: "Satisfaction" }
];

const features = [
  {
    title: "AI Matching",
    description: "Find events and artists that match your unique taste with our intelligent recommendation engine."
  },
  {
    title: "Smart Location",
    description: "Discover the best venues and events near you with real-time updates and directions."
  },
  {
    title: "Safety First",
    description: "Advanced safety features and real-time monitoring for peace of mind."
  },
  {
    title: "VIP Access",
    description: "Access exclusive events, special offers, and unique nightlife experiences."
  }
];

export default function Home() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleUserTypeClick = (type: string) => {
    navigate(`/onboarding/${type.toLowerCase()}`);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {/* Hero Text Box */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-r from-brand-dark to-brand-olive dark:from-brand-dark dark:to-brand-olive p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Find Your Rhythm Anywhere
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            Your AI-powered gateway to the perfect night out.
          </p>
          <button 
            onClick={() => navigate('/explore')}
            className="bg-brand-lime hover:bg-brand-lime/90 text-brand-dark font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all transform hover:scale-105"
          >
            Start Exploring <ArrowRight size={20} />
          </button>
        </div>

        {/* Stats Box */}
        <div className="rounded-3xl bg-brand-white dark:bg-brand-dark/80 p-6 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-lime rounded-full flex items-center justify-center">
              <TrendingUp className="text-brand-dark" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white">Platform Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-brand-lime">{stat.value}</div>
                <div className="text-sm text-brand-olive dark:text-brand-blue">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Groups */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-dark to-brand-olive p-6 shadow-card dark:shadow-card-dark">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white mb-4">Popular Groups</h3>
            {genreGroups.map((group, index) => (
              <GenreGroup key={index} {...group} />
            ))}
          </div>
        </div>

        {/* Map Box */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden h-[400px]">
          <MapHero minimal={true} />
        </div>

        {/* Platform Users */}
        <div className="lg:col-span-3 grid grid-cols-5 gap-6">
          {userTypes.map((user) => (
            <PlatformUserCard
              key={user.type}
              {...user}
              onClick={() => handleUserTypeClick(user.type)}
            />
          ))}
        </div>

        {/* Core Features */}
        <div className="lg:col-span-3 rounded-3xl bg-gradient-to-r from-brand-dark to-brand-olive p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-lime/10 rounded-full flex items-center justify-center">
              <Sparkles className="text-brand-lime" size={20} />
            </div>
            <h3 className="text-2xl font-semibold text-white">Core Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-brand-blue">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-6 rounded-3xl bg-gradient-to-r from-brand-dark to-brand-olive p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Night?</h2>
        <p className="text-xl text-brand-blue mb-6 max-w-2xl mx-auto">
          Join thousands already transforming their nightlife experience with FYRA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/explore')}
            className="bg-brand-lime hover:bg-brand-lime/90 text-brand-dark font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105"
          >
            Get Started <ArrowRight size={20} />
          </button>
          <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-brand-dark transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}