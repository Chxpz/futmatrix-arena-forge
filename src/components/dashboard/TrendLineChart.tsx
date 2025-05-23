
import { ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

type TrendLineChartProps = {
  data: Array<Record<string, any>>;
  selectedMetric: string;
  metricColor: string;
  isEfficiency: boolean;
  height: number;
};

const TrendLineChart = ({
  data,
  selectedMetric,
  metricColor,
  isEfficiency,
  height,
}: TrendLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#9ca3af' }}
          axisLine={{ stroke: '#333333' }}
        />
        <YAxis 
          tick={{ fill: '#9ca3af' }}
          axisLine={{ stroke: '#333333' }}
          domain={isEfficiency ? [0, 100] : ['auto', 'auto']}
        />
        <ChartTooltip 
          content={<ChartTooltipContent />} 
          cursor={{ stroke: '#666666' }}
        />
        <ChartLegend />
        
        <Line
          type="monotone"
          dataKey={selectedMetric}
          stroke={metricColor}
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendLineChart;
