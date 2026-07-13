'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Brain, Code2, Box, Terminal, Cog, Eye, Layers, Zap, Globe,
  GitBranch, Database
} from 'lucide-react';
import SectionReveal from '@/components/ui/SectionReveal';
import { skills, skillCategories } from '@/lib/data';

const skillIcons: Record<string, React.ReactNode> = {
  'Mechanical Engineering': <Cog size={20} />,
  'Robotics': <Cpu size={20} />,
  'Embedded Systems': <Cpu size={20} />,
  'ESP32': <Cpu size={16} />,
  'Arduino': <Cpu size={16} />,
  'ROS2': <Box size={16} />,
  'Artificial Intelligence': <Brain size={20} />,
  'Machine Learning': <Brain size={18} />,
  'Deep Learning': <Layers size={18} />,
  'Computer Vision': <Eye size={18} />,
  'LangChain': <Zap size={16} />,
  'LangGraph': <Zap size={16} />,
  'TensorFlow': <Brain size={16} />,
  'PyTorch': <Brain size={16} />,
  'OpenCV': <Eye size={16} />,
  'Python': <Code2 size={16} />,
  'C++': <Code2 size={16} />,
  'JavaScript': <Code2 size={16} />,
  'TypeScript': <Code2 size={16} />,
  'SQL': <Database size={16} />,
  'React': <Globe size={16} />,
  'Next.js': <Globe size={16} />,
  'Node.js': <Terminal size={16} />,
  'Git': <GitBranch size={16} />,
  'Linux': <Terminal size={16} />,
  'Power BI': <Layers size={16} />,
  'Docker': <Box size={16} />,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-16 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-accent-blue dark:text-accent-blue/80 mb-4">
              Technical Skills
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              Tools &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-ice"> Technologies</span>
            </h2>
          </div>
        </SectionReveal>

        {/* Category filter */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer
                  ${activeCategory === cat
                    ? 'bg-[#39FF6A] text-black border border-[#39FF6A] shadow-[0_4px_16px_rgba(57,255,106,0.35)]'
                    : 'bg-glass text-text-secondary border border-border-glass hover:text-[#39FF6A] hover:border-[#39FF6A]/30 hover:bg-glass-hover'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Skills layout - flex wrap for organic capsules */}
        <motion.div layout className="flex flex-wrap justify-center gap-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative flex items-center gap-3 py-3 px-5 rounded-full
                    bg-[linear-gradient(135deg,rgba(11,66,22,0.85)_0%,rgba(18,138,29,0.7)_100%)]
                    border border-[#39FF6A]/20
                    shadow-[0_4px_12px_rgba(0,0,0,0.4),0_6px_16px_rgba(57,255,106,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]
                    hover:shadow-[0_6px_16px_rgba(0,0,0,0.5),0_10px_24px_rgba(57,255,106,0.22),inset_0_1px_2px_rgba(255,255,255,0.3)]
                    hover:border-[#39FF6A]/45
                    text-white
                    cursor-default transition-all duration-300"
                >
                  {/* Specular Diagonal Reflection */}
                  <div className="absolute inset-0 rounded-full bg-white/[0.04] pointer-events-none" />
                  
                  {/* Fine Neon Edge Border */}
                  <div 
                    className="absolute inset-0 rounded-full border border-[#39FF6A]/10 pointer-events-none group-hover:border-[#39FF6A]/25 transition-colors duration-300" 
                    aria-hidden="true"
                  />
                  
                  {/* Icon */}
                  <div className="relative z-10 text-white/80 group-hover:text-[#39FF6A] transition-colors duration-300 shrink-0">
                    {skillIcons[skill.name] || <Code2 size={16} />}
                  </div>
                  
                  {/* Label */}
                  <span className="relative z-10 text-xs font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
