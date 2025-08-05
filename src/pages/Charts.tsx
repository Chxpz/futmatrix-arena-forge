
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import TrendChart from '@/components/dashboard/TrendChart';
import RadarComparisonChart from '@/components/dashboard/RadarComparisonChart';
import MatchHistoryTable from '@/components/dashboard/MatchHistoryTable';
import StatsSummary from '@/components/dashboard/StatsSummary';
import InsightsPanel from '@/components/dashboard/InsightsPanel';
import { toast } from 'sonner';
import { ChartArea, ChartBar, ChartLine, Radar } from 'lucide-react';

// Filter options
type TimeFilter = 'last5' | 'lastMonth' | 'last3Months' | 'allTime';

const Charts = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('last5');
  
  const handleFilterChange = (filter: TimeFilter) => {
    setTimeFilter(filter);
    toast.success(`Data filtered to ${filter}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
        
        {/* Time filter buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={timeFilter === 'last5' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => handleFilterChange('last5')}
            className={timeFilter === 'last5' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            Last 5 Matches
          </Button>
          <Button 
            variant={timeFilter === 'lastMonth' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => handleFilterChange('lastMonth')}
            className={timeFilter === 'lastMonth' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            Last Month
          </Button>
          <Button 
            variant={timeFilter === 'last3Months' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => handleFilterChange('last3Months')}
            className={timeFilter === 'last3Months' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            Last 3 Months
          </Button>
          <Button 
            variant={timeFilter === 'allTime' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => handleFilterChange('allTime')}
            className={timeFilter === 'allTime' ? 'bg-neon-green text-black' : 'border-neon-green/30 text-neon-green'}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Player Overview Section */}
      <StatsSummary timeFilter={timeFilter} />

      {/* Tabs for different metric views */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="bg-matrix-darker border border-matrix-gray/30">
          <TabsTrigger value="trends" className="flex items-center gap-1">
            <ChartLine className="h-4 w-4" />
            Performance Trends
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-1">
            <Radar className="h-4 w-4" />
            Comparative Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <ChartBar className="h-4 w-4" />
            Match History
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-1">
            <ChartArea className="h-4 w-4" />
            Insights & Tips
          </TabsTrigger>
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
              <CardContent className="pt-0 h-[350px] flex items-center justify-center">
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
              <CardContent className="pt-0 h-[350px] flex items-center justify-center">
                <RadarComparisonChart 
                  type="matchMetrics" 
                  timeFilter={timeFilter} 
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
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

export default Charts;
