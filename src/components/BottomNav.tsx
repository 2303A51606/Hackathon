import React from 'react';
import { Home, CreditCard, Bell, BarChart2, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'subs', label: 'Subs', icon: CreditCard },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'data', label: 'Data', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/80 backdrop-blur-xl rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,7,103,0.04)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-2 transition-all duration-300 rounded-2xl",
              isActive 
                ? "bg-gradient-to-br from-primary to-primary-container text-white scale-95 shadow-lg" 
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
