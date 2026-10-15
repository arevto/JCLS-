import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonArrowProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'dark' | 'white' | 'outline' | 'outline-white' | 'gold' | 'sand';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const ButtonArrow: React.FC<ButtonArrowProps> = ({
  children,
  onClick,
  variant = 'dark',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false
}) => {
  const baseStyles = 'group inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-2',
    md: 'text-sm px-6 py-3 gap-2.5 tracking-wide',
    lg: 'text-base px-8 py-3.5 gap-3 tracking-wide'
  };

  const variantStyles = {
    dark: 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow-md active:scale-[0.98]',
    white: 'bg-white text-neutral-900 hover:bg-neutral-100 shadow-sm hover:shadow active:scale-[0.98]',
    'outline-white': 'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 active:scale-[0.98]',
    outline: 'bg-transparent text-neutral-900 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50 active:scale-[0.98]',
    gold: 'bg-amber-600 text-white hover:bg-amber-500 shadow-sm active:scale-[0.98]',
    sand: 'bg-[#ece7de] text-neutral-900 hover:bg-[#e4ded3] active:scale-[0.98]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0" />
    </button>
  );
};
