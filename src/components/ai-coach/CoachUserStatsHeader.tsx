
import { Card } from '@/components/ui/card';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';

const CoachUserStatsHeader = () => {
  return (
    <div className="border-b border-teal-900/30 bg-gradient-to-r from-matrix-darker via-teal-950/10 to-matrix-darker p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-3 bg-teal-950/20 border-teal-800/30 hover:bg-teal-950/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-teal-600/20 border border-teal-500/30">
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Skill Level</div>
              <div className="text-lg font-bold text-teal-400">Elite</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-3 bg-teal-950/20 border-teal-800/30 hover:bg-teal-950/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-teal-600/20 border border-teal-500/30">
              <Target className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Training Goals</div>
              <div className="text-lg font-bold text-teal-400">4 Active</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-3 bg-teal-950/20 border-teal-800/30 hover:bg-teal-950/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-teal-600/20 border border-teal-500/30">
              <Award className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Improvement</div>
              <div className="text-lg font-bold text-teal-400">+23%</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-3 bg-teal-950/20 border-teal-800/30 hover:bg-teal-950/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-teal-600/20 border border-teal-500/30">
              <Calendar className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Sessions</div>
              <div className="text-lg font-bold text-teal-400">47</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CoachUserStatsHeader;
