
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';

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

  // Placeholder data - this would come from your API
  const stats = [
    {
      icon: Trophy,
      title: 'Rivalizer Matches',
      value: '12',
      description: '3 won, 5 lost, 4 drawn'
    },
    {
      icon: TrendingUp,
      title: 'Performance',
      value: '68%',
      description: '12% increase from last month'
    },
    {
      icon: Users,
      title: 'Global Rank',
      value: '#234',
      description: 'Top 15% of all players'
    }
  ];

  // Placeholder for upcoming matches - this would come from your API
  const upcomingMatches = [
    {
      id: '1',
      opponent: 'Alex Rodriguez',
      date: 'Tomorrow, 8:00 PM',
      opponentRank: '#145'
    },
    {
      id: '2',
      opponent: 'Sarah Connor',
      date: 'Sat, 6:30 PM',
      opponentRank: '#78'
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
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Performance Metrics Section */}
      <PerformanceMetrics />

      {/* Upcoming matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>Upcoming Matches</CardTitle>
            <CardDescription>Your next Rivalizer challenges</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingMatches.length > 0 ? (
              <div className="space-y-4">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-3 bg-matrix-darker rounded-lg border border-matrix-gray/20">
                    <div>
                      <p className="font-medium">{match.opponent}</p>
                      <p className="text-sm text-gray-400">{match.date}</p>
                    </div>
                    <div className="text-sm text-neon-green">{match.opponentRank}</div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-2 border-matrix-gray/30"
                  onClick={() => navigate('/rivalizer')}
                >
                  View All Matches
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No upcoming matches</p>
                <Button 
                  variant="default" 
                  className="bg-neon-green text-black hover:bg-neon-green/90"
                  onClick={() => navigate('/rivalizer')}
                >
                  Find Opponents
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Coach card */}
        <Card className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>AI Coach</CardTitle>
            <CardDescription>Personal training recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative p-4 rounded-lg bg-matrix-darker border border-matrix-gray/20">
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-radial from-neon-green/20 to-transparent opacity-60"></div>
              <p className="text-sm mb-4">Based on your recent matches, your AI coach recommends focusing on:</p>
              <ul className="space-y-2 mb-4">
                <li className="text-sm flex items-center">
                  <span className="text-neon-green mr-2">▹</span> Defensive positioning in 1v1 situations
                </li>
                <li className="text-sm flex items-center">
                  <span className="text-neon-green mr-2">▹</span> Power shot accuracy from outside the box
                </li>
              </ul>
              <Button 
                className="mt-2 w-full bg-neon-green text-black hover:bg-neon-green/90"
                onClick={() => navigate('/coach')}
              >
                Continue Training
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
