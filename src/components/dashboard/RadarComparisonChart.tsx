
import { useEffect, useState } from 'react';
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';

type RadarComparisonChartProps = {
  type: 'efficiency' | 'matchMetrics';
  timeFilter: string;
  height: number;
};

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
  { subject: 'Goals', recent: 2, average: 1.7, fullMark: 3 },
  { subject: 'Possession %', recent: 62, average: 55, fullMark: 100 },
  { subject: 'Shots', recent: 13, average: 10, fullMark: 15 },
  { subject: 'Pass Accuracy', recent: 86, average: 83, fullMark: 100 },
  { subject: 'Tackles', recent: 16, average: 14, fullMark: 20 }
];

const chartConfig = {
  recent: { label: 'Recent', color: '#00FF41' }, // neon-green
  average: { label: 'Average', color: '#1EAEDB' }, // neon-blue
};

const RadarComparisonChart = ({ type, timeFilter, height }: RadarComparisonChartProps) => {
  const [data, setData] = useState(
    type === 'efficiency' ? efficiencyComparisonData : matchMetricsComparisonData
  );
  
  // In real app, would fetch data based on timeFilter and type
  useEffect(() => {
    setData(type === 'efficiency' ? efficiencyComparisonData : matchMetricsComparisonData);
  }, [type, timeFilter]);
  
  return (
    <ChartContainer className="aspect-auto h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <PolarRadiusAxis tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#333333' }} />
          
          <ChartTooltip content={<ChartTooltipContent />} />
          
          <Radar
            name="Recent"
            dataKey="recent"
            stroke="#00FF41"
            fill="#00FF41"
            fillOpacity={0.3}
          />
          
          <Radar
            name="Average"
            dataKey="average"
            stroke="#1EAEDB"
            fill="#1EAEDB"
            fillOpacity={0.3}
          />
          
          <ChartLegend />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RadarComparisonChart;
