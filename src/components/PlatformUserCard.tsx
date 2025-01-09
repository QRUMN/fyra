import React from 'react';

interface PlatformUserCardProps {
  type: string;
  title: string;
  description: string;
  onClick: () => void;
}

export default function PlatformUserCard({ type, title, description, onClick }: PlatformUserCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full p-6 rounded-2xl bg-white dark:bg-brand-dark/50 
        transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
        dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
        dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
      aria-label={`Sign up as ${title}`}
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-lg text-brand-dark dark:text-brand-white">
          {title}
        </h4>
        <p className="text-sm text-brand-olive dark:text-brand-blue leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-red/0 
        group-hover:bg-brand-red dark:group-hover:bg-brand-lime 
        transition-colors rounded-b-2xl" />
    </button>
  );
}