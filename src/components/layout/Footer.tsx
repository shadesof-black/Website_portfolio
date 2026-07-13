'use client';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, XTwitterIcon, LeetcodeIcon, WhatsappIcon } from '@/components/icons/SocialIcons';
import { socialLinks } from '@/lib/data';

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={16} />,
  linkedin: <LinkedinIcon size={16} />,
  email: <Mail size={16} />,
  instagram: <InstagramIcon size={16} />,
  twitter: <XTwitterIcon size={16} />,
  whatsapp: <WhatsappIcon size={16} />,
  leetcode: <LeetcodeIcon size={16} />,
};

const footerSocialStyles: Record<string, string> = {
  github: "bg-zinc-800 dark:bg-zinc-900 border-zinc-700 dark:border-zinc-800 text-white hover:bg-zinc-700 dark:hover:bg-zinc-800",
  linkedin: "bg-blue-600 border-blue-700 text-white hover:bg-blue-500",
  leetcode: "bg-yellow-500 border-yellow-600 text-zinc-950 hover:bg-yellow-400",
  email: "bg-sky-500 border-sky-600 text-white hover:bg-sky-400",
  instagram: "bg-red-600 border-red-700 text-white hover:bg-red-500",
  whatsapp: "bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-500",
};

export default function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Glass divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/[0.06] to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-bold tracking-tight text-text-primary/80"
          >
            rahul<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-ice">.portfiolo</span>
          </motion.div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, url, icon }) => {
              const bgClass = footerSocialStyles[icon] || "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-text-secondary hover:text-text-primary";
              return (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${bgClass}`}
                  aria-label={name}
                >
                  {iconMap[icon]}
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs text-text-secondary/60 font-medium"
          >
            © {new Date().getFullYear()} Rahul Raj · rahul.portfiolo
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
