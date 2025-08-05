
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type MatchProposal = {
  id: string;
  opponent: {
    name: string;
    avatar: string;
    rank: string;
    winRate: number;
  };
  proposedTime: string;
  expiresIn: string;
};

interface MatchProposalCardProps {
  match: MatchProposal;
  onViewMatch: (match: MatchProposal) => void;
}

const MatchProposalCard = ({ match, onViewMatch }: MatchProposalCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-matrix-gray/20 bg-matrix-darker hover:border-neon-green/30 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={match.opponent.avatar} />
          <AvatarFallback className="bg-neon-green/20 text-neon-green">
            {match.opponent.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{match.opponent.name}</p>
          <div className="flex items-center text-sm text-gray-400">
            <span className="text-neon-green mr-2">{match.opponent.rank}</span>
            <span>Win rate: {match.opponent.winRate}%</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-sm font-medium">{match.proposedTime}</p>
        <p className="text-xs text-gray-400">Expires in {match.expiresIn}</p>
        
        <Button
          variant="link"
          className="text-neon-green p-0 h-auto mt-1"
          onClick={() => onViewMatch(match)}
        >
          View Details <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default MatchProposalCard;
