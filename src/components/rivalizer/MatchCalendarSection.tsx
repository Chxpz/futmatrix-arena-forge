
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';

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

interface MatchCalendarSectionProps {
  scheduledMatches: ScheduledMatch[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const MatchCalendarSection = ({ 
  scheduledMatches, 
  selectedDate, 
  onSelectDate 
}: MatchCalendarSectionProps) => {
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
          onSelect={onSelectDate}
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
  );
};

export default MatchCalendarSection;
