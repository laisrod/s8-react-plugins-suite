import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts: React.FC = () => {
  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Receita',
        data: [20, 30, 15, 25, 35, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Vermelho', 'Azul', 'Amarelo', 'Verde', 'Roxo'],
    datasets: [
      {
        label: 'Distribuição',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="charts-container">
      <h1>Gráficos (Chart.js)</h1>
      
      <div className="charts-grid">
        <div className="chart-item">
          <h2>Gráfico de Linha</h2>
          <Line data={lineData} />
        </div>

        <div className="chart-item">
          <h2>Gráfico de Barras</h2>
          <Bar data={barData} />
        </div>

        <div className="chart-item">
          <h2>Gráfico de Pizza</h2>
          <Pie data={pieData} />
        </div>

        <div className="chart-item">
          <h2>Gráfico de Rosca</h2>
          <Doughnut data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Charts;

