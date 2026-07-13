'use client';
import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  href?: string;
  onClick?: () => void;
  magnetic?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export default function GlassButton({
  children, variant = 'primary', className = '', href, onClick, magnetic = true, size = 'md', ariaLabel
}: GlassButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current || !magnetic) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0, 0)';
    }
  };

  const sizeClasses = {
    sm: 'px-5 py-2 text-xs rounded-full',
    md: 'px-7 py-3 text-sm rounded-full',
    lg: 'px-9 py-4 text-base rounded-full',
  };

  const variants = {
    primary: `bg-slate-900 dark:bg-white text-white dark:text-black border border-slate-950 dark:border-white
      shadow-sm hover:bg-slate-800 dark:hover:bg-zinc-100`,
    secondary: `bg-zinc-100 dark:bg-zinc-900 text-text-primary border border-zinc-200 dark:border-zinc-800
      shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-800`,
    ghost: `bg-transparent text-text-secondary rounded-full
      hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-text-primary border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800`,
  };

  const content = (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 ease-out cursor-pointer select-none overflow-hidden
        ${sizeClasses[size]} ${variants[variant]} ${className}`}
      style={{ transitionProperty: 'transform, box-shadow, background, border-color', transitionDuration: '0.2s' }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        download={href.endsWith('.pdf') ? true : undefined}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return <button onClick={onClick} type="button" aria-label={ariaLabel}>{content}</button>;
}
