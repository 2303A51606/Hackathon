import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface InsightCardProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'alert';
}

export const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  variant = 'default' 
}) => {
  if (variant === 'alert') {
    return (
      <section className="relative overflow-hidden bg-tertiary-container rounded-[1.5rem] p-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-on-tertiary/10 flex items-center justify-center shrink-0">
          <span className="text-on-tertiary text-2xl">⚠️</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-on-tertiary font-bold text-sm">{title}</h3>
          <p className="text-on-tertiary/90 text-xs leading-relaxed">{description}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 border-l-4 border-secondary shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb size={14} className="text-secondary" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary font-headline">{title}</p>
        </div>
        <p className="text-on-surface text-sm leading-tight">{description}</p>
      </div>
      {actionLabel && (
        <button 
          onClick={onAction}
          className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          {actionLabel}
          <ArrowRight size={12} />
        </button>
      )}
    </section>
  );
};
