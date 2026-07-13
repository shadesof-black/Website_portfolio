'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CrystalIconProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export default function CrystalIcon({ children, className = '', size = 'md' }: CrystalIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative ${sizes[size]} rounded-full flex items-center justify-center
        bg-zinc-100 dark:bg-zinc-900/60
        border border-zinc-200 dark:border-zinc-800
        group/icon cursor-default
        transition-all duration-200 ${className}`}
    >
      <div className="relative z-10 text-text-primary group-hover/icon:text-slate-900 dark:group-hover/icon:text-white transition-colors duration-200">
        {children}
      </div>
    </motion.div>
  );
}
