
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MatchProposalCard from './MatchProposalCard';

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

interface MatchProposalsSectionProps {
  matches: MatchProposal[];
  onViewMatch: (match: MatchProposal) => void;
}

const MatchProposalsSection = ({ matches, onViewMatch }: MatchProposalsSectionProps) => {
  return (
    <Card className="lg:col-span-2 bg-matrix-dark border-matrix-gray/30">
      <CardHeader>
        <CardTitle>Match Proposals</CardTitle>
        <CardDescription>
          Players who have challenged you to a match
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {matches.length > 0 ? (
          matches.map((match) => (
            <MatchProposalCard
              key={match.id}
              match={match}
              onViewMatch={onViewMatch}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No pending match proposals</p>
            <Button 
              className="mt-4 bg-neon-green text-black hover:bg-neon-green/90"
              disabled
            >
              Find Opponents (Coming Soon)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchProposalsSection;
