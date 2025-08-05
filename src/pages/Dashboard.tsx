
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';
import { useCurrentUser, useUserStats } from '@/hooks/use-user-data';
import AICoachCard from '@/components/dashboard/AICoachCard';
import RivalizerCard from '@/components/dashboard/RivalizerCard';

const StatsCard = ({ icon: Icon, title, value, description }: { 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  description: string;
}) => (
  <Card className="bg-matrix-dark border-matrix-gray/30 overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-neon-green" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: userStats, isLoading: statsLoading } = useUserStats(user?.id || '');

  const stats = [
    {
      icon: Trophy,
      title: 'Rivalizer Matches',
      value: userStats?.matches_played?.toString() || '0',
      description: `${userStats?.wins || 0} won, ${userStats?.losses || 0} lost, ${userStats?.draws || 0} drawn`
    },
    {
      icon: TrendingUp,
      title: 'Win Rate',
      value: `${Math.round((userStats?.win_rate || 0) * 100)}%`,
      description: userStats?.performance_trend_5 ? 
        `${userStats.performance_trend_5 > 0 ? '+' : ''}${Math.round(userStats.performance_trend_5 * 100)}% trend` : 
        'Performance tracking'
    },
    {
      icon: Users,
      title: 'Overall Performance',
      value: userStats?.avg_overall_performance ? 
        `${Math.round(userStats.avg_overall_performance * 100)}%` : 
        'N/A',
      description: 'Average match rating'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/profile')}
          className="border border-neon-green/30 text-neon-green hover:bg-neon-green/10"
        >
          Complete Your Profile
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="bg-matrix-dark border-matrix-gray/30">
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Performance Metrics Section */}
      <PerformanceMetrics />

      {/* Enhanced AI sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RivalizerCard userId={user?.id || ''} />
        <AICoachCard userId={user?.id || ''} />
      </div>
    </div>
  );
};

export default Dashboard;
