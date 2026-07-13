'use client';
import { useState } from 'react';

interface GlassInputProps {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
  maxLength?: number;
}

export default function GlassInput({ label, type = 'text', name, required = false, textarea = false, maxLength }: GlassInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const baseClasses = `w-full bg-zinc-50 dark:bg-zinc-900
    border border-zinc-200 dark:border-zinc-800 rounded-full
    px-6 pt-5 pb-2 text-text-primary text-sm
    focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600
    transition-all duration-200 font-[inherit]`;

  const labelClasses = `absolute left-6 transition-all duration-200 pointer-events-none font-medium
    ${focused || value
      ? 'top-1.5 text-[10px] tracking-wider uppercase text-slate-500 dark:text-zinc-400'
      : 'top-3.5 text-sm text-text-secondary/60'
    }`;

  return (
    <div className="relative group">
      {textarea ? (
        <textarea
          name={name}
          id={name}
          required={required}
          aria-required={required}
          rows={4}
          maxLength={maxLength}
          className={`${baseClasses} resize-none rounded-3xl !pt-6`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          required={required}
          aria-required={required}
          maxLength={maxLength}
          className={baseClasses}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      )}
      <label htmlFor={name} className={labelClasses}>{label}</label>
    </div>
  );
}
