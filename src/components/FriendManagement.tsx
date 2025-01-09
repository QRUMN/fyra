import React, { useState } from 'react';
import { Search, UserPlus, Users, X } from 'lucide-react';
import { useSocial } from '../context/SocialContext';

export default function FriendManagement() {
  const { friends, groups, addFriend, removeFriend, createGroup } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedFriends.length === 0) return;
    
    const selectedFriendObjects = friends.filter(f => selectedFriends.includes(f.id));
    createGroup(groupName, selectedFriendObjects);
    
    setGroupName('');
    setSelectedFriends([]);
    setShowCreateGroup(false);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Friends</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateGroup(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Users size={20} />
              Create Group
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search friends..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Friend List */}
      <div className="p-4 space-y-4">
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{friend.name}</h3>
                <span className={`text-sm ${
                  friend.status === 'online'
                    ? 'text-green-500'
                    : friend.status === 'at-venue'
                    ? 'text-purple-500'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {friend.status === 'at-venue'
                    ? 'At ' + friend.currentVenue
                    : friend.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showCreateGroup && (
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFriends([...selectedFriends, friend.id]);
                    } else {
                      setSelectedFriends(selectedFriends.filter(id => id !== friend.id));
                    }
                  }}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                />
              )}
              <button
                onClick={() => removeFriend(friend.id)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Group
              </h3>
              <button
                onClick={() => {
                  setShowCreateGroup(false);
                  setSelectedFriends([]);
                }}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name"
              className="w-full px-4 py-2 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Select friends to add to the group:
            </p>

            <div className="max-h-60 overflow-y-auto mb-4">
              {selectedFriends.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedFriends.map(id => {
                    const friend = friends.find(f => f.id === id);
                    if (!friend) return null;
                    return (
                      <span
                        key={friend.id}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm flex items-center gap-2"
                      >
                        {friend.name}
                        <button
                          onClick={() => setSelectedFriends(selectedFriends.filter(fid => fid !== id))}
                          className="p-1 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-full"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateGroup(false);
                  setSelectedFriends([]);
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!groupName.trim() || selectedFriends.length === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
