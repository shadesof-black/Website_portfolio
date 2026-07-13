'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type GlassCardVariant = 'green' | 'blue' | 'purple' | 'amber' | 'rose';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: GlassCardVariant;
  glowColor?: string; // Keep support to prevent compilation failures elsewhere
}

const variantStyles: Record<GlassCardVariant, {
  darkBg: string;
  lightBg: string;
  darkBorder: string;
  lightBorder: string;
  glowVars: Record<string, string>;
  glowBorderColor: string;
}> = {
  green: {
    darkBg: 'dark:bg-[linear-gradient(135deg,rgba(11,66,22,0.85)_0%,rgba(18,138,29,0.7)_50%,rgba(40,230,26,0.5)_100%)]',
    lightBg: 'bg-[linear-gradient(135deg,rgba(230,248,233,0.85)_0%,rgba(210,245,215,0.8)_50%,rgba(190,238,196,0.7)_100%)]',
    darkBorder: 'dark:border-[#39FF6A]/20 dark:hover:border-[#39FF6A]/45',
    lightBorder: 'border-[#128A1D]/25 hover:border-[#128A1D]/55',
    glowBorderColor: 'border-[#39FF6A]/10 group-hover:border-[#39FF6A]/25',
    glowVars: {
      '--glow-color-base': 'rgba(57, 255, 106, 0.12)',
      '--glow-color-active': 'rgba(57, 255, 106, 0.22)',
      '--glow-color-border-base': 'rgba(57, 255, 106, 0.22)',
      '--glow-color-border-active': 'rgba(57, 255, 106, 0.45)',
    }
  },
  blue: {
    darkBg: 'dark:bg-[linear-gradient(135deg,rgba(10,30,70,0.85)_0%,rgba(15,45,100,0.7)_50%,rgba(28,75,160,0.5)_100%)]',
    lightBg: 'bg-[linear-gradient(135deg,rgba(224,242,254,0.85)_0%,rgba(200,235,253,0.8)_50%,rgba(186,225,250,0.7)_100%)]',
    darkBorder: 'dark:border-[#38BDF8]/20 dark:hover:border-[#38BDF8]/45',
    lightBorder: 'border-[#0284C7]/25 hover:border-[#0284C7]/55',
    glowBorderColor: 'border-[#38BDF8]/10 group-hover:border-[#38BDF8]/25',
    glowVars: {
      '--glow-color-base': 'rgba(56, 189, 248, 0.12)',
      '--glow-color-active': 'rgba(56, 189, 248, 0.22)',
      '--glow-color-border-base': 'rgba(56, 189, 248, 0.22)',
      '--glow-color-border-active': 'rgba(56, 189, 248, 0.45)',
    }
  },
  purple: {
    darkBg: 'dark:bg-[linear-gradient(135deg,rgba(25,10,48,0.85)_0%,rgba(42,15,75,0.7)_50%,rgba(68,22,120,0.5)_100%)]',
    lightBg: 'bg-[linear-gradient(135deg,rgba(243,232,255,0.85)_0%,rgba(235,215,255,0.8)_50%,rgba(224,198,252,0.7)_100%)]',
    darkBorder: 'dark:border-[#C084FC]/20 dark:hover:border-[#C084FC]/45',
    lightBorder: 'border-[#7C3AED]/25 hover:border-[#7C3AED]/55',
    glowBorderColor: 'border-[#C084FC]/10 group-hover:border-[#C084FC]/25',
    glowVars: {
      '--glow-color-base': 'rgba(192, 132, 252, 0.12)',
      '--glow-color-active': 'rgba(192, 132, 252, 0.22)',
      '--glow-color-border-base': 'rgba(192, 132, 252, 0.22)',
      '--glow-color-border-active': 'rgba(192, 132, 252, 0.45)',
    }
  },
  amber: {
    darkBg: 'dark:bg-[linear-gradient(135deg,rgba(60,35,5,0.85)_0%,rgba(90,50,10,0.7)_50%,rgba(145,85,15,0.5)_100%)]',
    lightBg: 'bg-[linear-gradient(135deg,rgba(254,243,199,0.85)_0%,rgba(253,230,138,0.8)_50%,rgba(252,215,105,0.7)_100%)]',
    darkBorder: 'dark:border-[#FBBF24]/20 dark:hover:border-[#FBBF24]/45',
    lightBorder: 'border-[#D97706]/25 hover:border-[#D97706]/55',
    glowBorderColor: 'border-[#FBBF24]/10 group-hover:border-[#FBBF24]/25',
    glowVars: {
      '--glow-color-base': 'rgba(251, 191, 36, 0.12)',
      '--glow-color-active': 'rgba(251, 191, 36, 0.22)',
      '--glow-color-border-base': 'rgba(251, 191, 36, 0.22)',
      '--glow-color-border-active': 'rgba(251, 191, 36, 0.45)',
    }
  },
  rose: {
    darkBg: 'dark:bg-[linear-gradient(135deg,rgba(60,10,25,0.85)_0%,rgba(85,15,38,0.7)_50%,rgba(130,22,55,0.5)_100%)]',
    lightBg: 'bg-[linear-gradient(135deg,rgba(255,228,230,0.85)_0%,rgba(254,200,208,0.8)_50%,rgba(253,170,182,0.7)_100%)]',
    darkBorder: 'dark:border-[#F43F5E]/20 dark:hover:border-[#F43F5E]/45',
    lightBorder: 'border-[#E11D48]/25 hover:border-[#E11D48]/55',
    glowBorderColor: 'border-[#F43F5E]/10 group-hover:border-[#F43F5E]/25',
    glowVars: {
      '--glow-color-base': 'rgba(244, 63, 94, 0.12)',
      '--glow-color-active': 'rgba(244, 63, 94, 0.22)',
      '--glow-color-border-base': 'rgba(244, 63, 94, 0.22)',
      '--glow-color-border-active': 'rgba(244, 63, 94, 0.45)',
    }
  }
};

export default function GlassCard({ children, className = '', variant = 'green' }: GlassCardProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-[32px] overflow-hidden backdrop-blur-[30px] -webkit-backdrop-blur-[30px]
        ${styles.lightBg} ${styles.darkBg}
        ${styles.lightBorder} ${styles.darkBorder}
        shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_10px_20px_rgba(255,255,255,0.15)]
        dark:shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_10px_20px_rgba(255,255,255,0.12)]
        animate-breathing-glow
        transition-all duration-400
        text-zinc-900 dark:text-white
        ${className}`}
      style={styles.glowVars as any}
    >
      {/* Translucent white overlay to catch light reflections */}
      <div className="absolute inset-0 bg-white/[0.04] dark:bg-white/[0.06] pointer-events-none" />

      {/* Moving Diagonal Specular Highlight Reflection */}
      <div 
        className="absolute -inset-[50%] bg-gradient-to-tr from-transparent via-white/8 dark:via-white/12 to-transparent pointer-events-none rotate-[25deg] translate-x-[-20%] translate-y-[-20%] opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-reflection-move" 
        aria-hidden="true"
      />

      {/* Soft Frosted Noise Texture */}
      <div className="absolute inset-0 glass-noise pointer-events-none" />

      {/* Fine Color Edge Border */}
      <div 
        className={`absolute inset-0 rounded-[32px] border pointer-events-none transition-colors duration-400 ${styles.glowBorderColor}`}
        aria-hidden="true"
      />

      {/* Content Container (adapts text color according to visibility) */}
      <div className="relative z-10 text-zinc-900 dark:text-white">
        {children}
      </div>
    </motion.div>
  );
}
