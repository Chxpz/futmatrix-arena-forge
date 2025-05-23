
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import StatsSummary from './StatsSummary';
import TrendChart from './TrendChart';
import RadarComparisonChart from './RadarComparisonChart';
import MatchHistoryTable from './MatchHistoryTable';
import InsightsPanel from './InsightsPanel';

// Filter options
type TimeFilter = 'last5' | 'lastMonth' | 'last3Months' | 'allTime';

const PerformanceMetrics = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('last5');
  
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

      {/* Tabs for different metric views */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="bg-matrix-darker border border-matrix-gray/30">
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="comparison">Comparative Analysis</TabsTrigger>
          <TabsTrigger value="matches">Match History</TabsTrigger>
          <TabsTrigger value="insights">Insights & Tips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Efficiency Trends */}
            <Card className="bg-matrix-dark border-matrix-gray/30">
              <CardHeader>
                <CardTitle>Core Efficiencies</CardTitle>
                <CardDescription>Performance trends with 3-match moving average</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <TrendChart 
                  type="efficiency"
                  timeFilter={timeFilter} 
                  height={300}
                />
              </CardContent>
            </Card>
            
            {/* Match Metrics Trends */}
            <Card className="bg-matrix-dark border-matrix-gray/30">
              <CardHeader>
                <CardTitle>Match Metrics</CardTitle>
                <CardDescription>Key statistics from recent matches</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <TrendChart 
                  type="matchMetrics"
                  timeFilter={timeFilter} 
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Efficiency Comparison */}
            <Card className="bg-matrix-dark border-matrix-gray/30">
              <CardHeader>
                <CardTitle>Efficiency Comparison</CardTitle>
                <CardDescription>Last 3 matches vs overall average</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <RadarComparisonChart 
                  type="efficiency" 
                  timeFilter={timeFilter} 
                  height={300}
                />
              </CardContent>
            </Card>
            
            {/* Match Metrics Comparison */}
            <Card className="bg-matrix-dark border-matrix-gray/30">
              <CardHeader>
                <CardTitle>Match Metrics Comparison</CardTitle>
                <CardDescription>Last match vs overall average</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <RadarComparisonChart 
                  type="matchMetrics" 
                  timeFilter={timeFilter} 
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
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
