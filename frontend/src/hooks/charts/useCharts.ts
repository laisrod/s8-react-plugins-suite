import { useMemo } from 'react';
import type { LineChartData, BarChartData, PieChartData, DoughnutChartData } from '../../components/Charts/types';
import { DEFAULT_LABELS, PIE_LABELS, CHART_COLORS } from '../../components/Charts/constants';

interface UseChartsReturn {
  lineData: LineChartData;
  barData: BarChartData;
  pieData: PieChartData;
  doughnutData: DoughnutChartData;
}

/**
 * Hook para gerenciar dados dos gráficos
 * Responsabilidade: Preparar dados para os gráficos Chart.js
 */
export const useCharts = (): UseChartsReturn => {
  const lineData = useMemo<LineChartData>(() => ({
    labels: [...DEFAULT_LABELS],
    datasets: [
      {
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: CHART_COLORS.line.border,
        backgroundColor: CHART_COLORS.line.background,
        tension: 0.1,
      },
    ],
  }), []);

  const barData = useMemo<BarChartData>(() => ({
    labels: [...DEFAULT_LABELS],
    datasets: [
      {
        label: 'Receita',
        data: [20, 30, 15, 25, 35, 40],
        backgroundColor: CHART_COLORS.bar.background,
        borderColor: CHART_COLORS.bar.border,
        borderWidth: 1,
      },
    ],
  }), []);

  const pieData = useMemo<PieChartData>(() => ({
    labels: [...PIE_LABELS],
    datasets: [
      {
        label: 'Distribuição',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [...CHART_COLORS.pie],
        borderColor: [...CHART_COLORS.pieBorder],
        borderWidth: 1,
      },
    ],
  }), []);

  const doughnutData = useMemo<DoughnutChartData>(() => ({
    labels: [...PIE_LABELS],
    datasets: [
      {
        label: 'Distribuição',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [...CHART_COLORS.pie],
        borderColor: [...CHART_COLORS.pieBorder],
        borderWidth: 1,
      },
    ],
  }), []);

  return {
    lineData,
    barData,
    pieData,
    doughnutData,
  };
};

