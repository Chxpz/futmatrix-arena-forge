
import { useState } from 'react';
import { ChevronDown, ChevronRight, Flame, Swords } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const RankingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-matrix-gray/20 hover:text-white"
      >
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-3 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 6h13"></path>
            <path d="M8 12h13"></path>
            <path d="M8 18h13"></path>
            <path d="M3 6h.01"></path>
            <path d="M3 12h.01"></path>
            <path d="M3 18h.01"></path>
          </svg>
          Rankings
        </span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      
      {isOpen && (
        <div className="pl-8 space-y-1">
          <NavLink
            to="/rankings?tab=week-on-fire"
            className={({ isActive }) => `
              flex items-center px-3 py-2 rounded-md text-sm transition-colors
              ${isActive 
                ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' 
                : 'text-gray-300 hover:bg-matrix-gray/20 hover:text-white'
              }
            `}
          >
            <Flame className="mr-3 h-4 w-4" />
            Week on-Fire
          </NavLink>
          
          <NavLink
            to="/rankings?tab=rivalizer-arena"
            className={({ isActive }) => `
              flex items-center px-3 py-2 rounded-md text-sm transition-colors
              ${isActive 
                ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' 
                : 'text-gray-300 hover:bg-matrix-gray/20 hover:text-white'
              }
            `}
          >
            <Swords className="mr-3 h-4 w-4" />
            Rivalizer Arena
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default RankingsMenu;
