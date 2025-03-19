import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token existe en localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard de Usuario</h1>
      {/* Aquí iría el contenido del dashboard */}
    </div>
  );
}

export default UserDashboard;
