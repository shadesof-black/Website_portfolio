'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, XTwitterIcon, LeetcodeIcon, WhatsappIcon } from '@/components/icons/SocialIcons';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import SectionReveal from '@/components/ui/SectionReveal';
import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  email: <Mail size={18} />,
  instagram: <InstagramIcon size={18} />,
  twitter: <XTwitterIcon size={18} />,
  whatsapp: <WhatsappIcon size={18} />,
  leetcode: <LeetcodeIcon size={18} />,
};

// Custom styling overrides for social button blocks based on platforms (Solid Colors)
const socialStyles: Record<string, {
  buttonClass: string;
  iconClass: string;
}> = {
  github: {
    buttonClass: "bg-zinc-800 dark:bg-zinc-900 border-zinc-700 dark:border-zinc-800 text-white hover:bg-zinc-700 dark:hover:bg-zinc-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]",
    iconClass: "text-white/90 group-hover/social:text-white"
  },
  linkedin: {
    buttonClass: "bg-blue-600 border-blue-700 text-white hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    iconClass: "text-white/90 group-hover/social:text-white"
  },
  leetcode: {
    buttonClass: "bg-yellow-500 border-yellow-600 text-zinc-950 hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    iconClass: "text-zinc-900 group-hover/social:text-zinc-950"
  },
  email: {
    buttonClass: "bg-sky-500 border-sky-600 text-white hover:bg-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    iconClass: "text-white/90 group-hover/social:text-white"
  },
  instagram: {
    buttonClass: "bg-red-600 border-red-700 text-white hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    iconClass: "text-white/90 group-hover/social:text-white"
  },
  whatsapp: {
    buttonClass: "bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    iconClass: "text-white/90 group-hover/social:text-white"
  }
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string || '').trim().slice(0, 100);
    const email = (formData.get('email') as string || '').trim().slice(0, 100);
    const subject = (formData.get('subject') as string || '').trim().slice(0, 150) || 'Contact from Portfolio';
    const message = (formData.get('message') as string || '').trim().slice(0, 2000);

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const mailtoUrl = `mailto:rahulraj11635@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoUrl;
  };

  const handleSendClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <SectionReveal>
          <div className="text-center mb-20">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent-blue)] dark:text-[var(--accent-blue)]/80 mb-4">
              Get in Touch
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              Let&apos;s Build
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-ice)]"> Together</span>
            </h2>
            <p className="text-base text-text-secondary max-w-lg mx-auto mt-4">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form - 3 cols */}
          <SectionReveal className="lg:col-span-3" delay={0.1}>
            <GlassCard className="p-8 sm:p-10" variant="rose">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <GlassInput label="Name" name="name" required maxLength={100} />
                  <GlassInput label="Email" name="email" type="email" required maxLength={100} />
                </div>
                <GlassInput label="Subject" name="subject" maxLength={150} />
                <GlassInput label="Message" name="message" textarea required maxLength={2000} />

                <div className="pt-2">
                  <GlassButton variant="primary" size="lg" onClick={handleSendClick} ariaLabel="Send message">
                    <Send size={16} />
                    Send Message
                  </GlassButton>
                </div>
              </form>
            </GlassCard>
          </SectionReveal>

          {/* Social links - 2 cols */}
          <SectionReveal className="lg:col-span-2" delay={0.2}>
            <GlassCard className="p-8 h-full flex flex-col justify-center" variant="rose">
              <h3 className="text-sm font-bold text-text-primary mb-2">
                Connect with me
              </h3>
              <p className="text-xs text-text-secondary mb-8 leading-relaxed">
                Find me on social platforms or drop me an email directly.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, i) => {
                  const styleMeta = socialStyles[link.icon] || {
                    buttonClass: "bg-glass border border-border-glass text-text-secondary hover:border-[var(--accent-blue)]/20 hover:text-[var(--accent-blue)]",
                    iconClass: "text-text-secondary/50 group-hover/social:text-[var(--accent-blue)]"
                  };

                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-full border transition-all duration-300 group/social",
                        styleMeta.buttonClass
                      )}
                    >
                      <span className={cn("transition-colors duration-300", styleMeta.iconClass)}>
                        {iconMap[link.icon]}
                      </span>
                      <span className="text-xs font-semibold">{link.name}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Quick email */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] dark:border-white/[0.03]">
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-secondary/60 mb-2">
                  Quick reach
                </p>
                <a href="mailto:rahulraj11635@gmail.com" className="text-sm text-[var(--accent-blue)] hover:underline font-semibold">
                  rahulraj11635@gmail.com
                </a>
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
