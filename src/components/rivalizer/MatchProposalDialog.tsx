
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Check, X } from 'lucide-react';

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

interface MatchProposalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMatch: MatchProposal | null;
  onAccept: () => void;
  onDecline: () => void;
}

const MatchProposalDialog = ({
  isOpen,
  onOpenChange,
  selectedMatch,
  onAccept,
  onDecline
}: MatchProposalDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-matrix-dark border-matrix-gray/30">
        {selectedMatch && (
          <>
            <DialogHeader>
              <DialogTitle>Match Proposal</DialogTitle>
              <DialogDescription>
                Review the details and accept or decline this match
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-neon-green/20 text-neon-green text-xl">
                    {selectedMatch.opponent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{selectedMatch.opponent.name}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="text-neon-green mr-2">{selectedMatch.opponent.rank}</span>
                    <span>Win rate: {selectedMatch.opponent.winRate}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between p-3 rounded-md bg-matrix-darker">
                  <span className="text-gray-400">Proposed Time</span>
                  <span className="font-medium">{selectedMatch.proposedTime}</span>
                </div>
                <div className="flex justify-between p-3 rounded-md bg-matrix-darker">
                  <span className="text-gray-400">Proposal Expires</span>
                  <span className="font-medium">In {selectedMatch.expiresIn}</span>
                </div>
              </div>
              
              <div className="bg-neon-green/10 border border-neon-green/30 rounded-md p-3 text-sm">
                <p>
                  By accepting this match, you agree to play at the scheduled time.
                  No-shows may affect your player rating.
                </p>
              </div>
            </div>
            
            <DialogFooter className="flex sm:justify-between">
              <Button
                variant="outline"
                onClick={onDecline}
                className="border-red-500/30 text-red-500 hover:bg-red-500/10"
              >
                <X className="h-4 w-4 mr-2" />
                Decline
              </Button>
              <Button
                onClick={onAccept}
                className="bg-neon-green text-black hover:bg-neon-green/90"
              >
                <Check className="h-4 w-4 mr-2" />
                Accept Challenge
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MatchProposalDialog;
