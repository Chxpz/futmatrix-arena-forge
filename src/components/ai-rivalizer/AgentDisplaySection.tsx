
import { Flame } from 'lucide-react';
import CompetitionStatsCards from './CompetitionStatsCards';

const AgentDisplaySection = () => {
  return (
    <div className="lg:w-1/2 border-r border-red-900/30 bg-gradient-to-br from-red-950/20 to-red-900/10 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-red-600/10 via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
      
      {/* Main Agent Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Status Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-2 glow-text">RIVALIZER</h1>
          <div className="flex items-center justify-center space-x-3">
            <div className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
              <span className="text-red-300 font-medium flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-2"></div>
                ONLINE & READY
              </span>
            </div>
          </div>
        </div>

        {/* Massive Agent Image */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-8 bg-gradient-to-r from-red-600/30 via-red-500/40 to-red-600/30 rounded-full blur-2xl animate-pulse"></div>
          
          {/* Main image container */}
          <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-2 shadow-2xl shadow-red-600/50">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-red-400/40 shadow-inner">
              <img 
                src="/lovable-uploads/cfd8bdf3-3acb-4ad6-a468-6dfb6796cc93.png" 
                alt="Rivalizer AI Agent" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating status indicators */}
          <div className="absolute -top-4 -right-4 flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full animate-ping absolute"></div>
            <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Competition Data */}
        <div className="space-y-4 mt-6">
          <CompetitionStatsCards />
        </div>
      </div>
    </div>
  );
};

export default AgentDisplaySection;
