import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css'
function AdminDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Admin Usuario',
    role: 'Administrador',
    lastLogin: '18 Mar 2025, 10:30 AM'
  });
  
  const [stats, setStats] = useState({
    usuarios: 1248,
    ventas: 846,
    productos: 64,
    tickets: 23
  });
  
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login', { replace: true });
    }
    
    // Simulación de carga de datos
    setTimeout(() => {
      // Aquí podrías hacer una llamada API real
      console.log("Datos cargados");
    }, 500);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin<span>Panel</span></h2>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <div className="sidebar-user">
          <div className="avatar">
            {userData.name.charAt(0)}
          </div>
          <div className="user-info">
            <h3>{userData.name}</h3>
            <p>{userData.role}</p>
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
            <li className={activeMenu === 'productos' ? 'active' : ''} onClick={() => setActiveMenu('productos')}>
              <span className="icon">📦</span> Productos
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
        
        <main className="dashboard-content">
          {activeMenu === 'dashboard' && (
            <>
              <h1>Dashboard de Administración</h1>
              <p className="welcome-message">Bienvenido de nuevo, {userData.name}. Último acceso: {userData.lastLogin}</p>
              
              <div className="stats-container">
                <div className="stat-card users">
                  <div className="stat-icon">👥</div>
                  <div className="stat-details">
                    <h3>Usuarios</h3>
                    <p className="stat-value">{stats.usuarios}</p>
                    <p className="stat-change positive">+3.5% esta semana</p>
                  </div>
                </div>
                
                <div className="stat-card sales">
                  <div className="stat-icon">💰</div>
                  <div className="stat-details">
                    <h3>Ventas</h3>
                    <p className="stat-value">{stats.ventas}</p>
                    <p className="stat-change positive">+5.2% este mes</p>
                  </div>
                </div>
                
                <div className="stat-card products">
                  <div className="stat-icon">📦</div>
                  <div className="stat-details">
                    <h3>Productos</h3>
                    <p className="stat-value">{stats.productos}</p>
                    <p className="stat-change neutral">Sin cambios</p>
                  </div>
                </div>
                
                <div className="stat-card tickets">
                  <div className="stat-icon">🎫</div>
                  <div className="stat-details">
                    <h3>Tickets</h3>
                    <p className="stat-value">{stats.tickets}</p>
                    <p className="stat-change negative">-2.1% esta semana</p>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-grid">
                <div className="dashboard-card recent-activity">
                  <h2>Actividad Reciente</h2>
                  <ul className="activity-list">
                    <li>
                      <span className="activity-time">10:45 AM</span>
                      <span className="activity-text">Usuario <strong>María López</strong> ha realizado una compra</span>
                    </li>
                    <li>
                      <span className="activity-time">09:32 AM</span>
                      <span className="activity-text">Nuevo usuario registrado: <strong>Carlos Mendoza</strong></span>
                    </li>
                    <li>
                      <span className="activity-time">Ayer</span>
                      <span className="activity-text">Se ha añadido un nuevo producto: <strong>Monitor UltraHD</strong></span>
                    </li>
                    <li>
                      <span className="activity-time">Ayer</span>
                      <span className="activity-text">Ticket #2458 ha sido resuelto por <strong>Soporte Técnico</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="dashboard-card quick-actions">
                  <h2>Acciones Rápidas</h2>
                  <div className="quick-actions-grid">
                    <button className="quick-action-btn">
                      <span className="action-icon">➕</span>
                      <span className="action-text">Añadir Usuario</span>
                    </button>
                    <button className="quick-action-btn">
                      <span className="action-icon">📦</span>
                      <span className="action-text">Nuevo Producto</span>
                    </button>
                    <button className="quick-action-btn">
                      <span className="action-icon">📊</span>
                      <span className="action-text">Ver Reportes</span>
                    </button>
                    <button className="quick-action-btn">
                      <span className="action-icon">⚙️</span>
                      <span className="action-text">Configuración</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeMenu === 'usuarios' && (
            <div className="users-section">
              <h1>Gestión de Usuarios</h1>
              <p>Esta sección te permite administrar los usuarios del sistema.</p>
              <div className="users-controls">
                <button className="action-button primary">Añadir Usuario</button>
                <button className="action-button secondary">Importar</button>
                <button className="action-button secondary">Exportar</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>María López</td>
                    <td>maria@ejemplo.com</td>
                    <td>Cliente</td>
                    <td><span className="status active">Activo</span></td>
                    <td>
                      <button className="table-action edit">✏️</button>
                      <button className="table-action delete">🗑️</button>
                    </td>
                  </tr>
                  <tr>
                    <td>002</td>
                    <td>Carlos Mendoza</td>
                    <td>carlos@ejemplo.com</td>
                    <td>Cliente</td>
                    <td><span className="status active">Activo</span></td>
                    <td>
                      <button className="table-action edit">✏️</button>
                      <button className="table-action delete">🗑️</button>
                    </td>
                  </tr>
                  <tr>
                    <td>003</td>
                    <td>Laura Sánchez</td>
                    <td>laura@ejemplo.com</td>
                    <td>Editor</td>
                    <td><span className="status inactive">Inactivo</span></td>
                    <td>
                      <button className="table-action edit">✏️</button>
                      <button className="table-action delete">🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="pagination">
                <button>« Anterior</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>Siguiente »</button>
              </div>
            </div>
          )}
          
          {activeMenu !== 'dashboard' && activeMenu !== 'usuarios' && (
            <div className="placeholder-content">
              <h1>Sección {activeMenu}</h1>
              <p>Esta sección está en desarrollo. Contenido de {activeMenu} será mostrado aquí.</p>
            </div>
          )}
        </main>
        

      </div>
    </div>
  );
}

export default AdminDashboard;