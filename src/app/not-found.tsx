'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-blue/15 rounded-full blur-[80px] -z-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <span className="text-[120px] font-extrabold tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-ice">
          404
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-6">
          Page Not Found
        </h1>
        <p className="text-text-secondary mt-3 text-sm leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent-blue text-white hover:bg-accent-blue/90 shadow-[0_4px_16px_rgba(59,130,246,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-355"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
