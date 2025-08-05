
import { Card } from '@/components/ui/card';
import { DollarSign, Users, Zap } from 'lucide-react';

const CompetitionStatsCards = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-red-400 mr-1" />
            </div>
            <div className="text-sm text-gray-400 mb-1">Total Earned</div>
            <div className="text-2xl font-bold text-red-400">$47,832</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-red-400 mr-1" />
            </div>
            <div className="text-sm text-gray-400 mb-1">Users Served</div>
            <div className="text-2xl font-bold text-red-400">1,247</div>
          </div>
        </Card>
      </div>
      
      <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 text-red-400 mr-1" />
          </div>
          <div className="text-sm text-gray-400 mb-1">Matches Created</div>
          <div className="text-2xl font-bold text-red-400">8,934</div>
        </div>
      </Card>
    </>
  );
};

export default CompetitionStatsCards;
