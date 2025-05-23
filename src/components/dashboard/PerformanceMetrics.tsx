
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart } from 'lucide-react';
import StatsSummary from './StatsSummary';
import MatchHistoryTable from './MatchHistoryTable';
import InsightsPanel from './InsightsPanel';

// Filter options
type TimeFilter = 'last5' | 'lastMonth' | 'last3Months' | 'allTime';

const PerformanceMetrics = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('last5');
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Performance Metrics</h2>
        
        {/* Time filter buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={timeFilter === 'last5' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => setTimeFilter('last5')}
            className={timeFilter === 'last5' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            Last 5 Matches
          </Button>
          <Button 
            variant={timeFilter === 'lastMonth' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => setTimeFilter('lastMonth')}
            className={timeFilter === 'lastMonth' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            Last Month
          </Button>
          <Button 
            variant={timeFilter === 'last3Months' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => setTimeFilter('last3Months')}
            className={timeFilter === 'last3Months' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            Last 3 Months
          </Button>
          <Button 
            variant={timeFilter === 'allTime' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => setTimeFilter('allTime')}
            className={timeFilter === 'allTime' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Player overview with key metrics */}
      <StatsSummary timeFilter={timeFilter} />
      
      {/* View Charts Button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => navigate('/charts')}
          className="bg-neon-green text-black hover:bg-neon-green/90 flex items-center gap-2"
        >
          <BarChart className="h-4 w-4" />
          View Detailed Charts
        </Button>
      </div>

      {/* Tabs for different metric views */}
      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="bg-matrix-darker border border-matrix-gray/30">
          <TabsTrigger value="matches">Match History</TabsTrigger>
          <TabsTrigger value="insights">Insights & Tips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches" className="mt-4">
          <Card className="bg-matrix-dark border-matrix-gray/30">
            <CardHeader>
              <CardTitle>Match History</CardTitle>
              <CardDescription>Review past match performances</CardDescription>
            </CardHeader>
            <CardContent>
              <MatchHistoryTable timeFilter={timeFilter} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-4">
          <InsightsPanel timeFilter={timeFilter} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
