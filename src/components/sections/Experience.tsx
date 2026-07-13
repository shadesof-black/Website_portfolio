'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Bot, 
  Trophy, 
  Cpu, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import SectionReveal from '@/components/ui/SectionReveal';

// --- DATA STRUCTURE FOR EXPERIENCE & JOURNEY ---
interface Milestone {
  year: string;
  duration: string;
  role: string;
  org: string;
  badge: string;
  description: string[];
  techStack: string[];
  iconComponent: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
}

const milestones: Milestone[] = [
  {
    year: '2026',
    duration: 'June 2026 — Present',
    role: 'Computer Vision Intern',
    org: 'Envinova Smartech',
    badge: 'INTERNSHIP',
    gradient: 'from-orange-500 to-amber-400 dark:from-orange-600/40 dark:to-amber-500/40',
    iconComponent: Brain,
    description: [
      'Working on image annotation and dataset preparation for computer vision applications.',
      'Performing image preprocessing and manipulation to improve training data quality.',
      'Training and evaluating computer vision models for real-world use cases.',
      'Assisting in model deployment, testing, and performance validation.',
      'Collaborating with AI engineers to optimize end-to-end computer vision workflows.'
    ],
    techStack: ['OpenCV', 'Python', 'PyTorch', 'TensorFlow', 'Computer Vision', 'Image Processing']
  },
  {
    year: '2025',
    duration: '2025 — Present',
    role: 'AI Developer',
    org: 'PUAI — University RAG Chatbot',
    badge: 'AI PROJECT',
    gradient: 'from-orange-500 to-amber-500 dark:from-orange-600/40 dark:to-orange-600/40',
    iconComponent: Bot,
    description: [
      'Built an AI-powered university assistant using Retrieval-Augmented Generation (RAG).',
      'Developed semantic search using LangChain, Hugging Face, ChromaDB, and LLaMA.',
      'Designed an end-to-end document ingestion, embedding, retrieval, and question-answering pipeline.',
      'Improved answer accuracy using vector search and context-aware prompting.'
    ],
    techStack: ['Python', 'LangChain', 'LangGraph', 'Hugging Face', 'ChromaDB', 'LLMs', 'RAG']
  },
  {
    year: '2025',
    duration: '2025',
    role: 'Autonomous Robotics Engineer',
    org: 'Competition Project',
    badge: 'ACHIEVEMENT',
    gradient: 'from-amber-400 to-orange-500 dark:from-amber-500/40 dark:to-orange-500/40',
    iconComponent: Trophy,
    description: [
      '🥇 1st Position — IIT Mandi Line Following Competition',
      '🥈 2nd Position — NIT Kurukshetra Line Following Competition',
      'Designed and programmed an autonomous robot using ESP32.',
      'Implemented PID control and QTR sensor array for high-speed navigation.',
      'Optimized real-time path tracking through sensor calibration.'
    ],
    techStack: ['ESP32', 'Embedded Systems', 'PID', 'Robotics', 'Arduino']
  },
  {
    year: '2025',
    duration: '2025',
    role: 'Embedded Systems & Robotics Developer',
    org: 'Gesture-Controlled Prosthetic Arm',
    badge: 'ROBOTICS',
    gradient: 'from-orange-500 to-red-400 dark:from-orange-500/40 dark:to-red-600/40',
    iconComponent: Cpu,
    description: [
      'Developed a gesture-controlled prosthetic arm using ESP32 and EMG sensors.',
      'Built a 3D-printed prototype for assistive technology.',
      'Integrated embedded hardware with real-time muscle signal processing.',
      'Secured 2nd Position at ACIC RISE Ideathon.'
    ],
    techStack: ['ESP32', 'EMG Sensors', 'Embedded Systems', 'IoT', '3D Printing']
  }
];

// --- EXPERIENCE CARD COMPONENT (3D CRYSTAL PARALLAX TILT) ---
function ExperienceCard({ item, index, active }: { item: Milestone; index: number; active: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setCoords({ x, y });
  };

  // 3D Tilt calculations
  const rotationX = isHovered ? ((coords.y - 180) / 180) * -6 : 0; // Max 6 deg tilt
  const rotationY = isHovered ? ((coords.x - 280) / 280) * 6 : 0;

  // Dynamic shadow offsets shifting in opposite direction
  const shadowX = isHovered ? ((coords.x - 280) / 280) * -12 : 0;
  const shadowY = isHovered ? ((coords.y - 180) / 180) * -12 : 0;

  const tooltipTexts: Record<string, string> = {
    'INTERNSHIP': 'Hands-on industrial training and collaboration in computer vision pipelines.',
    'AI PROJECT': 'Deployment of custom RAG applications using LLM orchestration.',
    'ACHIEVEMENT': 'Award-winning performance in national robotics design challenges.',
    'ROBOTICS': 'Integration of embedded microcontrollers with physical robotic actuators.',
  };

  const Icon = item.iconComponent;

  // Bullet stagger variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const bulletVariants: any = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowTooltip(false);
      }}
      style={{
        transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(10px)`,
        boxShadow: isHovered 
          ? `${shadowX}px ${shadowY + 12}px 32px rgba(245, 158, 11, 0.1), 0 20px 40px rgba(0, 0, 0, 0.06)` 
          : '0 4px 20px rgba(0, 0, 0, 0.015)',
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.5s ease, box-shadow 0.5s ease',
      }}
      className={`group relative bg-white/[0.22] dark:bg-zinc-950/30 backdrop-blur-[24px] rounded-[28px] border transition-all duration-300 p-6 sm:p-8 w-full overflow-hidden select-none
        border-t-white/35 border-l-white/35 border-r-white/10 border-b-white/10
        dark:border-t-white/15 dark:border-l-white/15 dark:border-r-white/5 dark:border-b-white/5
        shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.15)]
        ${active 
          ? 'border-orange-500/40 dark:border-orange-400/30' 
          : 'hover:border-orange-500/25'
        }
      `}
    >
      {/* Crystal Shine Reflection Sweep */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 transition-transform duration-1000 ease-out translate-x-[-120%] group-hover:translate-x-[120%] bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12"
        style={{ transitionDuration: '1.4s' }}
      />

      {/* Spotlight Cursor follow gradient glow */}
      {isHovered && (
        <div
          className="absolute inset-0 -z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.09), transparent 80%)`,
          }}
        />
      )}

      {/* Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-30 select-none">
        <div className="absolute w-1 h-1 rounded-full bg-orange-500/40 animate-pulse top-[20%] left-[10%]" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-500/30 blur-[0.5px] top-[75%] left-[85%]" />
        <div className="absolute w-2 h-2 rounded-full bg-orange-600/10 blur-[1px] top-[40%] left-[60%]" />
      </div>

      {/* Card Content with 3D Depth Layers */}
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        
        {/* Header Container */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4" style={{ transform: 'translateZ(10px)' }}>
          {/* Left Side: Icon & Title info */}
          <div className="flex items-center gap-4">
            <div 
              style={{ transform: 'translateZ(20px)' }}
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white dark:text-orange-100 shadow-md group-hover:scale-[1.05] group-hover:rotate-[8deg] transition-all duration-300 shrink-0`}
            >
              <Icon size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-text-primary tracking-tight leading-tight group-hover:text-orange-500 dark:group-hover:text-orange-405 transition-colors duration-300">
                {item.role}
              </h4>
              <span className="text-xs text-text-secondary font-semibold block mt-0.5">
                {item.org}
              </span>
            </div>
          </div>

          {/* Right Side: Interactive Badge with Tooltip */}
          <div className="relative" style={{ transform: 'translateZ(25px)' }}>
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-[9.5px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-orange-500/15 bg-orange-500/[0.04] text-orange-600 dark:text-orange-405/90 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.15)] transition-all duration-300"
            >
              {item.badge}
            </button>
            
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-medium px-3 py-1.5 rounded-xl shadow-lg border border-white/10 dark:border-zinc-200 pointer-events-none z-30 w-44 text-center leading-normal"
                >
                  {tooltipTexts[item.badge]}
                  <div className="border-4 border-transparent border-t-zinc-950 dark:border-t-white absolute top-full left-1/2 -translate-x-1/2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Date */}
        <span 
          style={{ transform: 'translateZ(15px)' }}
          className="text-[10.5px] font-bold text-text-secondary/60 tracking-wider block mb-4 uppercase"
        >
          📅 {item.duration}
        </span>

        {/* Bullet points */}
        <motion.ul 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-2.5 mb-6 text-sm text-text-secondary pl-1"
          style={{ transform: 'translateZ(10px)' }}
        >
          {item.description.map((bullet, idx) => (
            <motion.li 
              key={idx} 
              variants={bulletVariants} 
              className="flex items-start gap-2.5 leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-orange-500/60 dark:bg-orange-400/60" />
              <p className="text-[13px] sm:text-[13.5px] font-normal">{bullet}</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Tech Chips */}
        <div 
          style={{ transform: 'translateZ(15px)' }}
          className="flex flex-wrap gap-1.5 border-t border-zinc-150/40 dark:border-zinc-800/40 pt-4"
        >
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10.5px] px-2.5 py-1 rounded-lg font-semibold bg-zinc-50 dark:bg-zinc-900 text-text-secondary border border-zinc-200/40 dark:border-zinc-800/40 transition-all duration-200 hover:scale-[1.05] hover:border-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Link Micro Interaction */}
        <div 
          style={{ transform: 'translateZ(20px)' }}
          className="mt-5 flex items-center justify-between border-t border-zinc-150/20 dark:border-zinc-800/20 pt-4"
        >
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 transition-colors duration-300 flex items-center gap-1">
            View Project 
            <ArrowRight size={12} className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 stroke-[2.5]" />
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary/50 group-hover:text-text-secondary transition-colors duration-300">
            → View Details
          </span>
        </div>

      </div>

    </div>
  );
}

// --- TIMELINE NODE COMPONENT ---
function TimelineNode({ index, active, item }: { index: number; active: boolean; item: Milestone }) {
  const isEven = index % 2 === 0;
  const Icon = item.iconComponent;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Pulse ring */}
      {active && (
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-orange-500/20 dark:bg-orange-400/20 animate-ping pointer-events-none" />
      )}

      {/* Active node glow */}
      {active && (
        <span className="absolute inline-flex h-10 w-10 rounded-full bg-orange-500/10 dark:bg-orange-400/10 blur-sm pointer-events-none" />
      )}

      {/* Circle Icon Badge */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10
          ${active 
            ? 'bg-gradient-to-br from-orange-500 to-amber-400 border-transparent shadow-[0_0_15px_rgba(245,158,11,0.4)] text-white' 
            : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600'
          }`}
      >
        <Icon size={16} className={`stroke-[2] transition-transform duration-500 ${active ? 'scale-110 rotate-[5deg]' : ''}`} />
      </div>

      {/* Year (Desktop - Alternating side) */}
      <div
        className={`absolute font-extrabold tracking-tight text-xs transition-all duration-500 select-none hidden lg:block
          ${active 
            ? 'text-orange-600 dark:text-orange-400 scale-110 font-black' 
            : 'text-zinc-400 dark:text-zinc-700 font-bold'
          }
          ${isEven ? 'left-12 text-left' : 'right-12 text-right'}
        `}
      >
        {item.year}
      </div>
    </div>
  );
}

// --- MAIN EXPERIENCE & JOURNEY CONTAINER ---
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll target reference for drawing vertical progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const heightScale = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative py-20 sm:py-28 px-6 overflow-hidden bg-white/30 dark:bg-zinc-950/20"
    >
      
      {/* Background Ambient design layers */}
      <div className="absolute inset-0 -z-20 pointer-events-none select-none overflow-hidden">
        {/* Apple-style background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)]" />

        {/* Soft blurring ambient blobs */}
        <div className="absolute top-[25%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-orange-500/5 dark:bg-orange-500/3 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 dark:bg-amber-500/3 blur-[140px] animate-float-medium" />
      </div>

      <div className="max-w-[1200px] mx-auto relative">
        
        {/* Section title & Header */}
        <SectionReveal>
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-bold text-orange-600 dark:text-orange-400 mb-4 select-none">
              Experience & Journey
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight">
              Professional Growth & AI Journey.
            </h2>
            <p className="text-sm sm:text-[14.5px] text-text-secondary mt-5 font-medium leading-relaxed">
              A timeline of my professional growth, engineering projects, competitions, and AI journey.
            </p>
          </div>
        </SectionReveal>

        {/* Timeline Grid Container */}
        <div className="relative min-h-[500px]">
          
          {/* Static gray timeline tracking line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-zinc-200/60 dark:bg-zinc-800/40 -translate-x-1/2 pointer-events-none select-none z-10" />

          {/* Animated gradient drawing line */}
          <motion.div
            className="absolute left-6 lg:left-1/2 top-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-400 to-red-500 shadow-[0_0_10px_rgba(245,158,11,0.3)] z-10 -translate-x-1/2"
            style={{ height: heightScale }}
          />

          {/* Sticky floating year capsule on the right side */}
          <div className="absolute right-0 top-12 sticky top-[120px] z-30 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-orange-500/20 dark:border-orange-400/20 shadow-md text-[11px] text-orange-600 dark:text-orange-400 font-extrabold select-none">
            <Sparkles size={11} className="animate-spin duration-3000 text-orange-500 shrink-0" />
            <span>YEAR: {milestones[activeIndex].year}</span>
          </div>

          {/* Milestone mapper */}
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`relative flex flex-col lg:flex-row items-stretch lg:justify-between mb-12 lg:mb-16 w-full ${
                  index > 0 ? 'lg:-mt-[220px]' : ''
                }`}
              >
                {/* Center Node (Absolute positioned relative to vertical line) */}
                <div className="absolute left-6 lg:left-1/2 top-6 -translate-x-1/2 z-20">
                  <TimelineNode index={index} active={activeIndex === index} item={item} />
                </div>

                {/* Left/Right alternating Card wrapper */}
                <div 
                  className={`w-full lg:w-[calc(50%-48px)] pl-16 lg:pl-0 ${
                    isEven ? 'lg:pr-12' : 'lg:order-2 lg:pl-12'
                  }`}
                >
                  <motion.div
                    onViewportEnter={() => setActiveIndex(index)}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                  >
                    <ExperienceCard item={item} index={index} active={activeIndex === index} />
                  </motion.div>
                </div>

                {/* Desktop placeholder to balance the grid columns layout */}
                <div className="hidden lg:block lg:w-[calc(50%-48px)]" />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
