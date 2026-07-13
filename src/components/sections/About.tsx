'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  User, 
  Code2, 
  Trophy, 
  Brain, 
  Bot, 
  TrendingUp, 
  Settings, 
  Target, 
  Database,
  Sparkles,
  FileCode
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionReveal from '@/components/ui/SectionReveal';

// --- ANIMATED COUNTER ---
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-extrabold tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function About() {

  return (
    <section id="about" className="relative py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-blue-600 dark:text-blue-400 mb-4">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight">
              Building Intelligent Systems.
              <span className="block text-blue-600 dark:text-blue-500 mt-1">Creating Real Impact.</span>
            </h2>
          </div>
        </SectionReveal>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Profile Info Card (takes 3 cols) */}
          <SectionReveal className="lg:col-span-3 h-full" delay={0.1}>
            <GlassCard variant="blue" className="p-8 sm:p-10 h-full flex flex-col justify-between">
              
              {/* Row 1: Who I Am */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                    <User size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">Who I Am</h3>
                </div>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-[15px] font-normal">
                  I'm a multidisciplinary engineer passionate about building intelligent systems
                  that connect the physical and digital worlds. With a strong foundation in
                  mechanical engineering and deep expertise in AI, robotics, and embedded
                  systems, I design solutions that push the boundaries of what machines can do.
                  From autonomous robots to AI-powered applications, I bring ideas to life through
                  clean code, robust engineering, and relentless curiosity. I believe in building
                  technology that matters — systems that are not just smart, but truly intelligent.
                </p>
              </div>

              {/* Divider 1 */}
              <div className="my-6 border-t border-zinc-200/50 dark:border-zinc-800/50" />

              {/* Row 2: What I Do */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Code2 size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">What I Do</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Item 1: AI */}
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/50 hover:border-blue-500/25 dark:hover:border-blue-400/25 transition-colors duration-300">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl mb-3 shrink-0">
                      <Brain size={20} />
                    </div>
                    <span className="text-[11px] font-semibold text-text-primary leading-tight">
                      AI & Machine<br />Learning
                    </span>
                  </div>

                  {/* Item 2: Robotics */}
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/50 hover:border-blue-500/25 dark:hover:border-blue-400/25 transition-colors duration-300">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl mb-3 shrink-0">
                      <Bot size={20} />
                    </div>
                    <span className="text-[11px] font-semibold text-text-primary leading-tight">
                      Robotics &<br />Embedded Systems
                    </span>
                  </div>

                  {/* Item 3: RAG */}
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/50 hover:border-blue-500/25 dark:hover:border-blue-400/25 transition-colors duration-300">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl mb-3 shrink-0">
                      <Database size={20} />
                    </div>
                    <span className="text-[11px] font-semibold text-text-primary leading-tight">
                      RAG & NLP<br />Applications
                    </span>
                  </div>

                  {/* Item 4: Full-Stack */}
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/50 hover:border-blue-500/25 dark:hover:border-blue-400/25 transition-colors duration-300">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl mb-3 shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <span className="text-[11px] font-semibold text-text-primary leading-tight">
                      End-to-End<br />Workflow
                    </span>
                  </div>
                </div>
              </div>

            </GlassCard>
          </SectionReveal>

          {/* RIGHT COLUMN: Metric Widgets (takes 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6 w-full h-full">
            
            {/* Widget 1: Total Impact (Royal Blue Banner) */}
            <SectionReveal delay={0.2}>
              <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 dark:from-blue-950 dark:to-indigo-950/90 text-white p-6 sm:p-7 rounded-[32px] shadow-2xl relative overflow-hidden group select-none border border-blue-500/10 dark:border-white/5 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-blue-500/15">
                {/* Specs Highlight reflection */}
                <div className="absolute -inset-[50%] bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none rotate-[25deg] translate-x-[-10%] translate-y-[-10%] opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <TrendingUp className="absolute right-6 top-6 text-blue-100/20 w-12 h-12 pointer-events-none" />

                <span className="text-[10px] font-bold tracking-widest text-blue-100 uppercase block">
                  Total Impact
                </span>
                
                <h3 className="text-3xl font-extrabold mt-3 tracking-tight flex items-baseline gap-2">
                  <AnimatedCounter target={3} suffix="+" />
                  <span className="text-sm font-semibold text-blue-100/90 tracking-wide font-sans">
                    Years in Engineering
                  </span>
                </h3>

                {/* Impact Stat Grid */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-3 border-t border-white/20 mt-6 pt-6">
                  {/* projects built */}
                  <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-white/5 border border-white/5">
                    <FileCode size={18} className="text-blue-100/80 mb-2" />
                    <span className="text-lg font-bold block leading-none">
                      <AnimatedCounter target={10} suffix="+" />
                    </span>
                    <span className="text-[10px] text-blue-200/80 uppercase font-semibold tracking-wider mt-1.5 leading-tight">
                      Projects Built
                    </span>
                  </div>

                  {/* technologies */}
                  <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-white/5 border border-white/5">
                    <Settings size={18} className="text-blue-100/80 mb-2" />
                    <span className="text-lg font-bold block leading-none">
                      <AnimatedCounter target={30} suffix="+" />
                    </span>
                    <span className="text-[10px] text-blue-200/80 uppercase font-semibold tracking-wider mt-1.5 leading-tight">
                      Technologies
                    </span>
                  </div>

                  {/* competitions */}
                  <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-white/5 border border-white/5">
                    <Trophy size={18} className="text-blue-100/80 mb-2" />
                    <span className="text-lg font-bold block leading-none">
                      <AnimatedCounter target={3} suffix="+" />
                    </span>
                    <span className="text-[10px] text-blue-200/80 uppercase font-semibold tracking-wider mt-1.5 leading-tight">
                      Awards Won
                    </span>
                  </div>

                  {/* years experience */}
                  <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-white/5 border border-white/5">
                    <Target size={18} className="text-blue-100/80 mb-2" />
                    <span className="text-lg font-bold block leading-none">
                      <AnimatedCounter target={3} suffix="+" />
                    </span>
                    <span className="text-[10px] text-blue-200/80 uppercase font-semibold tracking-wider mt-1.5 leading-tight">
                      Years Exp.
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>


            {/* Widget 3: Let's Connect */}
            <SectionReveal delay={0.4}>
              <GlassCard variant="blue" className="p-6 sm:p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                      <Sparkles size={18} />
                    </div>
                    <h3 className="text-base font-bold text-text-primary">Freelance & Consulting</h3>
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    <span className="text-[13px] font-bold text-text-primary">Let's build something together</span>
                    <p className="text-[11px] text-text-secondary/90 leading-relaxed">
                      Available for hire on premium 3D web experiences, interactive designs, or custom end-to-end AI pipelines. Let's transform your vision.
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_12px_rgba(59,130,246,0.25)] cursor-pointer"
                  >
                    Hire me
                  </a>
                </div>
              </GlassCard>
            </SectionReveal>

          </div>

        </div>

        {/* Full-width Centered Education Caps Pill */}
        <div className="flex justify-center mt-12 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-6 py-4 sm:py-3.5 rounded-[24px] sm:rounded-full bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-text-secondary text-center select-none shadow-sm max-w-full">
            <div className="flex items-center gap-2 shrink-0">
              <GraduationCap size={18} className="text-blue-500 dark:text-blue-400 shrink-0" />
              <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px] sm:text-xs">Education</span>
            </div>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
            <span className="font-medium text-text-primary">B.Tech in Mechanical Engineering</span>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-text-secondary">UIET, Panjab University</span>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
            <span className="font-semibold text-blue-500 dark:text-blue-400">2023 – 2027</span>
          </div>
        </div>

      </div>
    </section>
  );
}
