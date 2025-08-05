
import { Card } from '@/components/ui/card';
import { Trophy, Users, BookOpen } from 'lucide-react';

const CoachStatsCards = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-teal-950/20 border-teal-800/30 hover:bg-teal-950/30 transition-colors">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-teal-400 mr-1" />
            </div>
            <div className="text-sm text-gray-400 mb-1">Players Improved</div>
            <div className="text-2xl font-bold text-teal-400">12,847</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-teal-950/20 border-teal-800/30 hover:bg-teal-950/30 transition-colors">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-teal-400 mr-1" />
            </div>
            <div className="text-sm text-gray-400 mb-1">Active Students</div>
            <div className="text-2xl font-bold text-teal-400">3,429</div>
          </div>
        </Card>
      </div>
      
      <Card className="p-4 bg-teal-950/20 border-teal-800/30 hover:bg-teal-950/30 transition-colors">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <BookOpen className="w-5 h-5 text-teal-400 mr-1" />
          </div>
          <div className="text-sm text-gray-400 mb-1">Training Sessions</div>
          <div className="text-2xl font-bold text-teal-400">28,934</div>
        </div>
      </Card>
    </>
  );
};

export default CoachStatsCards;
