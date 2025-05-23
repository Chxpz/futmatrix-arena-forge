
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import MatchProposalsSection from '@/components/rivalizer/MatchProposalsSection';
import MatchCalendarSection from '@/components/rivalizer/MatchCalendarSection';
import MatchProposalDialog from '@/components/rivalizer/MatchProposalDialog';

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

type ScheduledMatch = {
  id: string;
  opponent: {
    name: string;
    avatar: string;
    rank: string;
  };
  date: Date;
  time: string;
  status: 'upcoming' | 'completed';
  result?: {
    playerScore: number;
    opponentScore: number;
  };
};

const Rivalizer = () => {
  const [selectedMatch, setSelectedMatch] = useState<MatchProposal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [matches, setMatches] = useState<MatchProposal[]>([
    {
      id: '1',
      opponent: {
        name: 'Alex Smith',
        avatar: '',
        rank: '#120',
        winRate: 68,
      },
      proposedTime: 'Today, 8:30 PM',
      expiresIn: '3 hours',
    },
    {
      id: '2',
      opponent: {
        name: 'Maria Johnson',
        avatar: '',
        rank: '#45',
        winRate: 75,
      },
      proposedTime: 'Tomorrow, 7:00 PM',
      expiresIn: '12 hours',
    },
    {
      id: '3',
      opponent: {
        name: 'James Wilson',
        avatar: '',
        rank: '#310',
        winRate: 52,
      },
      proposedTime: 'Today, 10:00 PM',
      expiresIn: '5 hours',
    },
  ]);

  const [scheduledMatches, setScheduledMatches] = useState<ScheduledMatch[]>([
    {
      id: '101',
      opponent: {
        name: 'David Brown',
        avatar: '',
        rank: '#78',
      },
      date: new Date(Date.now() + 86400000), // tomorrow
      time: '6:30 PM',
      status: 'upcoming',
    },
    {
      id: '102',
      opponent: {
        name: 'Sarah Miller',
        avatar: '',
        rank: '#155',
      },
      date: new Date(Date.now() + 172800000), // day after tomorrow
      time: '8:00 PM',
      status: 'upcoming',
    },
    {
      id: '103',
      opponent: {
        name: 'Robert Davis',
        avatar: '',
        rank: '#92',
      },
      date: new Date(Date.now() - 86400000), // yesterday
      time: '7:45 PM',
      status: 'completed',
      result: {
        playerScore: 3,
        opponentScore: 1,
      },
    },
  ]);

  const handleViewMatch = (match: MatchProposal) => {
    setSelectedMatch(match);
    setIsDialogOpen(true);
  };

  const handleAccept = () => {
    if (!selectedMatch) return;

    // Update scheduled matches
    const newScheduledMatch: ScheduledMatch = {
      id: `scheduled-${selectedMatch.id}`,
      opponent: selectedMatch.opponent,
      date: new Date(),
      time: selectedMatch.proposedTime.split(', ')[1],
      status: 'upcoming',
    };

    setScheduledMatches([...scheduledMatches, newScheduledMatch]);
    
    // Remove from proposals
    setMatches(matches.filter(m => m.id !== selectedMatch.id));
    
    setIsDialogOpen(false);
    setSelectedMatch(null);
    
    toast({
      title: "Match accepted",
      description: `Your match with ${selectedMatch.opponent.name} has been scheduled`,
    });
  };

  const handleDecline = () => {
    if (!selectedMatch) return;
    
    // Remove from proposals
    setMatches(matches.filter(m => m.id !== selectedMatch.id));
    
    setIsDialogOpen(false);
    setSelectedMatch(null);
    
    toast({
      title: "Match declined",
      description: "The match proposal has been declined",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rivalizer</h1>
        <p className="text-sm text-gray-400 mt-1">Challenge other players and track your matches</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MatchProposalsSection
          matches={matches}
          onViewMatch={handleViewMatch}
        />

        <MatchCalendarSection
          scheduledMatches={scheduledMatches}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      <MatchProposalDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedMatch={selectedMatch}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
};

export default Rivalizer;
