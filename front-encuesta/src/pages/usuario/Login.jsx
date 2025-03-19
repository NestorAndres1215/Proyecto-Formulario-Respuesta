import { useState, useContext } from 'react'; // Agregar useContext
import { useNavigate } from 'react-router-dom';
import { loginUser, getUserProfile } from '../../services/loginService';
import '../../styles/login.css';
import { AuthContext } from '../../provider/AuthContext'; // Importar el contexto
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext); // Usar el contexto de autenticación
  const navigate = useNavigate();  // Usar el hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Intentamos hacer login con los datos proporcionados
      const { token, role } = await loginUser(email, password);

      console.log(await loginUser(email, password))

      const { rol } = await getUserProfile(email);
      const {nombre} = await getUserProfile(email);

      localStorage.setItem('token', token);
      localStorage.setItem('nombre', nombre);
      console.log(token)
      console.warn(role)
console.log(rol)
      localStorage.setItem('rol', rol);
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
