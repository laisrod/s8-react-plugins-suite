import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Map from './components/Map';
import Calendar from './components/Calendar';
import Charts from './components/Charts';
import Users from './components/Users';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-link">Lar</Link>
          <Link to="/mapa" className="nav-link">Mapa</Link>
          <Link to="/calendario" className="nav-link">Calendário completo</Link>
          <Link to="/graficos" className="nav-link">Gráficos (Chartjs)</Link>
          <Link to="/usuarios" className="nav-link">CRUD Usuários</Link>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<Map />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/graficos" element={<Charts />} />
        <Route path="/usuarios" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
