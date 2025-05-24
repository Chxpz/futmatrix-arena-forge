
import { Card } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import CompetitionStatsCards from './CompetitionStatsCards';

const AgentDisplaySection = () => {
  return (
    <div className="w-full lg:w-1/2 p-6 border-r border-red-900/30">
      <div className="max-w-md mx-auto">
        {/* AI Agent Card */}
        <Card className="bg-gradient-to-br from-red-950/30 to-red-900/20 border-red-800/40 p-8 text-center mb-6">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Rivalizer AI</h2>
            <p className="text-red-300">Your Competitive Intelligence Agent</p>
          </div>
          
          <div className="bg-red-950/40 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-400 mb-2">Current Mode</div>
            <div className="text-lg font-semibold text-red-400">🔥 Competition Hunter</div>
          </div>
        </Card>

        {/* Competition Stats */}
        <div className="space-y-4">
          <CompetitionStatsCards />
        </div>
      </div>
    </div>
  );
};

export default AgentDisplaySection;
