import React, { useState } from 'react';
import {
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Copy,
  MessageCircle,
  Heart,
  Check,
} from 'lucide-react';

interface SocialShareProps {
  type: 'review' | 'restaurant' | 'order';
  itemId: string;
  title: string;
  description: string;
  image?: string;
  url: string;
}

export default function SocialShare({
  type,
  itemId,
  title,
  description,
  image,
  url,
}: SocialShareProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: `Check out ${title} on FYRA`,
    text: description,
    url: url,
  };

  const handleShare = async (platform: string) => {
    switch (platform) {
      case 'native':
        try {
          await navigator.share(shareData);
        } catch (err) {
          setShowShareMenu(true);
        }
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            description
          )}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => handleShare('native')}
        className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <Share2 size={20} />
      </button>

      {showShareMenu && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Facebook size={16} className="mr-3" />
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Twitter size={16} className="mr-3" />
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {copied ? (
                <Check size={16} className="mr-3 text-green-500" />
              ) : (
                <Copy size={16} className="mr-3" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
