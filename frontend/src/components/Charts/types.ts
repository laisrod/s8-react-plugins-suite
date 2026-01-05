import type { ChartData, ChartOptions } from 'chart.js';

/**
 * Tipo para dados de gráfico de linha
 */
export interface LineChartData extends ChartData<'line'> {}

/**
 * Tipo para dados de gráfico de barras
 */
export interface BarChartData extends ChartData<'bar'> {}

/**
 * Tipo para dados de gráfico de pizza
 */
export interface PieChartData extends ChartData<'pie'> {}

/**
 * Tipo para dados de gráfico de rosca
 */
export interface DoughnutChartData extends ChartData<'doughnut'> {}

/**
 * Tipo para opções de gráfico
 */
export type ChartOptionsType = ChartOptions<'line' | 'bar' | 'pie' | 'doughnut'>;

