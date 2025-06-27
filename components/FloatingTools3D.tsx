'use client';

import { useEffect, useRef, useState } from 'react';

interface FloatingTools3DProps {
  isVisible: boolean;
}

export default function FloatingTools3D({ isVisible }: FloatingTools3DProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 3D Floating Tools - CSS-basierte Lösung für bessere Performance */}
      
      {/* Hammer - Top Left */}
      <div 
        className="absolute top-[15%] left-[8%] w-16 h-16 opacity-80 animate-[float3D_6s_ease-in-out_infinite]"
        style={{ animationDelay: '0s' }}
      >
        <div className="w-full h-full transform-gpu perspective-1000">
          <div className="hammer-3d relative w-full h-full animate-[rotate3D_8s_linear_infinite]">
            <svg viewBox="0 0 64 64" className="w-full h-full text-orange-400 drop-shadow-2xl">
              <defs>
                <linearGradient id="hammerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              {/* Hammer Head */}
              <rect x="10" y="20" width="24" height="12" fill="url(#hammerGradient)" rx="2"/>
              <rect x="8" y="18" width="28" height="16" fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.5" rx="3"/>
              {/* Handle */}
              <rect x="32" y="26" width="24" height="4" fill="#92400e" rx="2"/>
              <rect x="30" y="24" width="28" height="8" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.3" rx="4"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Schraubendreher - Top Right */}
      <div 
        className="absolute top-[25%] right-[12%] w-12 h-12 opacity-75 animate-[float3D_5s_ease-in-out_infinite]"
        style={{ animationDelay: '1s' }}
      >
        <div className="w-full h-full transform-gpu perspective-1000">
          <div className="relative w-full h-full animate-[rotate3D_10s_linear_infinite_reverse]">
            <svg viewBox="0 0 48 48" className="w-full h-full text-blue-400 drop-shadow-2xl">
              <defs>
                <linearGradient id="screwdriverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              {/* Handle */}
              <rect x="8" y="18" width="16" height="6" fill="url(#screwdriverGradient)" rx="3"/>
              {/* Shaft */}
              <rect x="24" y="21" width="12" height="2" fill="#64748b"/>
              {/* Tip */}
              <rect x="36" y="22" width="4" height="1" fill="#374151"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Säge - Bottom Left */}
      <div 
        className="absolute bottom-[20%] left-[15%] w-20 h-20 opacity-70 animate-[float3D_7s_ease-in-out_infinite]"
        style={{ animationDelay: '2s' }}
      >
        <div className="w-full h-full transform-gpu perspective-1000">
          <div className="relative w-full h-full animate-[rotate3D_12s_linear_infinite]">
            <svg viewBox="0 0 80 80" className="w-full h-full text-yellow-400 drop-shadow-2xl">
              <defs>
                <linearGradient id="sawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              {/* Saw Blade */}
              <path d="M15 25 L55 25 L55 35 L15 35 Z" fill="url(#sawGradient)"/>
              <path d="M15 25 L17 22 L19 25 L21 22 L23 25 L25 22 L27 25 L29 22 L31 25 L33 22 L35 25 L37 22 L39 25 L41 22 L43 25 L45 22 L47 25 L49 22 L51 25 L53 22 L55 25" 
                    stroke="#b45309" strokeWidth="1" fill="none"/>
              {/* Handle */}
              <rect x="8" y="28" width="12" height="6" fill="#92400e" rx="2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Schraubenschlüssel - Middle Right */}
      <div 
        className="absolute top-[50%] right-[8%] w-14 h-14 opacity-80 animate-[float3D_8s_ease-in-out_infinite]"
        style={{ animationDelay: '3s' }}
      >
        <div className="w-full h-full transform-gpu perspective-1000">
          <div className="relative w-full h-full animate-[rotate3D_9s_linear_infinite_reverse]">
            <svg viewBox="0 0 56 56" className="w-full h-full text-green-400 drop-shadow-2xl">
              <defs>
                <linearGradient id="wrenchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              {/* Wrench Body */}
              <path d="M8 24 L40 24 L40 32 L8 32 Z" fill="url(#wrenchGradient)"/>
              {/* Head */}
              <circle cx="42" cy="28" r="6" fill="none" stroke="#16a34a" strokeWidth="2"/>
              <circle cx="42" cy="28" r="3" fill="none" stroke="#16a34a" strokeWidth="1"/>
              {/* Handle End */}
              <circle cx="8" cy="28" r="4" fill="#166534"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bohrmaschine - Bottom Right */}
      <div 
        className="absolute bottom-[15%] right-[20%] w-18 h-18 opacity-75 animate-[float3D_6s_ease-in-out_infinite]"
        style={{ animationDelay: '4s' }}
      >
        <div className="w-full h-full transform-gpu perspective-1000">
          <div className="relative w-full h-full animate-[rotate3D_11s_linear_infinite]">
            <svg viewBox="0 0 72 72" className="w-full h-full text-red-400 drop-shadow-2xl">
              <defs>
                <linearGradient id="drillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              {/* Drill Body */}
              <rect x="12" y="26" width="24" height="12" fill="url(#drillGradient)" rx="6"/>
              {/* Chuck */}
              <rect x="36" y="30" width="8" height="4" fill="#64748b" rx="2"/>
              {/* Bit */}
              <rect x="44" y="31" width="12" height="2" fill="#374151"/>
              {/* Handle */}
              <rect x="18" y="38" width="6" height="8" fill="#7f1d1d" rx="3"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Maßband - Center Left */}
      <div 
        className="absolute top-[40%] left-[5%] w-10 h-10 opacity-85 animate-[float3D_5.5s_ease-in-out_infinite]"
        style={{ animationDelay: '5s' }}
      >
        <div className="w-full h-full transform-gpu perspective-1000">
          <div className="relative w-full h-full animate-[rotate3D_7s_linear_infinite_reverse]">
            <svg viewBox="0 0 40 40" className="w-full h-full text-purple-400 drop-shadow-2xl">
              <defs>
                <linearGradient id="tapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              {/* Tape Measure Body */}
              <rect x="8" y="8" width="24" height="16" fill="url(#tapeGradient)" rx="4"/>
              <rect x="10" y="10" width="20" height="12" fill="none" stroke="#581c87" strokeWidth="1"/>
              {/* Tape */}
              <rect x="32" y="14" width="6" height="4" fill="#fbbf24" rx="1"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 