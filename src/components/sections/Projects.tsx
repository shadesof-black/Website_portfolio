'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import SectionReveal from '@/components/ui/SectionReveal';
import SocialCards from '@/components/ui/card-fan-carousel';
import { projects, type Project } from '@/lib/data';

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/70" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, y: 20, filter: 'blur(10px)' }}
        animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ scale: 0.9, y: 20, filter: 'blur(10px)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto
          bg-white dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          shadow-xl
          rounded-[24px] p-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center
            bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800
            border border-zinc-200 dark:border-zinc-800
            text-text-secondary hover:text-text-primary
            transition-all duration-300"
          aria-label="Close"
        >
          <X size={15} />
        </button>

        {/* Project image */}
        <div className="relative w-full h-56 rounded-2xl mb-6 overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-600 dark:text-rose-400 mb-2">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold text-text-primary mb-4">
          {project.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          {project.longDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3.5 py-1.5 rounded-full text-[10px] font-semibold
              bg-glass border border-border-glass
              text-text-secondary">
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {project.github ? (
            <GlassButton variant="secondary" href={project.github} size="sm">
              <GithubIcon size={14} /> Open Repository
            </GlassButton>
          ) : (
            <GlassButton variant="secondary" className="pointer-events-none opacity-40" size="sm">
              Ongoing Minor Project
            </GlassButton>
          )}
          {project.liveDemo ? (
            <GlassButton variant="primary" href={project.liveDemo} size="sm" className="!bg-red-600 hover:!bg-red-500 !text-white !border-red-700">
              <ExternalLink size={14} /> Live Demo
            </GlassButton>
          ) : (
            <GlassButton variant="primary" className="pointer-events-none opacity-40 !bg-red-600 !text-white !border-red-700" size="sm">
              Coming Soon
            </GlassButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'fan' | 'grid'>('fan');

  const carouselCards = projects.map((project) => ({
    imgUrl: project.image,
    alt: project.title,
    onClick: () => setSelectedProject(project),
  }));

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-rose-600 dark:text-rose-400/80 mb-4">
              Featured Work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              Selected
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500"> Projects</span>
            </h2>
          </div>
        </SectionReveal>

        {/* View Mode Switcher */}
        <div className="flex justify-center mb-12 relative z-30">
          <div className="inline-flex rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1">
            <button
              onClick={() => setViewMode('fan')}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                viewMode === 'fan'
                  ? 'bg-white dark:bg-zinc-800 text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Interactive Deck
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-800 text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Project display */}
        {viewMode === 'fan' ? (
          <SectionReveal>
            <div className="w-full relative z-20">
              <SocialCards cards={carouselCards} />
              <p className="text-center text-xs text-text-secondary/70 mt-6 tracking-wide">
                * Hover to fan out items; click any card to read details and launch demo.
              </p>
            </div>
          </SectionReveal>
        ) : (
          /* Project cards grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <SectionReveal key={project.title} delay={i * 0.08}>
                <GlassCard className="overflow-hidden cursor-pointer h-full" variant="rose">
                  <div onClick={() => setSelectedProject(project)} className="h-full">
                    {/* Image Placeholder with real Unsplash images */}
                    <div className="relative h-56 w-full
                      bg-gradient-to-br from-rose-500/[0.06] to-rose-600/[0.06]
                      dark:from-rose-500/[0.03] dark:to-rose-600/[0.03]
                      border-b border-white/[0.06] dark:border-white/[0.03]
                      overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-[1.03] transition-transform duration-700" 
                        loading="lazy"
                      />
                      {/* Category badge */}
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider
                        bg-zinc-100 dark:bg-zinc-900/90
                        border border-zinc-200 dark:border-zinc-800/90
                        text-text-secondary">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full text-[10px] font-semibold
                            bg-glass border border-border-glass
                            text-text-secondary">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-semibold text-rose-600/70 dark:text-rose-450/70">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action row */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-9 h-9 rounded-full flex items-center justify-center
                                bg-glass border border-border-glass
                                text-text-secondary/85 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-glass-hover
                                transition-all duration-300"
                              aria-label={`${project.title} GitHub`}
                            >
                              <GithubIcon size={14} />
                            </a>
                          ) : (
                            <span 
                              title="Ongoing Minor Project"
                              className="text-[9.5px] font-bold text-text-secondary/40 select-none cursor-default uppercase tracking-wider"
                            >
                              Ongoing Minor Project
                            </span>
                          )}
                          {project.liveDemo ? (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-9 h-9 rounded-full flex items-center justify-center
                                bg-glass border border-border-glass
                                text-text-secondary/85 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-glass-hover
                                transition-all duration-300"
                              aria-label={`${project.title} Live Demo`}
                            >
                              <ExternalLink size={14} />
                            </a>
                          ) : (
                            project.github && (
                              <span
                                title="Coming Soon"
                                className="w-9 h-9 rounded-full flex items-center justify-center
                                  bg-glass/20 border border-border-glass/40
                                  text-text-secondary/30 pointer-events-none"
                              >
                                <ExternalLink size={14} />
                              </span>
                            )
                          )}
                        </div>
                        <span className="text-xs text-rose-600/70 dark:text-rose-450/70 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                          View Details <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        )}
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
