'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, ChevronDown, Sparkles } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import TypeWriter from '@/components/ui/TypeWriter';
import dynamic from 'next/dynamic';
import { personalInfo } from '@/lib/data';

const SplineSceneBasic = dynamic(() => import('@/components/ui/demo'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      window.dispatchEvent(new CustomEvent('app-loaded'));
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">


      {/* Right side absolute showcase - full height and width of the right half */}
      {isDesktop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="absolute inset-0 w-full h-full z-0 hidden lg:block pointer-events-auto"
        >
          <SplineSceneBasic />
        </motion.div>
      )}

      <div className="max-w-[90rem] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-24 pb-20 relative z-10 pointer-events-none">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative z-10 lg:col-span-5 pointer-events-auto"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8
              bg-zinc-100 dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-800
              shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-text-secondary">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-6"
          >
            <span className="text-text-primary">{personalInfo.name.split(' ')[0]}</span>
            <br />
            <span className="text-text-secondary">{personalInfo.name.split(' ')[1]}</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl sm:text-2xl lg:text-[1.7rem] mb-4 font-medium"
          >
            <TypeWriter words={personalInfo.subtitles} />
          </motion.div>

          {/* Tagline */}
          {personalInfo.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-base text-text-secondary max-w-md mb-10 leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <GlassButton 
              variant="primary" 
              href="#projects" 
              size="lg"
              ariaLabel="View my portfolio projects"
              className="!bg-gradient-to-r !from-yellow-400 !to-amber-500 hover:!from-yellow-300 hover:!to-amber-400 !text-black !border-yellow-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_22px_rgba(245,158,11,0.35)] transition-all duration-300"
            >
              <Sparkles size={16} />
              View Projects
              <ArrowRight size={16} />
            </GlassButton>
            <GlassButton 
              variant="secondary" 
              href={personalInfo.resumeUrl} 
              size="lg"
              ariaLabel="Download my resume PDF"
              className="!bg-yellow-500/10 dark:!bg-yellow-500/5 hover:!bg-yellow-500/20 !text-yellow-600 dark:!text-yellow-400 !border-yellow-500/40 dark:!border-yellow-500/20 transition-all duration-300"
            >
              <Download size={16} />
              Resume
            </GlassButton>
            <GlassButton 
              variant="ghost" 
              href="#contact" 
              size="lg"
              ariaLabel="Send me a message - go to contact section"
              className="!text-yellow-600 dark:!text-yellow-400 hover:!bg-yellow-500/10 hover:!border-yellow-500/30 transition-all duration-300"
            >
              <Send size={16} />
              Contact
            </GlassButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/50 font-medium">Scroll</span>
          <ChevronDown size={16} className="text-text-secondary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
