
import { useState, useEffect } from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { useTrendChartData, ChartType } from '@/hooks/use-trend-chart-data';
import ChartMetricSelector from './ChartMetricSelector';
import TrendLineChart from './TrendLineChart';

type TrendChartProps = {
  type: ChartType;
  timeFilter: string;
  height: number;
};

const TrendChart = ({ type, timeFilter, height }: TrendChartProps) => {
  const isEfficiency = type === 'efficiency';
  const { data, config, metricOptions } = useTrendChartData(type, timeFilter);
  
  const [selectedMetric, setSelectedMetric] = useState<string>(
    isEfficiency ? 'overallPerformance' : 'goalsScored'
  );

  useEffect(() => {
    console.log("TrendChart mounted/updated with data:", data);
    console.log("Chart type:", type);
    console.log("Available metrics:", metricOptions);
  }, [data, type, metricOptions]);

  // Get the color for the selected metric
  const metricColor = config[selectedMetric as keyof typeof config]?.color || '#FFFFFF';

  const handleMetricChange = (value: string) => {
    console.log("Metric changed to:", value);
    setSelectedMetric(value);
  };

  return (
    <div className="space-y-4">
      <ChartMetricSelector
        selectedMetric={selectedMetric}
        onMetricChange={handleMetricChange}
        metricOptions={metricOptions}
      />
      
      <ChartContainer className="aspect-auto h-full" config={config}>
        <TrendLineChart
          data={data}
          selectedMetric={selectedMetric}
          metricColor={metricColor}
          isEfficiency={isEfficiency}
          height={height}
        />
      </ChartContainer>
    </div>
  );
};

export default TrendChart;
