
import { TrendingDown, TrendingUp } from 'lucide-react';

type StatsSummaryProps = {
  timeFilter: string;
}

const StatsSummary = ({ timeFilter }: StatsSummaryProps) => {
  // In a real app, these metrics would be fetched based on the timeFilter
  // Using mock data for now
  const metrics = {
    totalMatches: 23,
    averageGoals: 1.7,
    overallPerformance: 72,
    lastMatchDate: '2025-05-22',
    lastMatchResult: 'Win',
    matchesIncrease: true,
    goalsIncrease: false,
    performanceIncrease: true
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Matches */}
      <div className="bg-matrix-dark border border-matrix-gray/30 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Total Matches</span>
          {metrics.matchesIncrease ? (
            <TrendingUp className="h-4 w-4 text-neon-green" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-400" />
          )}
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">{metrics.totalMatches}</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          {metrics.matchesIncrease ? '+3 since last month' : '-2 since last month'}
        </div>
      </div>
      
      {/* Average Goals */}
      <div className="bg-matrix-dark border border-matrix-gray/30 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Avg. Goals / Match</span>
          {metrics.goalsIncrease ? (
            <TrendingUp className="h-4 w-4 text-neon-green" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-400" />
          )}
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">{metrics.averageGoals}</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          {metrics.goalsIncrease ? '+0.3 since last month' : '-0.2 since last month'}
        </div>
      </div>
      
      {/* Overall Performance */}
      <div className="bg-matrix-dark border border-matrix-gray/30 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Performance Rating</span>
          {metrics.performanceIncrease ? (
            <TrendingUp className="h-4 w-4 text-neon-green" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-400" />
          )}
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">{metrics.overallPerformance}%</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          {metrics.performanceIncrease ? '+5% since last month' : '-3% since last month'}
        </div>
      </div>
      
      {/* Last Match */}
      <div className="bg-matrix-dark border border-matrix-gray/30 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Last Match</span>
          <div className={`px-1.5 py-0.5 rounded text-xs ${
            metrics.lastMatchResult === 'Win' ? 'bg-green-600/20 text-green-400' :
            metrics.lastMatchResult === 'Draw' ? 'bg-yellow-600/20 text-yellow-400' :
            'bg-red-600/20 text-red-400'
          }`}>
            {metrics.lastMatchResult}
          </div>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">May 22</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          vs. Manchester United (3-1)
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
