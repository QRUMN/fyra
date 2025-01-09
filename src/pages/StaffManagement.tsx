import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Calendar,
  Clock,
  Check,
  X,
  Edit,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';

type Role = 'security' | 'bartender' | 'server' | 'host' | 'manager';
type ShiftTime = 'day' | 'night';

interface StaffMember {
  id: string;
  name: string;
  role: Role;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  shift: ShiftTime;
  startDate: string;
}

interface Shift {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  role: Role;
  status: 'scheduled' | 'in-progress' | 'completed' | 'missed';
}

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState<'staff' | 'schedule'>('staff');
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [staffMembers] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'security',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      status: 'active',
      shift: 'night',
      startDate: '2024-12-01',
    },
    // Add more staff members...
  ]);

  const [shifts] = useState<Shift[]>([
    {
      id: '1',
      staffId: '1',
      date: '2025-01-09',
      startTime: '22:00',
      endTime: '06:00',
      role: 'security',
      status: 'scheduled',
    },
    // Add more shifts...
  ]);

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'security':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      case 'bartender':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      case 'server':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'host':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'manager':
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
              Staff Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your venue staff and schedules
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'staff'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              Staff
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              Schedule
            </button>
          </div>
        </div>

        {/* Staff List */}
        {activeTab === 'staff' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search staff..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as Role | 'all')}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="security">Security</option>
                    <option value="bartender">Bartender</option>
                    <option value="server">Server</option>
                    <option value="host">Host</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddStaff(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <UserPlus size={20} />
                  Add Staff
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Shift
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {staffMembers
                    .filter(
                      (staff) =>
                        (roleFilter === 'all' || staff.role === roleFilter) &&
                        staff.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((staff) => (
                      <tr
                        key={staff.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-600 dark:text-gray-300 font-medium">
                                {staff.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {staff.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Since {new Date(staff.startDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                              staff.role
                            )}`}
                          >
                            {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {staff.email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {staff.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              staff.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
                            }`}
                          >
                            {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {staff.shift === 'day' ? '9:00 - 17:00' : '17:00 - 1:00'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                              <Trash2 size={16} />
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

        {/* Schedule */}
        {activeTab === 'schedule' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  Previous Week
                </button>
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  January 8 - 14, 2025
                </span>
                <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  Next Week
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Calendar size={20} />
                Add Shift
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-4 min-w-[800px]">
                <div className="sticky left-0 bg-white dark:bg-gray-800">
                  <div className="h-20" />
                  {['Security', 'Bartender', 'Server', 'Host', 'Manager'].map(
                    (role) => (
                      <div
                        key={role}
                        className="h-20 flex items-center font-medium text-gray-600 dark:text-gray-300"
                      >
                        {role}
                      </div>
                    )
                  )}
                </div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day}>
                    <div className="h-20 flex flex-col items-center justify-center border-l border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {day}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Jan {8 + ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(day)}
                      </span>
                    </div>
                    {['security', 'bartender', 'server', 'host', 'manager'].map(
                      (role) => (
                        <div
                          key={role}
                          className="h-20 border-l border-gray-200 dark:border-gray-700 relative"
                        >
                          {shifts
                            .filter(
                              (shift) =>
                                shift.role === role &&
                                new Date(shift.date).getDay() ===
                                  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(day)
                            )
                            .map((shift) => (
                              <div
                                key={shift.id}
                                className={`absolute top-2 left-2 right-2 p-2 rounded text-xs ${getRoleColor(
                                  shift.role
                                )}`}
                              >
                                <div className="font-medium">
                                  {staffMembers.find((s) => s.id === shift.staffId)?.name}
                                </div>
                                <div>
                                  {shift.startTime} - {shift.endTime}
                                </div>
                              </div>
                            ))}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
