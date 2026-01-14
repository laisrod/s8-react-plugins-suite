import { useState, useEffect, useMemo } from 'react';
import type { LineChartData, BarChartData, PieChartData, DoughnutChartData, IChartData } from '../../types';
import { DEFAULT_LABELS, PIE_LABELS, CHART_COLORS } from '../../constants';
import { fetchChartData } from '../../services/chartDataApi';

interface UseChartsReturn {
  lineData: LineChartData;
  barData: BarChartData;
  pieData: PieChartData;
  doughnutData: DoughnutChartData;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCharts = (): UseChartsReturn => {
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadChartData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchChartData();
      
      if (response.success && response.data) {
        setChartData(response.data);
      } else {
        setError(response.error || 'Erro ao carregar dados dos gráficos');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao conectar com a API';
      setError(errorMessage);
      console.error('Erro ao carregar dados dos gráficos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadChartData();
  }, []);

  // Transformar dados do backend para formato Chart.js - Gráfico de Linha
  const lineData = useMemo<LineChartData>(() => {
    const lineItems = chartData.filter(d => d.chartType === 'line');
    
    // Se não houver dados do backend, usar dados padrão
    if (lineItems.length === 0) {
      return {
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
      };
    }

    // Agrupar por categoria
    const categories = [...new Set(lineItems.map(d => d.category))];
    const datasets = categories.map((category, index) => {
      const categoryData = lineItems.filter(d => d.category === category);
      return {
        label: category,
        data: categoryData.map(d => d.value),
        borderColor: CHART_COLORS.line.border,
        backgroundColor: CHART_COLORS.line.background,
        tension: 0.1,
      };
    });

    return {
      labels: lineItems.map(d => d.label),
      datasets: datasets.length > 0 ? datasets : [{
        label: 'Vendas',
        data: lineItems.map(d => d.value),
        borderColor: CHART_COLORS.line.border,
        backgroundColor: CHART_COLORS.line.background,
        tension: 0.1,
      }],
    };
  }, [chartData]);

  // Transformar dados do backend para formato Chart.js - Gráfico de Barras
  const barData = useMemo<BarChartData>(() => {
    const barItems = chartData.filter(d => d.chartType === 'bar');
    
    // Se não houver dados do backend, usar dados padrão
    if (barItems.length === 0) {
      return {
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
      };
    }

    // Agrupar por categoria
    const categories = [...new Set(barItems.map(d => d.category))];
    const datasets = categories.map((category) => {
      const categoryData = barItems.filter(d => d.category === category);
      return {
        label: category,
        data: categoryData.map(d => d.value),
        backgroundColor: CHART_COLORS.bar.background,
        borderColor: CHART_COLORS.bar.border,
        borderWidth: 1,
      };
    });

    return {
      labels: barItems.map(d => d.label),
      datasets: datasets.length > 0 ? datasets : [{
        label: 'Receita',
        data: barItems.map(d => d.value),
        backgroundColor: CHART_COLORS.bar.background,
        borderColor: CHART_COLORS.bar.border,
        borderWidth: 1,
      }],
    };
  }, [chartData]);

  // Gráficos de Pizza e Rosca continuam com dados estáticos
  // (pois o backend só suporta 'bar' e 'line')
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
    loading,
    error,
    refetch: loadChartData,
  };
};
