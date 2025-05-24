
import { Card } from '@/components/ui/card';

const CompetitionStatsCards = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Active Challenges</div>
            <div className="text-2xl font-bold text-red-400">3</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Win Streak</div>
            <div className="text-2xl font-bold text-red-400">7</div>
          </div>
        </Card>
      </div>
      
      <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">Rank Position</div>
          <div className="text-2xl font-bold text-red-400">#42</div>
        </div>
      </Card>
      
      <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Current Focus</div>
          <div className="text-sm text-red-300">"Scanning for opponents matching your skill level... 3 potential matches found!"</div>
        </div>
      </Card>
    </>
  );
};

export default CompetitionStatsCards;
