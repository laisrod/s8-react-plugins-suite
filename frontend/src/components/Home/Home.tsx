import '../../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Lar</h1>
      <p>Esta é a página inicial do projeto.</p>
      <p>Navegue pelo menu superior para acessar as diferentes funcionalidades:</p>
      <ul>
        <li><strong>Mapa:</strong> Visualize mapas interativos</li>
        <li><strong>Calendário:</strong> Gerencie suas datas e eventos</li>
        <li><strong>Gráficos:</strong> Visualize dados com Chart.js</li>
      </ul>
    </div>
  );
};

export default Home;

