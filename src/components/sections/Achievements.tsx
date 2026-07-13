'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardProps {
  title: string;
  event: string;
  description: string;
  year: string;
  index: number;
  totalCards: number;
  color: string;
  imageUrl: string;
  logoUrl: string;
  techStack: string[];
}

const Card: React.FC<CardProps> = ({ 
  title, 
  event, 
  description, 
  year, 
  index, 
  totalCards, 
  color, 
  imageUrl, 
  logoUrl, 
  techStack 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.04;

    // Set initial state
    gsap.set(card, {
      scale: 1,
      transformOrigin: "center top"
    });

    // Create scroll trigger for stacking effect
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top"
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          isolation: 'isolate',
          top: `calc(5vh + ${index * 24}px)`,
          transformOrigin: 'top'
        }}
        className="w-[92%] sm:w-[85%] md:w-[75%] lg:w-[68%] h-[560px] sm:h-[480px] md:h-[420px] card-content"
      >
        {/* Electric Border Effect using conic gradient */}
        <div
          style={{
            position: 'absolute',
            inset: '-2.5px',
            borderRadius: '26px',
            padding: '2.5px',
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              ${color} 60deg,
              ${color.replace('0.8', '0.5')} 120deg,
              transparent 180deg,
              ${color.replace('0.8', '0.3')} 240deg,
              transparent 360deg
            )`,
            zIndex: -1
          }}
        />

        {/* Main Card Content */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(15, 15, 20, 0.8), rgba(5, 5, 8, 0.9))',
            backdropFilter: 'blur(30px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: `
              0 15px 40px rgba(0, 0, 0, 0.6),
              inset 0 1px 0 rgba(255, 255, 255, 0.12)
            `,
            overflow: 'hidden'
          }}
          className="flex flex-col md:flex-row"
        >
          {/* Left: Project Cover Image */}
          <div className="relative w-full md:w-[42%] h-[180px] sm:h-[220px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10 group">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 group-hover:scale-108"
              loading="lazy"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-black/20 to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
          </div>

          {/* Right: Info contents */}
          <div className="flex-1 p-5 sm:p-7 md:p-8 flex flex-col justify-between h-auto md:h-full relative z-10">
            <div className="flex flex-col gap-2.5">
              {/* Card top details */}
              <div className="flex items-center justify-between">
                <span 
                  style={{ color }}
                  className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/[0.03] border border-white/5"
                >
                  {year} Milestone
                </span>
                <div className="relative h-4.5 w-16 opacity-60 filter invert">
                  <Image 
                    src={logoUrl} 
                    alt="Logo" 
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title & Event */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight">
                  {title}
                </h3>
                <p className="text-[10px] sm:text-xs font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">
                  {event}
                </p>
              </div>

              {/* Story/Description */}
              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-300 leading-relaxed mt-1">
                {description}
              </p>
            </div>

            {/* Bottom Tech stack block */}
            <div className="flex flex-col gap-1.5 mt-4 md:mt-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Core Technologies</span>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map(tech => (
                  <span key={tech} className="px-2.5 py-0.5 rounded-full text-[9px] bg-white/[0.04] text-zinc-300 border border-white/5 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Glass reflection overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 100%)',
            pointerEvents: 'none',
            borderRadius: '24px 24px 0 0'
          }} />
        </div>
      </div>
    </div>
  );
};

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%"
        }
      }
    );
  }, []);

  // Defined achievements dataset matching your personal milestones and tech stacks
  const list = [
    {
      title: '🥇 First Place',
      event: 'IIT Mandi & NIT Kurukshetra',
      description: 'Secured 1st Position at IIT Mandi and 2nd Position at NIT Kurukshetra by developing an autonomous line-following robot using ESP32, QTR-8 sensor array, and PID control algorithms.',
      year: '2025',
      color: 'rgba(245, 158, 11, 0.8)', // Gold
      imageUrl: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?w=800&fit=crop', // Autonomous robot path cover
      logoUrl: 'https://img.icons8.com/ios-filled/100/ffffff/trophy.png',
      techStack: ['ESP32', 'PID Control', 'QTR-8 Array', 'Embedded Systems']
    },
    {
      title: '🥈 Runner Up',
      event: 'ACIC RISE Ideathon',
      description: 'Secured 2nd Position at ACIC RISE Ideathon for developing a cost-effective, gesture-controlled prosthetic arm using EMG sensors and ESP32.',
      year: '2025',
      color: 'rgba(56, 189, 248, 0.8)', // Blue
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&fit=crop',
      logoUrl: 'https://img.icons8.com/ios-filled/100/ffffff/medal.png',
      techStack: ['ESP32', 'EMG Sensors', '3D Printing', 'Embedded Systems']
    },
    {
      title: '💼 CV Intern',
      event: 'Envinova Smartech',
      description: 'Working on dataset engineering, preprocessing, and training/evaluating computer vision models for real-world applications.',
      year: '2026',
      color: 'rgba(168, 85, 247, 0.8)', // Purple
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&fit=crop', // Keep same cover image
      logoUrl: 'https://img.icons8.com/ios-filled/100/ffffff/briefcase.png',
      techStack: ['OpenCV', 'Python', 'PyTorch', 'TensorFlow', 'Image Processing']
    }
  ];

  return (
    <main 
      ref={containerRef} 
      id="achievements"
      className="relative w-full bg-transparent overflow-visible py-20"
    >
      {/* Background blueprint grid styling */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40" />
      </div>

      {/* Header title block */}
      <section className="text-center max-w-6xl mx-auto px-6 mb-10">
        <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent-blue)] dark:text-[var(--accent-blue)]/80 mb-3">
          Recognition
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
          Awards &
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-ice)]"> Achievements</span>
        </h2>
        <p className="text-sm text-zinc-500 mt-3 max-w-xl mx-auto">
          Milestones that shaped my journey through innovation, competitions, and continuous learning.
        </p>
      </section>

      {/* GSAP Stacking Cards Container */}
      <section className="relative w-full overflow-visible">
        {list.map((card, index) => (
          <Card
            key={card.title + card.year}
            title={card.title}
            event={card.event}
            description={card.description}
            year={card.year}
            index={index}
            totalCards={list.length}
            color={card.color}
            imageUrl={card.imageUrl}
            logoUrl={card.logoUrl}
            techStack={card.techStack}
          />
        ))}
      </section>
    </main>
  );
}
