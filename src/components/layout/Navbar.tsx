'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { navItems, socialLinks } from '@/lib/data';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

// --- CUSTOM ANIMATED MAIL SVG ICON ---
function MailIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="20" 
      height="20" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="transition-all duration-300"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" className="transition-all duration-300" />
      {/* Top envelope flap opens upward slightly on hover */}
      <path 
        d={isHovered ? "M3 4l9 3 9-3" : "M3 4l9 8 9-8"} 
        className="transition-all duration-300 ease-out" 
      />
    </svg>
  );
}

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string; isHovered?: boolean }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon as any,
};

// --- MAGNETIC BUTTON WRAPPER FOR DOCK ---
function MagneticDockButton({ 
  link, 
  darkMode 
}: { 
  link: typeof socialLinks[0]; 
  darkMode?: boolean;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCoords({ x: x * 0.35, y: y * 0.35 }); // Magnetic tracking
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const IconComponent = socialIcons[link.icon];
  if (!IconComponent) return null;

  // Custom hover styling colors and gradient overlays
  const brandStyles = {
    github: {
      color: 'text-white group-hover/item:text-white',
      gradient: 'from-zinc-800 to-black',
      glow: 'shadow-[0_0_15px_rgba(255,255,255,0.15)]',
    },
    linkedin: {
      color: 'text-white group-hover/item:text-white',
      gradient: 'from-[#0A66C2] to-[#38BDF8]',
      glow: 'shadow-[0_0_15px_rgba(56,189,248,0.3)]',
    },
    email: {
      color: 'text-black group-hover/item:text-black',
      gradient: 'from-yellow-400 to-amber-500',
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.45)]',
    },
  }[link.icon as 'github' | 'linkedin' | 'email'] || {
    color: 'text-text-primary',
    gradient: 'from-zinc-100 to-zinc-200',
    glow: '',
  };

  return (
    <motion.a
      ref={buttonRef}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      animate={{ x: coords.x, y: coords.y }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 overflow-hidden group/item
        ${link.icon === 'email' ? 'bg-yellow-400 dark:bg-yellow-500 border-yellow-500 dark:border-yellow-600 shadow-[0_4px_16px_rgba(234,179,8,0.25)]' : ''}
        ${link.icon === 'linkedin' ? 'bg-blue-600 border-blue-750 text-white shadow-[0_4px_16px_rgba(59,130,246,0.25)] hover:border-blue-500' : ''}
        ${link.icon === 'github' ? 'bg-zinc-900 dark:bg-zinc-800 border-zinc-800 dark:border-zinc-700 text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:border-zinc-800' : ''}
        ${isHovered ? brandStyles.glow : ''}`}
    >
      {/* Brand Fill Gradient Sweep */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${brandStyles.gradient} opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10`} 
      />
      
      {/* Icon rendering with rotative micro-interaction */}
      <div className={`relative z-10 transition-transform duration-300 group-hover/item:rotate-[5deg] group-hover/item:scale-110 ${brandStyles.color}`}>
        {link.icon === 'email' ? (
          <MailIcon isHovered={isHovered} />
        ) : (
          <IconComponent size={20} />
        )}
      </div>
    </motion.a>
  );
}

// --- NAVBAR MAIN COMPONENT ---
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  
  const activeRef = useRef(activeSection);
  useEffect(() => {
    activeRef.current = activeSection;
  }, [activeSection]);

  // Load and apply theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved === null ? true : saved === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Scroll depth observer (shrinks navbar and modifies glass styling)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stable ScrollSpy
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;
      
      let active = '';
      for (const item of navItems) {
        const el = document.querySelector(item.href) as HTMLElement;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            active = item.href;
          }
        }
      }
      
      if (window.scrollY < 100) {
        active = navItems[0].href;
      }
      
      if (active && active !== activeRef.current) {
        setActiveSection(active);
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Outer wrapper to hold background glow elements safely */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        
        {/* Background radial gradient behind navbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-30 w-[400px] h-[80px] bg-gradient-to-r from-yellow-400/20 via-amber-400/5 to-yellow-400/20 blur-2xl opacity-40 rounded-full scale-[1.2] animate-pulse duration-5000" />
        
        {/* Floating Mini Particles */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[320px] h-[50px] pointer-events-none overflow-hidden -z-20 select-none opacity-20">
          <div className="absolute w-0.5 h-0.5 rounded-full bg-yellow-400 top-1/2 left-[15%] animate-ping" />
          <div className="absolute w-1 h-1 rounded-full bg-amber-400 top-1/3 left-[85%] animate-pulse" />
        </div>

        <motion.nav
          role="navigation"
          aria-label="Main navigation"
          initial={{ y: -100, x: '-50%' }}
          animate={{ y: scrolled ? 12 : 20, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`fixed left-1/2 z-[100] w-fit max-w-[95vw] rounded-[32px] border pointer-events-auto select-none transition-all duration-500
            ${scrolled 
              ? 'py-2 px-3.5 bg-yellow-400 dark:bg-yellow-500 border-yellow-500 dark:border-yellow-600 shadow-[0_12px_40px_rgba(234,179,8,0.25)] scale-[0.98]' 
              : 'py-3.5 px-5 bg-yellow-400 dark:bg-yellow-500 border-yellow-500 dark:border-yellow-600 shadow-[0_4px_20px_rgba(234,179,8,0.15)] scale-100'
            }
          `}
        >
          <div className="flex items-center gap-6 sm:gap-9 md:gap-12 h-9 justify-center">
            
            {/* Logo rahul.portfiolo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[17px] sm:text-[18px] font-black tracking-tight text-black flex items-center justify-center h-full group/logo select-none"
              whileHover="hover"
            >
              <motion.span 
                variants={{
                  hover: { scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } }
                }}
                className="text-zinc-950 dark:text-zinc-950 flex items-center h-full"
              >
                rahul
              </motion.span>
              <motion.span
                variants={{
                  hover: { 
                    scale: 1.08,
                    letterSpacing: '0.04em',
                    filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))',
                    transition: { type: 'spring', stiffness: 300, damping: 12 }
                  }
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-900 flex items-center h-full animate-pulse"
              >
                .portfiolo
              </motion.span>
            </motion.a>

            {/* Desktop menu links (Perfect alignment, flex centered) */}
            <div className="hidden md:flex items-center gap-1.5 h-full justify-center">
              {navItems.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="group relative h-9 px-4.5 rounded-full text-[13.5px] tracking-wide font-bold transition-all duration-300 flex items-center justify-center select-none"
                >
                  {activeSection === href && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 bg-white border border-white/20 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.4)]"
                    />
                  )}
                  <span className={`relative z-10 flex items-center justify-center h-full transition-colors duration-300
                    ${activeSection === href
                      ? 'text-black font-extrabold'
                      : 'text-zinc-800/90 group-hover:text-zinc-950 group-hover:-translate-y-0.5'
                    }`}
                  >
                    {label}
                    {/* Hover bottom line sweep animation */}
                    {activeSection !== href && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-zinc-900 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile menu open trigger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center
                bg-yellow-500/20 hover:bg-yellow-500/30
                border border-yellow-600/20
                text-zinc-950 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </motion.button>
            
          </div>
        </motion.nav>
      </div>

      {/* Full-Screen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] md:hidden flex items-center justify-center"
          >
            {/* Backdrop with frosted blur */}
            <div className="absolute inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            
            {/* Fullscreen Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-sm mx-4 p-8 rounded-[36px]
                bg-white/90 dark:bg-zinc-950/80
                border border-white/20 dark:border-zinc-850/60
                shadow-2xl flex flex-col items-center select-none"
            >
              {/* Close panel indicator */}
              <button 
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 text-text-secondary"
              >
                <X size={15} />
              </button>

              <div className="flex flex-col gap-2 w-full text-center mt-6">
                {navItems.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(href)}
                    className={`px-4 py-3 rounded-2xl text-base font-bold transition-all duration-200 w-full flex items-center justify-center
                      ${activeSection === href
                        ? 'text-text-primary bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Drawer Social Links */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-200/40 dark:border-zinc-800/40 w-full justify-center">
                {socialLinks.filter(link => ['github', 'linkedin', 'email'].includes(link.icon)).map((link) => {
                  const IconComponent = socialIcons[link.icon];
                  if (!IconComponent) return null;

                  const brandColor = {
                    github: 'text-slate-800 dark:text-white',
                    linkedin: 'text-[#0A66C2]',
                    email: 'text-[#EA4335]',
                  }[link.icon as 'github' | 'linkedin' | 'email'] || 'text-text-primary';

                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-full flex items-center justify-center
                        bg-zinc-100 dark:bg-zinc-900
                        border border-zinc-200/60 dark:border-zinc-800/60
                        ${brandColor}
                        transition-all duration-200`}
                    >
                      {link.icon === 'email' ? <MailIcon isHovered={true} /> : <IconComponent size={18} />}
                    </a>
                  );
                })}

                {/* Dark Mode toggle for mobile */}
                <button
                  onClick={toggleDarkMode}
                  className="w-11 h-11 rounded-full flex items-center justify-center
                    bg-zinc-100 dark:bg-zinc-900
                    border border-zinc-200/60 dark:border-zinc-800/60
                    text-text-secondary hover:text-text-primary
                    transition-all duration-200"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-indigo-400" />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Glassmorphic Social Dock (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[99] hidden sm:flex items-center gap-3.5 p-2 rounded-full border bg-white/[0.22] dark:bg-zinc-950/30 backdrop-blur-[24px] shadow-[inset_0_1px_2.5px_rgba(255,255,255,0.15),0_20px_48px_rgba(0,0,0,0.12)] transition-all duration-300 border-t-white/35 border-l-white/35 border-r-white/10 border-b-white/10 dark:border-t-white/15 dark:border-l-white/15 dark:border-r-white/5 dark:border-b-white/5">
        
        {/* Render Social items using the Magnetic Wrapper */}
        {socialLinks.filter(link => ['github', 'linkedin', 'email'].includes(link.icon)).map((link) => (
          <MagneticDockButton 
            key={link.name} 
            link={link} 
            darkMode={darkMode} 
          />
        ))}

        {/* Divider line */}
        <div className="w-px h-6 bg-zinc-200/50 dark:bg-zinc-800/50 mx-1 select-none pointer-events-none" />

        {/* Dark Mode switcher button inside Floating Dock */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="relative w-12 h-12 rounded-full flex items-center justify-center
              bg-white/10 dark:bg-zinc-950/20 backdrop-blur-md
              border border-zinc-200/40 dark:border-zinc-800/40
              hover:border-accent-blue/30 dark:hover:border-accent-blue/40
              shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.1)]
              text-text-secondary hover:text-text-primary
              transition-colors duration-300 overflow-hidden group/theme-btn"
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {/* Sun rotates into Moon (Overlapping springs transition) */}
            <motion.div
              animate={{ 
                rotate: darkMode ? 180 : 0, 
                scale: darkMode ? 0 : 1, 
                opacity: darkMode ? 0 : 1 
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="absolute"
            >
              <Sun size={20} className="text-amber-500 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            </motion.div>
            <motion.div
              animate={{ 
                rotate: darkMode ? 0 : -180, 
                scale: darkMode ? 1 : 0, 
                opacity: darkMode ? 1 : 0 
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="absolute"
            >
              <Moon size={20} className="text-indigo-400 filter drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
            </motion.div>

            {/* Tiny stars particles exploding/animating on dark mode trigger */}
            <AnimatePresence>
              {darkMode && (
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div initial={{ scale: 0, opacity: 1, x: 0, y: 0 }} animate={{ scale: 1.3, opacity: 0, x: -8, y: -8 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute w-1 h-1 rounded-full bg-indigo-300 top-2.5 left-2.5" />
                  <motion.div initial={{ scale: 0, opacity: 1, x: 0, y: 0 }} animate={{ scale: 1.3, opacity: 0, x: 8, y: -6 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="absolute w-0.5 h-0.5 rounded-full bg-indigo-400 top-3 right-2.5" />
                  <motion.div initial={{ scale: 0, opacity: 1, x: 0, y: 0 }} animate={{ scale: 1.3, opacity: 0, x: -6, y: 8 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute w-1 h-1 rounded-full bg-indigo-200 bottom-2.5 left-3" />
                </div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </div>
    </>
  );
}
