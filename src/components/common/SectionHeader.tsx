import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark' | 'sand';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = ''
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  }[align];

  const labelColor = {
    light: 'text-neutral-500',
    dark: 'text-neutral-400',
    sand: 'text-neutral-600'
  }[theme];

  const titleColor = {
    light: 'text-neutral-900',
    dark: 'text-white',
    sand: 'text-neutral-900'
  }[theme];

  const subtitleColor = {
    light: 'text-neutral-600',
    dark: 'text-neutral-300',
    sand: 'text-neutral-700'
  }[theme];

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {label && (
        <span className={`block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-3 ${labelColor}`}>
          {label}
        </span>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.12] mb-4 ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg font-light leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
