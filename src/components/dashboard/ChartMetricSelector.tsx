
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ChartMetricSelectorProps = {
  selectedMetric: string;
  onMetricChange: (value: string) => void;
  metricOptions: Array<{ value: string; label: string }>;
};

const ChartMetricSelector = ({
  selectedMetric,
  onMetricChange,
  metricOptions,
}: ChartMetricSelectorProps) => {
  if (!metricOptions || metricOptions.length === 0) {
    return null;
  }
  
  return (
    <div className="flex justify-end">
      <Select
        value={selectedMetric}
        onValueChange={(value) => {
          console.log("Metric selected:", value);
          onMetricChange(value);
        }}
      >
        <SelectTrigger className="w-[180px] bg-matrix-darker border-matrix-gray/30">
          <SelectValue placeholder="Select metric" />
        </SelectTrigger>
        <SelectContent className="bg-matrix-dark border-matrix-gray/30">
          {metricOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChartMetricSelector;
