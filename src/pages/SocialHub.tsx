import React, { useState } from 'react';
import { MessageCircle, Users, Rss } from 'lucide-react';
import Social from './Social';
import GroupChat from '../components/GroupChat';
import FriendManagement from '../components/FriendManagement';
import { useSocial } from '../context/SocialContext';

type Tab = 'feed' | 'chat' | 'friends';

export default function SocialHub() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { groups } = useSocial();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:top-16 md:left-0 md:w-16 md:bottom-0 md:border-r md:border-t-0">
        <div className="flex md:flex-col items-center justify-around h-16 md:h-full md:pt-4">
          <button
            onClick={() => setActiveTab('feed')}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === 'feed'
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Rss size={24} />
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === 'chat'
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <MessageCircle size={24} />
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === 'friends'
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Users size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-16 md:pb-0 md:pl-16">
        {activeTab === 'feed' && <Social />}
        
        {activeTab === 'chat' && (
          <div className="h-[calc(100vh-4rem)] p-4 grid md:grid-cols-[320px,1fr] gap-4">
            {/* Group List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden md:flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Groups
              </h2>
              <div className="space-y-2 overflow-y-auto">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroupId(group.id)}
                    className={`w-full p-3 rounded-lg transition-colors flex items-center gap-3 ${
                      selectedGroupId === group.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                      {group.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {group.members.length} members
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedGroupId ? (
              <GroupChat groupId={selectedGroupId} />
            ) : (
              <div className="hidden md:flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                  <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a group to start chatting
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a group from the list to view messages
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="p-4 max-w-3xl mx-auto">
            <FriendManagement />
          </div>
        )}
      </div>
    </div>
  );
}
