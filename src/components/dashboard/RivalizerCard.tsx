import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useUserMatches } from '@/hooks/use-user-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Swords, Clock, Trophy } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RivalizerCardProps {
  userId: string;
}

export const RivalizerCard = ({ userId }: RivalizerCardProps) => {
  const navigate = useNavigate();
  const { data: recentMatches, isLoading: matchesLoading } = useUserMatches(userId, 5);
  
  if (matchesLoading) {
    return (
      <Card className="bg-matrix-dark border-matrix-gray/30">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const rivalizeMatches = recentMatches?.filter(match => match.match_type === 'rivalizer') || [];
  const lastRivalizerMatch = rivalizeMatches[0];
  
  // For now, no scheduled matches - this would come from a scheduled_matches table
  const upcomingMatches: any[] = [];

  return (
    <Card className="bg-matrix-dark border-matrix-gray/30">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Swords className="h-5 w-5 text-neon-green" />
          <CardTitle>Rivalizer Matches</CardTitle>
        </div>
        <CardDescription>Competitive match challenges</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingMatches.length > 0 ? (
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-3 bg-matrix-darker rounded-lg border border-matrix-gray/20">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-neon-green" />
                  <div>
                    <p className="font-medium text-white">{match.opponent}</p>
                    <p className="text-sm text-gray-400">
                      {formatDistanceToNow(match.scheduledTime, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-neon-green/50 text-neon-green">
                  {match.opponentRank}
                </Badge>
              </div>
            ))}
            
            {lastRivalizerMatch && (
              <div className="mt-4 p-3 bg-matrix-darker/50 rounded-lg border border-matrix-gray/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Last Rivalizer:</span>
                  <span className="text-sm">
                    {lastRivalizerMatch.score_user !== undefined && lastRivalizerMatch.score_opponent !== undefined ? (
                      <Badge variant={lastRivalizerMatch.score_user > lastRivalizerMatch.score_opponent ? 'default' : 'secondary'}>
                        {lastRivalizerMatch.score_user > lastRivalizerMatch.score_opponent ? 'Won' : 'Lost'} 
                        {' '}{lastRivalizerMatch.score_user}-{lastRivalizerMatch.score_opponent}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Completed</Badge>
                    )}
                  </span>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full mt-4 border-matrix-gray/30"
              onClick={() => navigate('/rivalizer')}
            >
              View All Matches
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No upcoming matches</p>
            <p className="text-sm text-gray-500 mb-4">
              Challenge skilled opponents and climb the rankings
            </p>
            <Button 
              className="bg-neon-green text-black hover:bg-neon-green/90"
              onClick={() => navigate('/ai-rivalizer')}
            >
              Find Opponents
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RivalizerCard;