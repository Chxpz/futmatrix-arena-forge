
import { Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  return (
    <div className="lg:w-80 border-r border-red-900/30 bg-gradient-to-b from-red-950/10 to-transparent p-6 space-y-6 overflow-y-auto">
      {/* Rivalizer's Current Focus */}
      <div className="bg-gradient-to-r from-red-950/30 to-red-900/20 border border-red-800/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-300 flex items-center mb-3">
          <Flame className="w-5 h-5 mr-2 animate-pulse" />
          Current Focus
        </h3>
        <p className="text-gray-300 text-sm">
          "Scanning for opponents matching your skill level... 
          <span className="text-red-400 font-medium"> 3 potential matches found!</span>"
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="text-md font-medium text-red-300 mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Quick Actions
        </h4>
        <div className="space-y-2">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-red-500 transition-all hover:shadow-lg hover:shadow-red-600/20">
            Find Opponent
          </Button>
          <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-950/30 transition-all">
            View Challenges
          </Button>
          <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-950/30 transition-all">
            Match History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
