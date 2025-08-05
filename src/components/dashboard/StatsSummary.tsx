
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useCurrentUser, useUserStats, useUserMatches } from '@/hooks/use-user-data';
import { formatDistanceToNow } from 'date-fns';

type StatsSummaryProps = {
  timeFilter: string;
}

const StatsSummary = ({ timeFilter }: StatsSummaryProps) => {
  const { data: user } = useCurrentUser();
  const { data: userStats } = useUserStats(user?.id || '');
  const { data: recentMatches } = useUserMatches(user?.id || '', 5);
  
  const lastMatch = recentMatches?.[0];
  const lastMatchResult = lastMatch ? 
    (lastMatch.score_user !== undefined && lastMatch.score_opponent !== undefined ?
      (lastMatch.score_user > lastMatch.score_opponent ? 'Win' : 
       lastMatch.score_user < lastMatch.score_opponent ? 'Loss' : 'Draw') : 'Completed') 
    : null;

  const avgGoals = userStats?.goals_scored && userStats?.matches_played ? 
    (userStats.goals_scored / userStats.matches_played).toFixed(1) : 0;

  const metrics = {
    totalMatches: userStats?.matches_played || 0,
    averageGoals: Number(avgGoals),
    overallPerformance: userStats?.avg_overall_performance ? Math.round(userStats.avg_overall_performance * 100) : 0,
    lastMatchDate: lastMatch?.timestamp,
    lastMatchResult,
    lastMatchScore: lastMatch?.score_user !== undefined && lastMatch?.score_opponent !== undefined ? 
      `${lastMatch.score_user}-${lastMatch.score_opponent}` : null,
    matchesIncrease: (userStats?.performance_trend_5 || 0) > 0,
    goalsIncrease: (userStats?.performance_trend_5 || 0) > 0,
    performanceIncrease: (userStats?.performance_trend_5 || 0) > 0
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
          {userStats?.performance_trend_5 ? 
            `${userStats.performance_trend_5 > 0 ? '+' : ''}${Math.round(userStats.performance_trend_5 * 100)}% trend` : 
            'No trend data'}
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
          Goals per match average
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
          {userStats?.performance_trend_5 ? 
            `${userStats.performance_trend_5 > 0 ? '+' : ''}${Math.round(userStats.performance_trend_5 * 100)}% trend` : 
            'Overall match performance'}
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
          <span className="text-2xl font-bold text-white">
            {metrics.lastMatchDate ? 
              formatDistanceToNow(new Date(metrics.lastMatchDate), { addSuffix: true }) : 
              'No matches'}
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          {metrics.lastMatchScore ? `Score: ${metrics.lastMatchScore}` : 'Start playing!'}
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
