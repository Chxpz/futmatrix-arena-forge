
import { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { Check, X, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

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

  const isDateWithEvents = (date: Date) => {
    return scheduledMatches.some(match => 
      match.date.toDateString() === date.toDateString()
    );
  };

  const matchesForSelectedDate = selectedDate 
    ? scheduledMatches.filter(match => 
        match.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rivalizer</h1>
        <p className="text-sm text-gray-400 mt-1">Challenge other players and track your matches</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match proposals */}
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
                <div 
                  key={match.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-matrix-gray/20 bg-matrix-darker hover:border-neon-green/30 transition-colors duration-200"
                >
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
                      onClick={() => handleViewMatch(match)}
                    >
                      View Details <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
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

        {/* Calendar */}
        <Card className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-neon-green" />
              Match Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-matrix-gray/30 pointer-events-auto"
              modifiers={{
                event: (date) => isDateWithEvents(date)
              }}
              modifiersStyles={{
                event: { 
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0, 255, 65, 0.1)',
                  borderColor: 'rgba(0, 255, 65, 0.3)'
                }
              }}
            />

            <div className="mt-6">
              <h3 className="font-medium mb-2">
                {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'No date selected'}
              </h3>

              {matchesForSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {matchesForSelectedDate.map((match) => (
                    <div 
                      key={match.id}
                      className={`p-3 rounded-md border ${
                        match.status === 'upcoming' 
                          ? 'border-neon-green/30 bg-neon-green/5' 
                          : 'border-matrix-gray/20 bg-matrix-darker'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{match.time}</span>
                        <span className={match.status === 'upcoming' ? 'text-neon-green text-xs' : 'text-gray-400 text-xs'}>
                          {match.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="text-xs bg-matrix-gray/30">
                            {match.opponent.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{match.opponent.name}</span>
                      </div>
                      {match.status === 'completed' && match.result && (
                        <div className="mt-2 text-sm">
                          <span className="text-neon-green">{match.result.playerScore}</span>
                          {' - '}
                          <span>{match.result.opponentScore}</span>
                          <span className="ml-2 text-xs text-gray-400">
                            {match.result.playerScore > match.result.opponentScore 
                              ? 'Victory' 
                              : match.result.playerScore < match.result.opponentScore 
                                ? 'Defeat' 
                                : 'Draw'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No matches scheduled for this day</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match proposal dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  onClick={handleDecline}
                  className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
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
    </div>
  );
};

export default Rivalizer;
