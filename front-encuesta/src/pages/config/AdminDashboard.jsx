import { useEffect, useState, useContext } from 'react';  // Agrega useContext aquí
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';
import Usuarios from '../users/Usuario';
import Encuestas from '../encuesta/Escuesta';
import { AuthContext } from '../../provider/AuthContext';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = useContext(AuthContext); // Accede al usuario desde el contexto
  console.log(user)
  const [userData, setUserData] = useState({
    name: 'Admin Usuario',
    role: 'Administrador',
    lastLogin: '18 Mar 2025, 10:30 AM'
  });


  const [nombre, setNombre] = useState(""); // Estado para nombre
  const [rol, setRole] = useState(""); // Estado para role
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedNombre = localStorage.getItem("nombre");
    const storedRole = localStorage.getItem("rol"); // Si el rol también está en localStorage
    console.log(storedRole)
    // Actualizar el estado
    if (storedNombre) setNombre(storedNombre);
    if (storedRole) setRole(storedRole);

    if (!token) {
      navigate('/login', { replace: true });
    }

    // Simulación de carga de datos
    setTimeout(() => {
      // Aquí podrías hacer una llamada API real
      console.log("Datos cargados");
    }, 500);
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar `}>
        <div className="sidebar-header">
          <h2>Admin<span>Panel</span></h2>

        </div>

        <div className="sidebar-user">
          <div className="avatar">
            {userData.name.charAt(0)}
          </div>
          <div className="user-info">
            <h3>{nombre || "Usuario desconocido"}</h3>
            <p>{rol || "Rol no definido"}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeMenu === 'dashboard' ? 'active' : ''} onClick={() => setActiveMenu('dashboard')}>
              <span className="icon">📊</span> Dashboard
            </li>
            <li className={activeMenu === 'usuarios' ? 'active' : ''} onClick={() => setActiveMenu('usuarios')}>
              <span className="icon">👥</span> Usuarios
            </li>
            <li className={activeMenu === 'encuestas' ? 'active' : ''} onClick={() => setActiveMenu('encuestas')}>
              <span className="icon">📋</span> Encuestas
            </li>
            <li className={activeMenu === 'ventas' ? 'active' : ''} onClick={() => setActiveMenu('ventas')}>
              <span className="icon">💰</span> Ventas
            </li>
            <li className={activeMenu === 'ajustes' ? 'active' : ''} onClick={() => setActiveMenu('ajustes')}>
              <span className="icon">⚙️</span> Ajustes
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="icon">🚪</span> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-header">
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button>🔍</button>
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              🔔 <span className="badge">3</span>
            </button>
            <button className="message-btn">
              ✉️ <span className="badge">5</span>
            </button>
            <div className="date-display">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </header>
        <div className="content-area">
          {activeMenu === 'dashboard' && <h2>Bienvenido al Dashboard</h2>}
          {activeMenu === 'usuarios' && <Usuarios />}
          {activeMenu === 'encuestas' && <Encuestas />}
          {activeMenu === 'ajustes' && <Ajustes />}
        </div>



      </div>
    </div>
  );
}

export default AdminDashboard;