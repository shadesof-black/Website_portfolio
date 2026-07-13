'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let raf: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,139,61,0.04), rgba(88,185,255,0.04), transparent 70%)`;
        glow.style.opacity = '1';
      });
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-500 cursor-glow-layer"
      aria-hidden="true"
    />
  );
}
