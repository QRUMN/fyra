import React, { createContext, useContext, useState } from 'react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'at-venue';
  currentVenue?: string;
}

interface Group {
  id: string;
  name: string;
  members: Friend[];
  events: string[];
  chatHistory: ChatMessage[];
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'location' | 'event';
  metadata?: any;
}

interface Post {
  id: string;
  userId: string;
  venueId: string;
  content: string;
  images: string[];
  likes: number;
  comments: Comment[];
  timestamp: string;
  type: 'check-in' | 'photo' | 'review' | 'event-share';
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

interface SocialContextType {
  friends: Friend[];
  groups: Group[];
  feed: Post[];
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
  createGroup: (name: string, members: Friend[]) => void;
  addToGroup: (groupId: string, friend: Friend) => void;
  sendMessage: (groupId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  createPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments'>) => void;
  likePost: (postId: string) => void;
  commentOnPost: (postId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [feed, setFeed] = useState<Post[]>([]);

  const addFriend = (friend: Friend) => {
    setFriends(prev => [...prev, friend]);
  };

  const removeFriend = (friendId: string) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  const createGroup = (name: string, members: Friend[]) => {
    const newGroup: Group = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      members,
      events: [],
      chatHistory: [],
    };
    setGroups(prev => [...prev, newGroup]);
  };

  const addToGroup = (groupId: string, friend: Friend) => {
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, members: [...group.members, friend] }
          : group
      )
    );
  };

  const sendMessage = (groupId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, chatHistory: [...group.chatHistory, newMessage] }
          : group
      )
    );
  };

  const createPost = (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments'>) => {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    setFeed(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    setFeed(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const commentOnPost = (postId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => {
    const newComment: Comment = {
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setFeed(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <SocialContext.Provider
      value={{
        friends,
        groups,
        feed,
        addFriend,
        removeFriend,
        createGroup,
        addToGroup,
        sendMessage,
        createPost,
        likePost,
        commentOnPost,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
