import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar el hook useNavigate

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt:', { name, email, password });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Ingrese su nombre"
            />
          </div>
          
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
              placeholder="Cree una contraseña"
            />
          </div>
          
          <button type="submit" className="submit-btn">Registrarse</button>
        </form>
        
        <p className="form-footer">
          ¿Ya tienes una cuenta? 
          <a href="#login" onClick={() => navigate('/login')}>Iniciar Sesión</a> {/* Redirección usando navigate */}
        </p>
      </div>
    </div>
  );
}

export default Register;
