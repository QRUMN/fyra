import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, MapPin, Calendar, Users, Plus } from 'lucide-react';
import { useSocial } from '../context/SocialContext';

interface GroupChatProps {
  groupId: string;
}

export default function GroupChat({ groupId }: GroupChatProps) {
  const { groups, sendMessage } = useSocial();
  const [message, setMessage] = useState('');
  const [showActions, setShowActions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const group = groups.find(g => g.id === groupId);
  if (!group) return null;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [group.chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    sendMessage(groupId, {
      senderId: 'current-user', // Replace with actual user ID
      content: message,
      type: 'text',
    });
    
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
              {group.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">{group.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {group.members.length} members
              </p>
            </div>
          </div>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Users size={20} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {group.chatHistory.map((msg) => {
          const isCurrentUser = msg.senderId === 'current-user';
          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                {!isCurrentUser && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    User Name
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {msg.type === 'text' && <p>{msg.content}</p>}
                  {msg.type === 'image' && (
                    <img
                      src={msg.content}
                      alt="Shared"
                      className="rounded-lg max-w-full"
                    />
                  )}
                  {msg.type === 'location' && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} />
                      <span>Shared location</span>
                    </div>
                  )}
                  {msg.type === 'event' && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} />
                      <span>Shared event</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <Plus size={20} />
            </button>
            <button
              onClick={handleSend}
              className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="absolute bottom-20 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex gap-2">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Image size={20} />
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <MapPin size={20} />
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Calendar size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
