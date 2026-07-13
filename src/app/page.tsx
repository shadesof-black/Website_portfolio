'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';

// Dynamically import heavy/below-the-fold components
const RadialTimeline = dynamic(() => import('@/components/sections/RadialTimeline'), { ssr: false });
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false });
const Achievements = dynamic(() => import('@/components/sections/Achievements'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Hero />
      <RadialTimeline />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
