
import { Button } from '@/components/ui/button';

const QuickActionsSection = () => {
  return (
    <div className="flex space-x-3 mt-6">
      <Button className="bg-red-600 hover:bg-red-700 text-white border-red-500 transition-all hover:shadow-lg hover:shadow-red-600/20">
        Find Opponent
      </Button>
      <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-950/30 transition-all">
        View Challenges
      </Button>
      <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-950/30 transition-all">
        Match History
      </Button>
    </div>
  );
};

export default QuickActionsSection;
