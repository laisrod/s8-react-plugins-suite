export const DEFAULT_LABELS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'] as const;

export const PIE_LABELS = ['Vermelho', 'Azul', 'Amarelo', 'Verde', 'Roxo'] as const;


export const CHART_COLORS = {
  line: {
    border: 'rgb(75, 192, 192)',
    background: 'rgba(75, 192, 192, 0.2)',
  },
  bar: {
    background: 'rgba(54, 162, 235, 0.5)',
    border: 'rgba(54, 162, 235, 1)',
  },
  pie: [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
  ],
  pieBorder: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ],
} as const;

