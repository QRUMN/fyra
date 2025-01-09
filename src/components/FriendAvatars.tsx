import React from 'react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface FriendAvatarsProps {
  friends: Friend[];
  maxDisplay?: number;
}

export default function FriendAvatars({ friends, maxDisplay = 4 }: FriendAvatarsProps) {
  const displayFriends = friends.slice(0, maxDisplay);
  const remainingCount = friends.length - maxDisplay;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-1.5">
        {displayFriends.map((friend) => (
          <div
            key={friend.id}
            className="relative"
            title={friend.name}
          >
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-5 h-5 rounded-full border-1.5 border-white dark:border-dark-darker object-cover"
            />
          </div>
        ))}
      </div>
      {remainingCount > 0 && (
        <span className="ml-1.5 text-[10px] text-light-muted dark:text-gray-400">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}