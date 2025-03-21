import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/usuario/Login';
import Register from './pages/usuario/Register';
import { useState, useEffect } from 'react';
import AdminDashboard from './pages/config/AdminDashboard';
import UserDashboard from './pages/config/UserDashboard';
function Welcome() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();  // Hook para navegar

  useEffect(() => {
    // Show content with a slight delay for better animation effect
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (

    <div className="welcome-container">
      <div className={`welcome-card ${visible ? 'visible' : ''}`}>
        <h1>Bienvenidos</h1>
        <div className="button-group">
          <button
            className="login-btn"
            onClick={() => navigate('/login')}  // Usar navigate para ir a /login
          >
            Iniciar Sesión
          </button>
          <button
            className="register-btn"
            onClick={() => navigate('/register')}  // Usar navigate para ir a /register
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} ></Route>
      <Route path='/user-dashboard' element={<UserDashboard />} ></Route>
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
