import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar el hook useNavigate
import { loginUser } from '../../services/loginService';  // Importar el servicio de login
import { getUserProfile } from '../../services/loginService';  // Importar el servicio de login
import '../../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Usar el hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Intentamos hacer login con los datos proporcionados
      const { token, role } = await loginUser(email, password);

      console.log(await loginUser(email, password))

      const { rol } = await getUserProfile(email);
      console.log('Perfil completo del usuario:', rol);
      // Guardamos el token en el almacenamiento local (localStorage)
      localStorage.setItem('token', token);
      console.log(token)
      console.warn(role)
      // Redirigir según el rol del usuario
      if (rol === 'admin') {
        navigate('/admin-dashboard'); // Redirige al dashboard de admin
      } else if (rol === 'usuario') {
        navigate('/user-dashboard'); // Redirige al dashboard de usuario
      } else {
        setError('Rol no reconocido');
      }
    } catch (error) {
      setError('Error de autenticación, intente nuevamente');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Iniciar Sesión</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button type="submit" className="submit-btn">Iniciar Sesión</button>
        </form>

        <p className="form-footer">
          ¿No tienes una cuenta? <a href="#registro" onClick={() => navigate('/register')}>Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
