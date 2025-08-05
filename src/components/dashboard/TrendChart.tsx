
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
  
  const [showMovingAverage, setShowMovingAverage] = useState<boolean>(isEfficiency);

  useEffect(() => {
    // Ensure we have a valid selected metric when the type changes
    if (type === 'efficiency' && !selectedMetric.includes('Efficiency') && selectedMetric !== 'overallPerformance') {
      setSelectedMetric('overallPerformance');
    } else if (type === 'matchMetrics' && (selectedMetric.includes('Efficiency') || selectedMetric === 'overallPerformance')) {
      setSelectedMetric('goalsScored');
    }

    // Set moving average default based on chart type
    setShowMovingAverage(isEfficiency);

    console.log(`TrendChart mounted with ${data?.length || 0} data points`);
  }, [data, type, selectedMetric, isEfficiency]);

  // Get the color for the selected metric
  const metricColor = config[selectedMetric as keyof typeof config]?.color || '#FFFFFF';

  const handleMetricChange = (value: string) => {
    console.log("Metric changed to:", value);
    setSelectedMetric(value);
  };

  return (
    <div className="space-y-4 h-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {isEfficiency && (
            <label className="flex items-center text-sm cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 text-neon-green"
                checked={showMovingAverage}
                onChange={(e) => setShowMovingAverage(e.target.checked)}
              />
              Show 3-Match Moving Average
            </label>
          )}
        </div>
        <ChartMetricSelector
          selectedMetric={selectedMetric}
          onMetricChange={handleMetricChange}
          metricOptions={metricOptions}
        />
      </div>
      
      <div className="h-[250px]">
        <ChartContainer className="h-full w-full" config={config}>
          <TrendLineChart
            data={data}
            selectedMetric={selectedMetric}
            metricColor={metricColor}
            isEfficiency={isEfficiency}
            height={height}
            showMovingAverage={showMovingAverage}
          />
        </ChartContainer>
      </div>
    </div>
  );
};

export default TrendChart;
