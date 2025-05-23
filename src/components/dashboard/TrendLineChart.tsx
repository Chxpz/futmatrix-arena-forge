
import { ChartLegend } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

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
  // Validate the data and metric before rendering
  const hasValidData = Array.isArray(data) && data.length > 0 && 
    data.some(item => selectedMetric in item);
  
  if (!hasValidData) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-matrix-darker border border-matrix-gray/20 rounded-lg p-4">
        <p className="text-gray-400">No data available for the selected metric</p>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
        <Tooltip
          contentStyle={{ 
            backgroundColor: '#1a1a1a', 
            border: '1px solid #333333',
            color: '#ffffff'
          }}
          labelStyle={{ color: '#9ca3af' }}
        />
        <ChartLegend />
        
        <Line
          type="monotone"
          dataKey={selectedMetric}
          stroke={metricColor}
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2, fill: metricColor }}
          activeDot={{ r: 6, strokeWidth: 0, fill: metricColor }}
          animationDuration={500}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendLineChart;
