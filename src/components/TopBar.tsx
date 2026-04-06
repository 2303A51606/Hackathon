import React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '../lib/utils';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  userImage?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, showBack, onBack, userImage }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors"
          >
            <span className="text-primary font-bold">←</span>
          </button>
        ) : (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center shadow-sm">
            <img 
              src={userImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBAGA1XAQzDGxDKMuBOlQqHQ-2qJRL6nEi9JHi4Tx_U8SmoZ40fyPhSjwcwf_HERAA-m2NLL0Twf55sH2rlKGtdKxHK8QsGoMypj2FOQ5Rqv8NY9owydSN6NPHxh4WGCbENLX8pO8pJEMdZ2G0kK8RwibcyT3f_ojLBeTSGlYM80i1IC6WuriUX1d6FKILG7yNstKC8GJAd3gB5pBp_pQjmRwTS8gL1L6snD_IZp9_aagHQgFuiXnKu4B7LO3CDYXH9pQruzioxCWs"} 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <span className="text-2xl font-black bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent font-headline tracking-tight uppercase">
          {title || "SubTrack"}
        </span>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors relative">
        <Bell size={20} className="text-primary" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
      </button>
    </header>
  );
};
