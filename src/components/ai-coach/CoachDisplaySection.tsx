
import { Brain } from 'lucide-react';
import CoachStatsCards from './CoachStatsCards';

const CoachDisplaySection = () => {
  return (
    <div className="lg:w-1/2 border-r border-teal-900/30 bg-gradient-to-br from-teal-950/20 to-teal-900/10 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-teal-600/10 via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_50%)]"></div>
      
      {/* Main Agent Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Status Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-2 glow-text">AI COACH</h1>
          <div className="flex items-center justify-center space-x-3">
            <div className="px-4 py-2 bg-teal-600/20 border border-teal-500/30 rounded-full">
              <span className="text-teal-300 font-medium flex items-center">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse mr-2"></div>
                ANALYZING & READY
              </span>
            </div>
          </div>
        </div>

        {/* Massive Agent Image */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-8 bg-gradient-to-r from-teal-600/30 via-teal-500/40 to-teal-600/30 rounded-full blur-2xl animate-pulse"></div>
          
          {/* Main image container */}
          <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 p-2 shadow-2xl shadow-teal-600/50">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-teal-400/40 shadow-inner">
              <img 
                src="/lovable-uploads/6f6aaf60-65da-4127-b5d4-15e5e3327b26.png" 
                alt="AI Coach Agent" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating status indicators */}
          <div className="absolute -top-4 -right-4 flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full animate-ping absolute"></div>
            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Coach Performance Data */}
        <div className="space-y-4 mt-6">
          <CoachStatsCards />
        </div>
      </div>
    </div>
  );
};

export default CoachDisplaySection;
