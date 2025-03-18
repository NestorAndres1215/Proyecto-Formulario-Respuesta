import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show content with a slight delay for better animation effect
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <div className="welcome-container">
      <div className={`welcome-card ${visible ? 'visible' : ''}`}>
        <h1>Bienvenidos</h1>
        <div className="button-group">
          <button className="login-btn">Iniciar Sesión</button>
          <button className="register-btn">Registrarse</button>
        </div>
      </div>
    </div>
  )
}

export default App