'use client';
import { useState, useEffect } from 'react';

export default function GlobalLoader() {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleLoaded = () => {
      setLoaded(true);
      // Let the CSS fade-out animation play before removing from DOM
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    };

    window.addEventListener('app-loaded', handleLoaded);

    // Fallback: If Spline doesn't load or is slow, load anyway in 7 seconds
    const fallbackTimer = setTimeout(handleLoaded, 7000);

    return () => {
      window.removeEventListener('app-loaded', handleLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-[#050505] z-[9999] transition-all duration-700 ease-out select-none
        ${loaded ? 'opacity-0 pointer-events-none scale-102 blur-sm' : 'opacity-100 pointer-events-auto scale-100'}
      `}
    >
      {/* Glow Backdrop */}
      <div className="absolute w-[300px] h-[300px] bg-[#0088FF]/10 rounded-full blur-[80px] animate-pulse" />
      
      {/* Animated Logo Container */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="text-xl font-bold tracking-tight text-white flex items-center">
          <span>rahul</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] to-[#E0F2FE] animate-pulse">
            .raj
          </span>
        </div>
        
        {/* Sleek Line Progress Indicator */}
        <div className="w-24 h-0.5 bg-zinc-900 rounded-full overflow-hidden relative">
          <div
            className={`absolute top-0 left-0 h-full bg-[#0088FF] rounded-full transition-all duration-500
              ${loaded ? 'w-full' : 'w-1/2 progress-bar-shimmer'}
            `}
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .progress-bar-shimmer {
          animation: shimmer-bar 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
