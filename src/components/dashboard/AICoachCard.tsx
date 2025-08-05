import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useUserStats, useUserTrainingPlans } from '@/hooks/use-user-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain, Target, TrendingUp } from 'lucide-react';

interface AICoachCardProps {
  userId: string;
}

export const AICoachCard = ({ userId }: AICoachCardProps) => {
  const navigate = useNavigate();
  const { data: userStats, isLoading: statsLoading } = useUserStats(userId);
  const { data: trainingPlans, isLoading: plansLoading } = useUserTrainingPlans(userId);
  
  const activeTrainingPlan = trainingPlans?.find(plan => plan.status === 'in_progress');
  
  if (statsLoading || plansLoading) {
    return (
      <Card className="bg-matrix-dark border-matrix-gray/30">
        <CardHeader>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
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

  const getRecommendations = () => {
    const recommendations = [];
    
    if (userStats?.avg_shot_efficiency && userStats.avg_shot_efficiency < 0.6) {
      recommendations.push('Shot accuracy training');
    }
    if (userStats?.avg_pass_efficiency && userStats.avg_pass_efficiency < 0.7) {
      recommendations.push('Passing precision drills');
    }
    if (userStats?.avg_defensive_efficiency && userStats.avg_defensive_efficiency < 0.6) {
      recommendations.push('Defensive positioning');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Advanced skill refinement', 'Match analysis review');
    }
    
    return recommendations.slice(0, 2);
  };

  const recommendations = getRecommendations();

  return (
    <Card className="bg-matrix-dark border-matrix-gray/30">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-neon-green" />
          <CardTitle>AI Coach</CardTitle>
        </div>
        <CardDescription>Personal training recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative p-4 rounded-lg bg-matrix-darker border border-matrix-gray/20">
          <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-radial from-neon-green/20 to-transparent opacity-60"></div>
          
          {activeTrainingPlan && (
            <div className="mb-4">
              <Badge variant="outline" className="border-neon-green/50 text-neon-green">
                Active Training Plan
              </Badge>
              <p className="text-sm text-gray-400 mt-1">
                Progress: Week {Math.ceil((Date.now() - new Date(activeTrainingPlan.start_date).getTime()) / (7 * 24 * 60 * 60 * 1000))} 
              </p>
            </div>
          )}
          
          <p className="text-sm mb-4">
            {userStats?.matches_played ? 
              `Based on your ${userStats.matches_played} matches, focus on:` :
              'Start playing matches to get personalized recommendations:'
            }
          </p>
          
          <ul className="space-y-2 mb-4">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm flex items-center">
                <Target className="h-3 w-3 text-neon-green mr-2" />
                {rec}
              </li>
            ))}
          </ul>
          
          <Button 
            className="w-full bg-neon-green text-black hover:bg-neon-green/90"
            onClick={() => navigate('/ai-coach')}
          >
            {activeTrainingPlan ? 'Continue Training' : 'Start Training'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICoachCard;