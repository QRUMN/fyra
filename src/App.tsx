import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import SocialHub from './pages/SocialHub';
import Safety from './pages/Safety';
import VenueManagement from './pages/VenueManagement';
import VenueAnalytics from './pages/VenueAnalytics';
import StaffManagement from './pages/StaffManagement';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ResetPassword from './pages/auth/ResetPassword';
import ArtistOnboarding from './pages/onboarding/ArtistOnboarding';
import HotspotOnboarding from './pages/onboarding/HotspotOnboarding';
import EventArchitectOnboarding from './pages/onboarding/EventArchitectOnboarding';
import NavigatorOnboarding from './pages/onboarding/NavigatorOnboarding';
import BitesOnboarding from './pages/onboarding/BitesOnboarding';
import FinancialDashboard from './pages/FinancialDashboard';
import EventPlanning from './pages/EventPlanning';
import CustomerManagement from './pages/CustomerManagement';
import DriverDashboard from './pages/DriverDashboard';
import DriverAnalytics from './pages/DriverAnalytics';
import DriverTraining from './pages/DriverTraining';
import DriverCommunity from './pages/DriverCommunity';
import LateNiteBites from './pages/LateNiteBites';
import RestaurantMenu from './pages/RestaurantMenu';
import OrderTracking from './pages/OrderTracking';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationCenter from './components/NotificationCenter';
import { useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RealtimeProvider } from './context/RealtimeContext';
import { SocialProvider } from './context/SocialContext';
import { BookingProvider } from './context/BookingContext';
import { SafetyProvider } from './context/SafetyContext';
import { MatchingProvider } from './context/MatchingContext';
import UserProfile from './pages/UserProfile';
import FoodGroups from './pages/FoodGroups';
import FoodEvents from './pages/FoodEvents';

function App() {
  const { isDark } = useTheme();

  return (
    <AuthProvider>
      <RealtimeProvider>
        <SocialProvider>
          <BookingProvider>
            <SafetyProvider>
              <MatchingProvider>
                <div className={`min-h-screen ${isDark ? 'dark bg-brand-dark' : 'bg-brand-white'} text-brand-dark dark:text-brand-white transition-colors duration-200`}>
                  <Navbar />
                  <ThemeToggle />
                  <NotificationCenter />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/explore" element={
                      <ProtectedRoute>
                        <Explore />
                      </ProtectedRoute>
                    } />
                    <Route path="/social" element={
                      <ProtectedRoute>
                        <SocialHub />
                      </ProtectedRoute>
                    } />
                    <Route path="/safety" element={
                      <ProtectedRoute>
                        <Safety />
                      </ProtectedRoute>
                    } />
                    <Route path="/venue-management" element={
                      <ProtectedRoute>
                        <VenueManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/venue-analytics" element={
                      <ProtectedRoute>
                        <VenueAnalytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/staff-management" element={
                      <ProtectedRoute>
                        <StaffManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/onboarding/artist" element={
                      <ProtectedRoute>
                        <ArtistOnboarding />
                      </ProtectedRoute>
                    } />
                    <Route path="/onboarding/hotspot" element={
                      <ProtectedRoute>
                        <HotspotOnboarding />
                      </ProtectedRoute>
                    } />
                    <Route path="/onboarding/event-architect" element={
                      <ProtectedRoute>
                        <EventArchitectOnboarding />
                      </ProtectedRoute>
                    } />
                    <Route path="/onboarding/navigator" element={
                      <ProtectedRoute>
                        <NavigatorOnboarding />
                      </ProtectedRoute>
                    } />
                    <Route path="/onboarding/bites" element={
                      <ProtectedRoute>
                        <BitesOnboarding />
                      </ProtectedRoute>
                    } />
                    <Route path="/financial-dashboard" element={
                      <ProtectedRoute>
                        <FinancialDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/event-planning" element={
                      <ProtectedRoute>
                        <EventPlanning />
                      </ProtectedRoute>
                    } />
                    <Route path="/customer-management" element={
                      <ProtectedRoute>
                        <CustomerManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/driver" element={
                      <ProtectedRoute>
                        <DriverDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/driver/analytics" element={
                      <ProtectedRoute>
                        <DriverAnalytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/driver/training" element={
                      <ProtectedRoute>
                        <DriverTraining />
                      </ProtectedRoute>
                    } />
                    <Route path="/driver/community" element={
                      <ProtectedRoute>
                        <DriverCommunity />
                      </ProtectedRoute>
                    } />
                    <Route path="/late-nite-bites" element={
                      <ProtectedRoute>
                        <LateNiteBites />
                      </ProtectedRoute>
                    } />
                    <Route path="/restaurant/:id" element={
                      <ProtectedRoute>
                        <RestaurantMenu />
                      </ProtectedRoute>
                    } />
                    <Route path="/order/:id" element={
                      <ProtectedRoute>
                        <OrderTracking />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile/:userId" element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } />
                    <Route path="/groups" element={
                      <ProtectedRoute>
                        <FoodGroups />
                      </ProtectedRoute>
                    } />
                    <Route path="/groups/:groupId" element={
                      <ProtectedRoute>
                        <FoodGroups />
                      </ProtectedRoute>
                    } />
                    <Route path="/events" element={
                      <ProtectedRoute>
                        <FoodEvents />
                      </ProtectedRoute>
                    } />
                    <Route path="/events/:eventId" element={
                      <ProtectedRoute>
                        <FoodEvents />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </div>
              </MatchingProvider>
            </SafetyProvider>
          </BookingProvider>
        </SocialProvider>
      </RealtimeProvider>
    </AuthProvider>
  );
}

export default App;