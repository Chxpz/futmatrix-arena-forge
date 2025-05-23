
import { ChartContainer, ChartLegend } from '@/components/ui/chart';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, ResponsiveContainer, Tooltip
} from 'recharts';
import { useRadarComparisonData, RadarChartType } from '@/hooks/use-radar-comparison-data';

type RadarComparisonChartProps = {
  type: RadarChartType;
  timeFilter: string;
  height: number;
};

const RadarComparisonChart = ({ type, timeFilter, height }: RadarComparisonChartProps) => {
  const { data, config } = useRadarComparisonData(type, timeFilter);
  
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }
  
  return (
    <ChartContainer className="w-full h-full" config={config}>
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#333333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <PolarRadiusAxis tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#333333' }} />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #333333',
              color: '#ffffff'
            }}
            labelStyle={{ color: '#9ca3af' }}
          />
          
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
