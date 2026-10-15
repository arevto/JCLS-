import React from 'react';
import { Edit3 } from 'lucide-react';

interface PlaceholderBadgeProps {
  label?: string;
  className?: string;
}

export const PlaceholderBadge: React.FC<PlaceholderBadgeProps> = ({ 
  label = 'Editable Placeholder',
  className = '' 
}) => {
  return (
    <span 
      title="You can edit this placeholder in src/data/churchData.ts"
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase bg-amber-500/10 text-amber-700 border border-amber-500/20 backdrop-blur-xs select-none ${className}`}
    >
      <Edit3 className="w-3 h-3 text-amber-600" />
      {label}
    </span>
  );
};
