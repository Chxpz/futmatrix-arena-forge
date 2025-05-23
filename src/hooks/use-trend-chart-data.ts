
import { useEffect, useState } from 'react';

// More comprehensive mock data for efficiencies
const efficiencyData = [
  {
    matchId: 1,
    date: 'Apr 1',
    possessionEfficiency: 65,
    shotEfficiency: 52,
    passEfficiency: 78,
    defensiveEfficiency: 61,
    overallPerformance: 65,
  },
  {
    matchId: 2,
    date: 'Apr 8',
    possessionEfficiency: 68,
    shotEfficiency: 55,
    passEfficiency: 75,
    defensiveEfficiency: 59,
    overallPerformance: 68,
  },
  {
    matchId: 3,
    date: 'Apr 15',
    possessionEfficiency: 71,
    shotEfficiency: 58,
    passEfficiency: 81,
    defensiveEfficiency: 63,
    overallPerformance: 70,
  },
  {
    matchId: 4,
    date: 'Apr 22',
    possessionEfficiency: 69,
    shotEfficiency: 60,
    passEfficiency: 79,
    defensiveEfficiency: 67,
    overallPerformance: 69,
  },
  {
    matchId: 5,
    date: 'Apr 29',
    possessionEfficiency: 74,
    shotEfficiency: 63,
    passEfficiency: 82,
    defensiveEfficiency: 71,
    overallPerformance: 72,
  },
  {
    matchId: 6,
    date: 'May 6',
    possessionEfficiency: 75,
    shotEfficiency: 64,
    passEfficiency: 84,
    defensiveEfficiency: 73,
    overallPerformance: 74,
  },
  {
    matchId: 7,
    date: 'May 13',
    possessionEfficiency: 73,
    shotEfficiency: 61,
    passEfficiency: 83,
    defensiveEfficiency: 70,
    overallPerformance: 72,
  },
];

// More comprehensive mock data for match metrics
const matchMetricsData = [
  {
    matchId: 1,
    date: 'Apr 1',
    goalsScored: 1,
    possession: 52,
    shots: 8,
    passesAttempted: 425,
    passAccuracy: 81,
    tackles: 12,
  },
  {
    matchId: 2,
    date: 'Apr 8',
    goalsScored: 2,
    possession: 56,
    shots: 10,
    passesAttempted: 450,
    passAccuracy: 83,
    tackles: 14,
  },
  {
    matchId: 3,
    date: 'Apr 15',
    goalsScored: 2,
    possession: 58,
    shots: 11,
    passesAttempted: 472,
    passAccuracy: 85,
    tackles: 15,
  },
  {
    matchId: 4,
    date: 'Apr 22',
    goalsScored: 1,
    possession: 54,
    shots: 9,
    passesAttempted: 445,
    passAccuracy: 82,
    tackles: 13,
  },
  {
    matchId: 5,
    date: 'Apr 29',
    goalsScored: 3,
    possession: 62,
    shots: 13,
    passesAttempted: 502,
    passAccuracy: 86,
    tackles: 16,
  },
  {
    matchId: 6,
    date: 'May 6',
    goalsScored: 2,
    possession: 60,
    shots: 12,
    passesAttempted: 490,
    passAccuracy: 85,
    tackles: 15,
  },
  {
    matchId: 7,
    date: 'May 13',
    goalsScored: 3,
    possession: 63,
    shots: 14,
    passesAttempted: 510,
    passAccuracy: 87,
    tackles: 17,
  },
];

// Chart configurations for different metrics
export const efficiencyConfig = {
  possessionEfficiency: { label: 'Possession', color: '#00FF41' }, // neon-green
  shotEfficiency: { label: 'Shots', color: '#1EAEDB' }, // neon-blue
  passEfficiency: { label: 'Passing', color: '#FFDD00' }, // neon-yellow
  defensiveEfficiency: { label: 'Defense', color: '#FF4D4F' }, // red
  overallPerformance: { label: 'Overall', color: '#FFFFFF' }, // white
};

export const matchMetricsConfig = {
  goalsScored: { label: 'Goals', color: '#00FF41' }, // neon-green
  possession: { label: 'Possession', color: '#1EAEDB' }, // neon-blue
  shots: { label: 'Shots', color: '#FFDD00' }, // neon-yellow
  passAccuracy: { label: 'Pass Accuracy', color: '#FF4D4F' }, // red
  passesAttempted: { label: 'Passes', color: '#9D4EDD' }, // purple
  tackles: { label: 'Tackles', color: '#FFFFFF' }, // white
};

export type ChartType = 'efficiency' | 'matchMetrics';

export type TrendChartData = {
  config: Record<string, { label: string; color: string }>;
  data: Array<Record<string, any>>;
  metricOptions: Array<{ value: string; label: string }>;
  isLoading: boolean;
};

// Filter data based on timeFilter
const filterDataByTimeFilter = (data: Array<Record<string, any>>, timeFilter: string) => {
  switch(timeFilter) {
    case 'last5':
      return data.slice(-5);
    case 'lastMonth':
      return data.slice(-4); // Simulate last month
    case 'last3Months':
      return data; // All data we have is within 3 months
    case 'allTime':
    default:
      return data;
  }
};

export const useTrendChartData = (
  type: ChartType,
  timeFilter: string
): TrendChartData => {
  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const config = type === 'efficiency' ? efficiencyConfig : matchMetricsConfig;
  
  const metricOptions = Object.entries(config).map(([key, value]) => ({
    value: key,
    label: value.label,
  }));

  useEffect(() => {
    console.log("Loading trend data for", type, "with filter", timeFilter);
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const sourceData = type === 'efficiency' ? efficiencyData : matchMetricsData;
      const filteredData = filterDataByTimeFilter(sourceData, timeFilter);
      setData(filteredData);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [type, timeFilter]);
  
  return {
    data,
    config,
    metricOptions,
    isLoading
  };
};
