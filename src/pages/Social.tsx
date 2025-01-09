import React, { useState } from 'react';
import { Camera, MapPin, Share2, MessageCircle, Heart, Send } from 'lucide-react';
import { useSocial } from '../context/SocialContext';

export default function Social() {
  const { feed, createPost, likePost, commentOnPost } = useSocial();
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleCreatePost = () => {
    // This would open a modal for creating a new post
    createPost({
      userId: 'current-user', // Replace with actual user ID
      venueId: 'sample-venue',
      content: '',
      images: [],
      type: 'photo',
    });
  };

  const handleComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    commentOnPost(postId, {
      userId: 'current-user', // Replace with actual user ID
      content: newComment,
    });
    setNewComment('');
    setSelectedPostId(null);
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      {/* Create Post Button */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCreatePost}
            className="flex-1 text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            What's happening tonight?
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Camera size={24} />
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <MapPin size={24} />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {feed.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">User Name</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.timestamp).toLocaleDateString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* Post Content */}
            {post.content && (
              <p className="px-4 pb-4 text-gray-900 dark:text-white">{post.content}</p>
            )}

            {/* Post Images */}
            {post.images.length > 0 && (
              <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                <img
                  src={post.images[0]}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-6">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Heart size={20} />
                <span>{post.likes}</span>
              </button>
              <button
                onClick={() => setSelectedPostId(post.id)}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <MessageCircle size={20} />
                <span>{post.comments.length}</span>
              </button>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                        User Name
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {comment.content}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.timestamp).toLocaleDateString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            {selectedPostId === post.id && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-white dark:bg-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="p-2 text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
