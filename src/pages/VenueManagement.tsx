import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Check,
  X,
  Filter,
  Search,
  MoreVertical,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useRealtime } from '../context/RealtimeContext';
import VenueCapacityCard from '../components/VenueCapacityCard';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
type FilterType = 'all' | BookingStatus;

interface Booking {
  id: string;
  customerName: string;
  date: string;
  time: string;
  partySize: number;
  status: BookingStatus;
  specialRequests?: string;
}

export default function VenueManagement() {
  const { bookings, updateBookingStatus } = useBooking();
  const { venueCapacity } = useRealtime();
  const [filterStatus, setFilterStatus] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const filteredBookings = bookings
    .filter((booking) => {
      if (filterStatus === 'all') return true;
      return booking.status === filterStatus;
    })
    .filter((booking) =>
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    await updateBookingStatus(bookingId, newStatus);
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Venue Capacity Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <VenueCapacityCard
            venueId="venue-1"
            venueName="Main Hall"
            maxCapacity={500}
          />
          <VenueCapacityCard
            venueId="venue-2"
            venueName="VIP Lounge"
            maxCapacity={100}
          />
          <VenueCapacityCard
            venueId="venue-3"
            venueName="Rooftop Bar"
            maxCapacity={200}
          />
        </div>

        {/* Booking Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Reservations
            </h2>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search reservations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                {(['all', 'pending', 'confirmed', 'cancelled', 'completed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Party Size
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {booking.customerName}
                        </div>
                        {booking.specialRequests && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.specialRequests}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                        <Clock size={16} />
                        <span>{booking.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Users size={16} />
                        <span>{booking.partySize}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="p-1 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'completed')}
                            className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
