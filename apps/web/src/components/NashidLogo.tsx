import React from 'react';

interface NashidLogoProps {
  size?: number;
  className?: string;
}

export const NashidLogo: React.FC<NashidLogoProps> = ({ size = 26, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`nashid-emblem-svg ${className}`}
    >
      <defs>
        <linearGradient id="nashidEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="45%" stopColor="#FFBB00" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="nashidGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#FFBB00" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#nashidGlowFilter)">
        {/* 5-bar soundwave acoustic equalizer */}
        <rect x="3" y="11" width="3.2" height="10" rx="1.6" fill="url(#nashidEmblemGrad)" />
        <rect x="9.2" y="6" width="3.2" height="20" rx="1.6" fill="url(#nashidEmblemGrad)" />
        <rect x="15.4" y="2" width="3.2" height="28" rx="1.6" fill="url(#nashidEmblemGrad)" />
        <rect x="21.6" y="6" width="3.2" height="20" rx="1.6" fill="url(#nashidEmblemGrad)" />
        <rect x="27.8" y="11" width="3.2" height="10" rx="1.6" fill="url(#nashidEmblemGrad)" />
      </g>
    </svg>
  );
};
