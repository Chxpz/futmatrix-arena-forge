
import { useState } from 'react';

// Mock data for efficiencies
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
];

// Mock data for match metrics
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
  tackles: { label: 'Tackles', color: '#FFFFFF' }, // white
};

export type ChartType = 'efficiency' | 'matchMetrics';

export type TrendChartData = {
  config: Record<string, { label: string; color: string }>;
  data: Array<Record<string, any>>;
  metricOptions: Array<{ value: string; label: string }>;
};

export const useTrendChartData = (
  type: ChartType,
  timeFilter: string
): TrendChartData => {
  const isEfficiency = type === 'efficiency';
  const data = isEfficiency ? efficiencyData : matchMetricsData;
  const config = isEfficiency ? efficiencyConfig : matchMetricsConfig;
  
  const metricOptions = Object.entries(config).map(([key, value]) => ({
    value: key,
    label: value.label,
  }));

  // In a real app, you'd filter data based on timeFilter here
  
  return {
    data,
    config,
    metricOptions
  };
};
