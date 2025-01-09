import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Music,
  Utensils,
  Truck,
  CheckSquare,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Search,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useBooking } from '../context/BookingContext';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: 'setup' | 'catering' | 'entertainment' | 'security' | 'other';
}

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  expectedAttendance: number;
  budget: number;
  status: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  tasks: Task[];
  vendors: {
    name: string;
    service: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    cost: number;
  }[];
}

export default function EventPlanning() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks' | 'vendors'>(
    'calendar'
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Event['status']>('planning');

  const events: Event[] = [
    {
      id: '1',
      title: 'Summer Night Festival',
      date: '2025-01-15',
      startTime: '18:00',
      endTime: '23:00',
      expectedAttendance: 500,
      budget: 25000,
      status: 'planning',
      tasks: [
        {
          id: '1',
          title: 'Book main stage equipment',
          description: 'Secure sound system and lighting setup',
          assignee: 'John Doe',
          dueDate: '2025-01-10',
          status: 'in-progress',
          priority: 'high',
          category: 'setup',
        },
        // More tasks...
      ],
      vendors: [
        {
          name: 'Sound Masters',
          service: 'Audio Equipment',
          status: 'confirmed',
          cost: 5000,
        },
        // More vendors...
      ],
    },
    // More events...
  ];

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'planning':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'confirmed':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'in-progress':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'completed':
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
      case 'cancelled':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Event Planning
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Plan and manage your venue events
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'calendar'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'tasks'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'vendors'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                Vendors
              </button>
            </div>
            <button
              onClick={() => setShowAddEvent(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              New Event
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as Event['status'])}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="planning">Planning</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {/* Calendar Header */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    {day}
                  </div>
                ))}
                {/* Calendar Days */}
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square p-2 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tasks View */}
        {activeTab === 'tasks' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-6">
              <div className="space-y-4">
                {events
                  .filter((event) => event.status === filterStatus)
                  .map((event) =>
                    event.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <CheckSquare
                            className={
                              task.status === 'completed'
                                ? 'text-green-500'
                                : 'text-gray-400'
                            }
                            size={20}
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {task.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Vendors View */}
        {activeTab === 'vendors' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-6">
              <div className="space-y-4">
                {events
                  .filter((event) => event.status === filterStatus)
                  .map((event) =>
                    event.vendors.map((vendor, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <Truck className="text-gray-500" size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {vendor.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {vendor.service}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              vendor.status === 'confirmed'
                                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                                : vendor.status === 'cancelled'
                                ? 'text-red-500 bg-red-100 dark:bg-red-900/20'
                                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                            }`}
                          >
                            {vendor.status}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            ${vendor.cost.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
