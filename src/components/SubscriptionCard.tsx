import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Subscription } from '../types';
import * as Icons from 'lucide-react';
import { Mail } from 'lucide-react';

interface SubscriptionCardProps {
  subscription: Subscription;
  variant?: 'compact' | 'full';
  onClick?: () => void;
  onMailClick?: (e: React.MouseEvent) => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  subscription, 
  variant = 'full',
  onClick,
  onMailClick
}) => {
  const IconComponent = (Icons as any)[subscription.icon] || Icons.CreditCard;

  if (variant === 'compact') {
    return (
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="min-w-[160px] bg-surface-container-lowest rounded-[2rem] p-5 shadow-[0_20px_40px_rgba(0,7,103,0.04)] relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
        <div className="w-10 h-10 rounded-2xl bg-on-surface/5 flex items-center justify-center mb-4">
          <IconComponent size={20} style={{ color: subscription.color }} />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onMailClick?.(e);
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm text-primary hover:bg-white transition-colors shadow-sm"
        >
          <Mail size={14} />
        </button>
        <p className="text-on-surface font-bold truncate">{subscription.name}</p>
        <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-tighter mb-4">
          in 2 days
        </p>
        <p className="text-primary font-extrabold">${subscription.price}</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-surface-container-lowest rounded-[1.5rem] p-5 flex flex-col gap-4 group hover:bg-surface-container-low transition-all duration-300 cursor-pointer shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${subscription.color}15`, color: subscription.color }}
          >
            <IconComponent size={28} />
          </div>
          <div>
            <h3 className="text-on-surface font-bold text-lg leading-tight">{subscription.name}</h3>
            <p className="text-on-surface-variant text-xs uppercase tracking-widest font-medium">{subscription.category}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-on-surface font-black text-xl leading-tight">${subscription.price}</p>
          <p className="text-on-surface-variant text-[10px] font-semibold uppercase tracking-tighter">per month</p>
        </div>
      </div>
        <div className="flex items-center justify-between pt-2">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold",
            subscription.id === '1' ? "bg-error-container text-on-error-container" : "bg-surface-container-high text-on-surface-variant"
          )}>
            <Icons.Calendar size={14} />
            renews in 2 days
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onMailClick?.(e);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 text-primary transition-colors"
              title="Send Mail Reminder"
            >
              <Mail size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
              <Icons.MoreVertical size={18} className="text-on-surface-variant" />
            </button>
          </div>
        </div>
    </motion.div>
  );
};
