'use client';

import { useState } from 'react';
import { BRAND_COLORS } from '@/constants';

interface AvatarProps {
  avatarUrl?: string;
  initials?: string;
  name: string;
  status: string;
  isLoading?: boolean;
}

export function Avatar({ avatarUrl, initials, name, status, isLoading }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const showImage = avatarUrl && !imageError && !isLoading;
  const showInitials = !showImage;

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full relative overflow-hidden">
        {showImage && (
          <img
            src={avatarUrl}
            alt={`${name} profile`}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        
        {showInitials && (
          <div 
            className={`w-full h-full text-white flex items-center justify-center font-medium transition-opacity duration-200 ${
              isLoading ? 'opacity-50' : 'opacity-100'
            }`}
            style={{ backgroundColor: BRAND_COLORS.avatar }}
          >
            {initials || name.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
        )}
      </div>
      
      <div>
        <h2 className={`font-medium transition-opacity duration-200 ${
          isLoading ? 'opacity-50' : 'opacity-100'
        }`}>
          {name}
        </h2>
        <p className="text-gray-600 text-sm">
          <span style={{color: '#00e9ff'}}>• </span>
          {status}
        </p>
      </div>
    </div>
  );
}