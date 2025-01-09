import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Flag,
  Filter,
  Camera,
  Image as ImageIcon,
  X,
  ChevronDown,
  Search,
} from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  review: string;
  images?: string[];
  date: string;
  helpful: number;
  reply?: {
    from: string;
    message: string;
    date: string;
  };
  tags: string[];
}

interface RatingBreakdown {
  overall: number;
  food: number;
  service: number;
  value: number;
  atmosphere: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function RatingsReviews() {
  const [filter, setFilter] = useState<'all' | 'positive' | 'critical'>('all');
  const [sort, setSort] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const ratingBreakdown: RatingBreakdown = {
    overall: 4.5,
    food: 4.7,
    service: 4.3,
    value: 4.4,
    atmosphere: 4.6,
    distribution: {
      5: 150,
      4: 80,
      3: 20,
      2: 5,
      1: 3,
    },
  };

  const reviews: Review[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'John D.',
      userAvatar: '👨',
      rating: 5,
      review: 'Amazing late night spot! The burgers are incredible and the service is always top-notch.',
      images: ['/images/reviews/review1-1.jpg', '/images/reviews/review1-2.jpg'],
      date: '2025-01-08',
      helpful: 24,
      tags: ['Great Food', 'Quick Service'],
      reply: {
        from: "Night Owl's Diner",
        message: 'Thank you for your wonderful review! We're glad you enjoyed your meal.',
        date: '2025-01-09',
      },
    },
    // More reviews...
  ];

  const getTotalReviews = () => {
    return Object.values(ratingBreakdown.distribution).reduce((a, b) => a + b, 0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prev) => [...prev, ...files].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Overall Rating
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                {ratingBreakdown.overall}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(ratingBreakdown.overall)
                          ? 'text-yellow-500'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill={i < Math.floor(ratingBreakdown.overall) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on {getTotalReviews()} reviews
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {Object.entries(ratingBreakdown.distribution)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="w-4 text-sm text-gray-500 dark:text-gray-400">
                      {rating}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${(count / getTotalReviews()) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-500 dark:text-gray-400">
                      {Math.round((count / getTotalReviews()) * 100)}%
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Category Ratings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Rating Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(ratingBreakdown)
                .filter(([key]) => key !== 'distribution')
                .map(([category, rating]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 capitalize">
                      {category}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(rating)
                                ? 'text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                            fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm"
          >
            <option value="all">All Reviews</option>
            <option value="positive">Positive Only</option>
            <option value="critical">Critical Reviews</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        <button
          onClick={() => setShowReviewForm(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl">
                {review.userAvatar}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {review.userName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                            fill={i < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                    <Flag size={16} />
                  </button>
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300">{review.review}</p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {review.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <ThumbsUp size={16} />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MessageCircle size={16} />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>

                {review.reply && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-2">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {review.reply.from}
                        </h5>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {review.reply.message}
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.reply.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Write a Review
              </h3>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Rating Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Overall Rating
                </label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      className="text-gray-300 dark:text-gray-600 hover:text-yellow-500"
                    >
                      <Star size={24} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add Photos
                </label>
                <div className="flex flex-wrap gap-4">
                  {selectedImages.map((_, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {selectedImages.length < 5 && (
                    <label className="w-20 h-20 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                      <Camera className="text-gray-400" size={24} />
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Add Photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
