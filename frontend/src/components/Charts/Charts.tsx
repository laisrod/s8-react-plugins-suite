import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { registerChartJS } from './config';
import { useCharts } from '../../hooks';
import '../../css/Charts.css';

registerChartJS();

const Charts = () => {
  const { lineData, barData, pieData, doughnutData, loading, error, refetch } = useCharts();

  if (loading) {
    return (
      <div className="charts-container">
        <h1>Gráficos</h1>
        <div className="loading-message">Carregando dados dos gráficos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="charts-container">
        <h1>Gráficos</h1>
        <div className="error-message">
          <p>Erro: {error}</p>
          <button onClick={() => void refetch()}>Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <h1>Gráficos</h1>
      
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
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
