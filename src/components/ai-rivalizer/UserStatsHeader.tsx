
import { Card } from '@/components/ui/card';
import { Flame, Trophy, Target, TrendingUp } from 'lucide-react';

const UserStatsHeader = () => {
  return (
    <div className="border-b border-red-900/30 bg-gradient-to-r from-red-950/10 via-red-900/5 to-red-950/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Performance Overview</h2>
          </div>
          <div className="text-sm text-red-400">Live Stats</div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-all duration-300 hover:border-red-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Global Rank</div>
                <div className="text-xl font-bold text-red-400">#42</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-all duration-300 hover:border-red-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Win Rate</div>
                <div className="text-xl font-bold text-red-400">78%</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-all duration-300 hover:border-red-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Win Streak</div>
                <div className="text-xl font-bold text-red-400">7</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-all duration-300 hover:border-red-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Challenges</div>
                <div className="text-xl font-bold text-red-400">3</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserStatsHeader;
