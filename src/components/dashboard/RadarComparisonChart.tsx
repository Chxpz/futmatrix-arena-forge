
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, ResponsiveContainer
} from 'recharts';
import { useRadarComparisonData, RadarChartType } from '@/hooks/use-radar-comparison-data';

type RadarComparisonChartProps = {
  type: RadarChartType;
  timeFilter: string;
  height: number;
};

const RadarComparisonChart = ({ type, timeFilter, height }: RadarComparisonChartProps) => {
  const { data, config } = useRadarComparisonData(type, timeFilter);
  
  return (
    <ChartContainer className="aspect-auto h-full" config={config}>
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
