import { useEffect, useState } from 'react';
import { listarEncuestaPorUsuario } from '../../services/encuestaService'; // Asegúrate de importar tu función correctamente
import './Encuesta.css';
const Encuestas = () => {
    return (
      <div>
        <h2>Gestión de Encuestas</h2>
        <p>Aquí podrás administrar las encuestas.</p>
      </div>
    );
  };
  
  export default Encuestas;
  