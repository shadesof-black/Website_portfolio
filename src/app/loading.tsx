'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-[#050505] z-[9999] pointer-events-none">
      {/* Glow Backdrop */}
      <div className="absolute w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-pulse" />
      
      {/* Animated Logo Container */}
      <div className="flex flex-col items-center gap-4 relative z-10 select-none">
        <div className="text-xl font-bold tracking-tight text-white flex items-center">
          <span>rahul</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] to-[#E0F2FE] animate-pulse">
            .portfiolo
          </span>
        </div>
        
        {/* Sleek Line Progress Indicator */}
        <div className="w-24 h-0.5 bg-zinc-900 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-[#0088FF] rounded-full progress-bar-shimmer" />
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
