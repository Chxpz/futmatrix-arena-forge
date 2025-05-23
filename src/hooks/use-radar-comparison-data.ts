
import { useEffect, useState } from 'react';

// Mock data for efficiency comparison
const efficiencyComparisonData = [
  { subject: 'Possession', recent: 74, average: 68 },
  { subject: 'Shots', recent: 63, average: 56 },
  { subject: 'Passing', recent: 82, average: 79 },
  { subject: 'Defense', recent: 71, average: 62 },
  { subject: 'Overall', recent: 72, average: 66 }
];

// Mock data for match metrics comparison
const matchMetricsComparisonData = [
  { subject: 'Goals', recent: 2, average: 1.7 },
  { subject: 'Possession %', recent: 62, average: 55 },
  { subject: 'Shots', recent: 13, average: 10 },
  { subject: 'Pass Accuracy', recent: 86, average: 83 },
  { subject: 'Tackles', recent: 16, average: 14 }
];

export const chartConfig = {
  recent: { label: 'Recent', color: '#00FF41' }, // neon-green
  average: { label: 'Average', color: '#1EAEDB' }, // neon-blue
};

export type RadarChartType = 'efficiency' | 'matchMetrics';

export const useRadarComparisonData = (type: RadarChartType, timeFilter: string) => {
  const [data, setData] = useState(
    type === 'efficiency' ? efficiencyComparisonData : matchMetricsComparisonData
  );
  
  // In real app, would fetch data based on timeFilter and type
  useEffect(() => {
    console.log("Loading radar data for", type, "with filter", timeFilter);
    setData(type === 'efficiency' ? efficiencyComparisonData : matchMetricsComparisonData);
  }, [type, timeFilter]);
  
  return { data, config: chartConfig };
};
