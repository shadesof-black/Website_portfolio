'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Link, Zap, Briefcase, GraduationCap, Bot, Award, BookOpen } from 'lucide-react';
import SectionReveal from '@/components/ui/SectionReveal';
import CrystalIcon from '@/components/ui/CrystalIcon';

interface TimelineItem {
  id: number;
  title: string;
  shortTitle: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
}

const defaultTimelineData: TimelineItem[] = [
  {
    id: 1,
    title: 'B.Tech Mechanical Engineering',
    shortTitle: 'Mechanical B.Tech',
    date: '2023 - 2027',
    content: 'Pursuing degree at UIET, Panjab University, laying the groundwork for engineering physical and digital mechanics.',
    category: 'Education',
    icon: GraduationCap,
    relatedIds: [4, 6],
    status: 'in-progress',
    energy: 100,
  },
  {
    id: 2,
    title: 'Autonomous Robotics',
    shortTitle: 'Autonomous Robot',
    date: '2023',
    content: 'Built a self-navigating line follower robot using PID algorithms and computer vision, winning 1st place in the national robotics challenge.',
    category: 'Robotics',
    icon: Bot,
    relatedIds: [4, 5],
    status: 'completed',
    energy: 95,
  },
  {
    id: 4,
    title: 'Computer Vision Intern',
    shortTitle: 'CV Intern',
    date: 'June 2026 – Present',
    content: 'Working on dataset engineering, preprocessing, and training/evaluating computer vision models at Envinova Smartech.',
    category: 'Experience',
    icon: Briefcase,
    relatedIds: [2, 6],
    status: 'in-progress',
    energy: 95,
  },
  {
    id: 5,
    title: 'AI RAG Chatbot',
    shortTitle: 'RAG AI Agent',
    date: '2024',
    content: 'Engineered a vector-retrieval RAG chatbot using LangChain, Pinecone, and FastAPI with 95%+ precision.',
    category: 'AI',
    icon: BookOpen,
    relatedIds: [6, 7],
    status: 'completed',
    energy: 90,
  },
  {
    id: 6,
    title: 'AI Engineer',
    shortTitle: 'AI Engineer',
    date: '2024 - Present',
    content: 'Currently architecting production-level LLM agents and autonomous warehouse solutions at Tech Innovation Labs.',
    category: 'Experience',
    icon: Award,
    relatedIds: [5, 4],
    status: 'in-progress',
    energy: 95,
  },
  {
    id: 7,
    title: 'Wheat Disease Detection',
    shortTitle: 'Crop Disease AI',
    date: '2024',
    content: 'Developed a deep learning model classifying crop pathologies with 96.4% accuracy, securing Best Innovation at the AI Hackathon.',
    category: 'AI',
    icon: Bot,
    relatedIds: [5],
    status: 'completed',
    energy: 88,
  },
];

export default function RadialTimeline() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = defaultTimelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = defaultTimelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Adapt radius to container dimensions dynamically: larger radius on desktop for spacing
    const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 140 : 280;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = defaultTimelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem['status']): string => {
    switch (status) {
      case 'completed':
        return 'text-[var(--background)] bg-[var(--text-primary)] border-[var(--text-primary)]';
      case 'in-progress':
        return 'text-[var(--text-primary)] bg-[var(--background)] border-[var(--text-primary)]';
      case 'pending':
        return 'text-[var(--text-secondary)] bg-[var(--surface)] border-[var(--border)]';
      default:
        return 'text-[var(--text-secondary)] bg-[var(--surface)] border-[var(--border)]';
    }
  };

  return (
    <section id="journey" className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent-blue)] dark:text-[var(--accent-blue)]/80 mb-4">
              Interactive Path
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              Orbital
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-ice)]"> Journey Timeline</span>
            </h2>
            <p className="text-sm text-text-secondary mt-4 max-w-md mx-auto leading-relaxed">
              Click any node on the orbit to explore project interconnections, milestone energy levels, and progress mapping.
            </p>
          </div>
        </SectionReveal>

        <div
          className="w-full h-[380px] sm:h-[600px] flex items-center justify-center bg-transparent relative overflow-visible cursor-grab active:cursor-grabbing"
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <div
            className="absolute w-full h-full flex items-center justify-center"
            ref={orbitRef}
            style={{
              perspective: '1000px',
            }}
          >
            {/* Central hub */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-ice flex items-center justify-center z-10 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[var(--background)]"></div>
            </div>

            {/* Orbit ring track: match size on mobile vs desktop */}
            <div className="absolute w-[280px] h-[280px] sm:w-[560px] sm:h-[560px] rounded-full border border-[var(--border)] dark:border-white/[0.04] pointer-events-none"></div>

            {defaultTimelineData.map((item, index) => {
              const position = calculateNodePosition(index, defaultTimelineData.length);
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => { nodeRefs.current[item.id] = el; }}
                  className="absolute transition-all duration-700 cursor-pointer flex flex-col items-center"
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  {/* Energy halo */}
                  <div
                    className={`absolute rounded-full -inset-2 ${
                      isPulsing ? 'animate-pulse duration-1000' : ''
                    } pointer-events-none`}
                    style={{
                      background: `radial-gradient(circle, rgba(142,219,255,0.25) 0%, rgba(142,219,255,0) 70%)`,
                      width: `${item.energy * 0.4 + 68}px`,
                      height: `${item.energy * 0.4 + 68}px`,
                      left: `-${(item.energy * 0.4 + 68 - 64) / 2}px`,
                      top: `-${(item.energy * 0.4 + 68 - 64) / 2}px`,
                    }}
                  ></div>

                  {/* Icon node wrapper */}
                  <CrystalIcon
                    size="lg"
                    className={`
                      ${
                        isExpanded
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-[0_0_20px_rgba(142,219,255,0.4)]'
                          : isRelated
                          ? 'bg-[#8EDBFF]/30 text-slate-800 dark:text-white border-[#8EDBFF]'
                          : 'bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-850 shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
                      }
                      transition-all duration-300 transform
                      ${isExpanded ? 'scale-125' : ''}
                    `}
                  >
                    <Icon size={24} />
                  </CrystalIcon>

                  {/* Caption: Capsule Badge for crystal clear readability in light and dark mode */}
                  <div
                    className={`
                      absolute top-18 whitespace-nowrap text-[11px] font-bold tracking-wide px-3 py-1 rounded-full
                       bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800
                      shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                      transition-all duration-300
                      ${isExpanded ? 'text-text-primary scale-105 border-[var(--text-primary)]' : 'text-slate-800 dark:text-slate-200'}
                    `}
                  >
                    {item.shortTitle}
                  </div>

                  {/* Expandable Info Card */}
                  {isExpanded && (
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-visible p-4 z-50">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[var(--text-secondary)]/30"></div>
                      
                      <div className="pb-2 mb-2 border-b border-[var(--text-secondary)]/10">
                        <div className="flex justify-between items-center">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded border ${getStatusStyles(item.status)}`}>
                            {item.status === 'completed' ? 'COMPLETE' : item.status === 'in-progress' ? 'IN PROGRESS' : 'PENDING'}
                          </span>
                          <span className="text-[10px] font-mono text-text-secondary/70">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-text-primary mt-2">
                          {item.title}
                        </h3>
                      </div>

                      <div className="text-[11px] text-text-secondary leading-relaxed space-y-3">
                        <p>{item.content}</p>

                        <div className="pt-2 border-t border-[var(--text-secondary)]/10">
                          <div className="flex justify-between items-center text-[10px] mb-1">
                            <span className="flex items-center">
                              <Zap size={10} className="mr-1 text-[var(--accent-blue)]" />
                              Energy Rating
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-[var(--text-secondary)]/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-accent-blue to-accent-ice"
                              style={{ width: `${item.energy}%` }}
                            ></div>
                          </div>
                        </div>

                        {item.relatedIds.length > 0 && (
                          <div className="pt-2 border-t border-[var(--text-secondary)]/10">
                            <div className="flex items-center mb-1.5">
                              <Link size={9} className="text-text-secondary/70 mr-1" />
                              <h4 className="text-[9px] uppercase tracking-wider font-semibold text-text-secondary/70">
                                Connections
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = defaultTimelineData.find(
                                  (i) => i.id === relatedId
                                );
                                return (
                                  <button
                                    key={relatedId}
                                    className="flex items-center h-5 px-2 text-[9px] rounded-lg border border-border-glass bg-glass hover:bg-glass-hover text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title.split(' ')[0]}
                                    <ArrowRight size={8} className="ml-1 text-text-secondary/60" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
