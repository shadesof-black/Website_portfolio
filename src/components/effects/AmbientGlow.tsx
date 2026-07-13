'use client';

export default function AmbientGlow() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background transition-colors duration-500" aria-hidden="true">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 framer-grid opacity-80" />

      {/* Soft Orange Glow */}
      <div 
        className="absolute top-[20%] -left-[10%] w-[70vw] h-[70vh] rounded-full opacity-[0.05] dark:opacity-[0.06] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #FF8B3D 0%, transparent 80%)',
        }}
      />

      {/* Soft Blue Glow */}
      <div 
        className="absolute bottom-[20%] -right-[10%] w-[80vw] h-[80vh] rounded-full opacity-[0.07] dark:opacity-[0.08] blur-[130px]"
        style={{
          background: 'radial-gradient(circle, var(--accent-blue) 0%, transparent 80%)',
        }}
      />
    </div>
  );
}
