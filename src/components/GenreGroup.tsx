import React from 'react';

interface GenreGroupProps {
  name: string;
  memberCount: number;
  activeNow: number;
  color: string;
  image: string;
}

export default function GenreGroup({ name, memberCount, activeNow, color, image }: GenreGroupProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-white/5 hover:bg-brand-white/10 transition-colors cursor-pointer group">
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-brand-dark dark:text-brand-white group-hover:text-brand-red dark:group-hover:text-brand-lime transition-colors">
          {name}
        </h4>
        <div className="text-sm text-brand-olive dark:text-brand-blue">
          {memberCount.toLocaleString()} members • {activeNow} active now
        </div>
      </div>
    </div>
  );
}