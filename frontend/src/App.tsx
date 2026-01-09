import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Map from './components/Map';
import Calendar from './components/Calendar';
import Charts from './components/Charts';
import Users from './components/Users';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-container">
          <button 
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
            <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
            <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
          </button>
          {isMenuOpen && (
            <div className="menu-overlay" onClick={closeMenu}></div>
          )}
          <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>Lar</Link>
            <Link to="/mapa" className="nav-link" onClick={closeMenu}>Mapa</Link>
            <Link to="/calendario" className="nav-link" onClick={closeMenu}>Calendário</Link>
            <Link to="/graficos" className="nav-link" onClick={closeMenu}>Gráficos</Link>
            <Link to="/usuarios" className="nav-link" onClick={closeMenu}>Usuários</Link>
          </div>
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
