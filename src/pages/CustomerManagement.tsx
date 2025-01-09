import React, { useState } from 'react';
import {
  Users,
  Star,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Tag,
  MessageSquare,
  Filter,
  Search,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';
import { useBooking } from '../context/BookingContext';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  joinDate: string;
  lastVisit: string;
  totalSpent: number;
  visits: number;
  tags: string[];
  preferences: {
    musicGenre: string[];
    seatingPreference: string;
    dietaryRestrictions: string[];
  };
  notes: {
    id: string;
    date: string;
    content: string;
    author: string;
  }[];
}

interface Interaction {
  id: string;
  customerId: string;
  type: 'visit' | 'booking' | 'complaint' | 'feedback' | 'support';
  date: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState<'customers' | 'interactions'>(
    'customers'
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [filterMembership, setFilterMembership] = useState<Customer['membershipTier']>(
    'bronze'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const customers: Customer[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '(555) 123-4567',
      membershipTier: 'gold',
      joinDate: '2024-06-15',
      lastVisit: '2025-01-08',
      totalSpent: 2500,
      visits: 15,
      tags: ['VIP', 'Regular', 'Weekend'],
      preferences: {
        musicGenre: ['House', 'Techno'],
        seatingPreference: 'Booth',
        dietaryRestrictions: ['Vegetarian'],
      },
      notes: [
        {
          id: '1',
          date: '2025-01-08',
          content: 'Celebrated birthday party, very satisfied with service',
          author: 'John (Host)',
        },
      ],
    },
    // More customers...
  ];

  const interactions: Interaction[] = [
    {
      id: '1',
      customerId: '1',
      type: 'booking',
      date: '2025-01-15',
      description: 'Reserved VIP booth for 6 people',
      status: 'open',
      priority: 'medium',
    },
    // More interactions...
  ];

  const getMembershipColor = (tier: Customer['membershipTier']) => {
    switch (tier) {
      case 'bronze':
        return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20';
      case 'silver':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      case 'gold':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'platinum':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
    }
  };

  const getInteractionColor = (type: Interaction['type']) => {
    switch (type) {
      case 'visit':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'booking':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'complaint':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      case 'feedback':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      case 'support':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Customer Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage customer relationships and interactions
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'customers'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                Customers
              </button>
              <button
                onClick={() => setActiveTab('interactions')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'interactions'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                Interactions
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Plus size={20} />
              Add Customer
            </button>
          </div>
        </div>

        {/* Customers View */}
        {activeTab === 'customers' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={filterMembership}
                    onChange={(e) =>
                      setFilterMembership(e.target.value as Customer['membershipTier'])
                    }
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Membership
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Spend
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {customers
                    .filter(
                      (customer) =>
                        customer.membershipTier === filterMembership &&
                        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-600 dark:text-gray-300 font-medium">
                                {customer.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {customer.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Member since{' '}
                                {new Date(customer.joinDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMembershipColor(
                              customer.membershipTier
                            )}`}
                          >
                            {customer.membershipTier.charAt(0).toUpperCase() +
                              customer.membershipTier.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {customer.email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {customer.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {customer.visits} visits
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Last visit:{' '}
                            {new Date(customer.lastVisit).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            ${customer.totalSpent.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                              <Trash2 size={16} />
                            </button>
                            <button className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded">
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
        )}

        {/* Interactions View */}
        {activeTab === 'interactions' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-6">
              <div className="space-y-4">
                {interactions.map((interaction) => {
                  const customer = customers.find(
                    (c) => c.id === interaction.customerId
                  );
                  return (
                    <div
                      key={interaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded ${getInteractionColor(
                            interaction.type
                          )}`}
                        >
                          <MessageSquare size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {customer?.name}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${getInteractionColor(
                                interaction.type
                              )}`}
                            >
                              {interaction.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {interaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(interaction.date).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            interaction.status === 'resolved'
                              ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                              : interaction.status === 'closed'
                              ? 'text-gray-500 bg-gray-100 dark:bg-gray-900/20'
                              : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                          }`}
                        >
                          {interaction.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
