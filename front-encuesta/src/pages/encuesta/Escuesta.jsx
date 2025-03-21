import { useEffect, useState } from 'react';
import { listarEncuestaPorUsuario, registrarEncuesta, eliminarEncuesta, actualizarEncuesta } from '../../services/encuestaService';
import './Encuesta.css';

const Encuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [codigo, setCodigo] = useState("");

  //ELIMINAR
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [encuestaAEliminar, setEncuestaAEliminar] = useState(null);

  //EDITAR
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [encuestaAEditar, setEncuestaAEditar] = useState(null);

  //REGISTRAR
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevaEncuesta, setNuevaEncuesta] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
  });
  // TRAER CODIGO
  useEffect(() => {
    const storedCodigo = localStorage.getItem("codigo");
    if (storedCodigo) setCodigo(storedCodigo);
  }, []);
  //LISTAR ENCUESTAS POR USUARIO
  useEffect(() => {
    if (!codigo) return;
    const fetchEncuestas = async () => {
      try {
        setLoading(true);
        const data = await listarEncuestaPorUsuario(codigo);
        setEncuestas(data);
      } catch (error) {
        setError('Error al obtener las encuestas');
      } finally {
        setLoading(false);
      }
    };
    fetchEncuestas();
  }, [codigo]);

  // FUNCION PARA CERRAR MODAL
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleEditChange = (e) => {
    setEncuestaAEditar({ ...encuestaAEditar, [e.target.name]: e.target.value });
  };
  const handleOpenEditModal = (encuesta) => {
    setEncuestaAEditar(encuesta);
    setModalEditOpen(true);
  };

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    setNuevaEncuesta({ ...nuevaEncuesta, [e.target.name]: e.target.value });
  };

  //EDITAR
  const handleEditar = async () => {
    if (!encuestaAEditar) return;

    try {
      const encuestaActualizada = {
        titulo: encuestaAEditar.titulo,
        descripcion: encuestaAEditar.descripcion,
        usuario_id: encuestaAEditar.usuario_id,
        fecha_inicio: new Date(encuestaAEditar.fecha_inicio).toISOString(),
        fecha_fin: new Date(encuestaAEditar.fecha_fin).toISOString(),
        estado: encuestaAEditar.estado,
        creada_en: new Date(encuestaAEditar.creada_en).toISOString(),
      };

      console.log("Datos enviados:", encuestaActualizada); // Verifica en consola

      await actualizarEncuesta(encuestaAEditar.id, encuestaActualizada);

      setEncuestas((prevEncuestas) =>
        prevEncuestas.map((encuesta) =>
          encuesta.id === encuestaAEditar.id ? encuestaActualizada : encuesta
        )
      );

      setModalEditOpen(false); // Cerrar modal
      setEncuestaAEditar(null); // Limpiar estado

    } catch (error) {
      console.error("Error al actualizar la encuesta:", error);
    }
  };

  // ELIMINAR
  const handleEliminar = async () => {
    if (!encuestaAEliminar) {
      console.error("No hay encuesta seleccionada para eliminar.");
      return;
    }

    try {
      console.log("Eliminando encuesta con ID:", encuestaAEliminar.id);
      const response = await eliminarEncuesta(encuestaAEliminar.id);


      setEncuestas((prevEncuestas) =>
        prevEncuestas.filter((encuesta) => encuesta.id !== encuestaAEliminar.id)
      );

      console.log("Cerrando modal...");
      setModalDeleteOpen(false); // Cerrar modal
      setEncuestaAEliminar(null); // Limpiar estado después de eliminar

    } catch (error) {
      console.error("Error al eliminar la encuesta:", error);
    }
  };
  // REGISTRAR
  const handleRegistrar = async () => {
    try {
      const nuevaEncuestaFormateada = {
        titulo: nuevaEncuesta.titulo,
        descripcion: nuevaEncuesta.descripcion,
        usuario_id: codigo, // O el ID del usuario actual
        fecha_inicio: `${nuevaEncuesta.fecha_inicio}T10:00:00Z`,
        fecha_fin: `${nuevaEncuesta.fecha_fin}T23:59:59Z`,
        estado: "activa",
      };

      console.log("Encuesta formateada:", nuevaEncuestaFormateada);

      await registrarEncuesta(nuevaEncuestaFormateada);

      console.log("Cerrando modal...");
      setModalOpen(false); // Cerrar modal solo si se registró correctamente

    } catch (error) {
      console.error("Error al registrar la encuesta:", error);
    }
  };
  //PAGINACION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEncuestas = encuestas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(encuestas.length / itemsPerPage);

  return (
    <div className="encuestas-container">
      <h1 className="encuestas-title">Gestión de Encuestas</h1>

      {/* Botón para abrir modal */}
      <button className="register-button" onClick={toggleModal}>
        ➕ Registrar Encuesta
      </button>

      {/* Modal */}
      {modalOpen && (

        < div className={`modal ${modalOpen ? "active" : ""}`}>
          <div className="modal-content">
            <h2>Registrar Encuesta</h2>
            <label>Título:</label>
            <input type="text" name="titulo" value={nuevaEncuesta.titulo} onChange={handleChange} />

            <label>Descripción:</label>
            <textarea name="descripcion" value={nuevaEncuesta.descripcion} onChange={handleChange}></textarea>

            <label>Fecha de Inicio:</label>
            <input type="date" name="fecha_inicio" value={nuevaEncuesta.fecha_inicio} onChange={handleChange} />

            <label>Fecha de Término:</label>
            <input type="date" name="fecha_fin" value={nuevaEncuesta.fecha_fin} onChange={handleChange} />

            <button className="btn btn-primary" onClick={handleRegistrar}>Guardar</button>
            <button className="btn btn-danger" onClick={toggleModal}>Cancelar</button>
          </div>
        </div>

      )
      }
      {/* MODAL ELIMINAR */}
      {modalDeleteOpen && encuestaAEliminar && (
        <div className={`modal ${modalDeleteOpen ? "active" : ""}`}>
          <div className="modal-content">
            <h2 className="modal-title">❌ Eliminar Encuesta</h2>
            <p>¿Estás seguro de que deseas eliminar la encuesta "<strong>{encuestaAEliminar.titulo}</strong>"?</p>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={handleEliminar}>🗑️ Sí, eliminar</button>
              <button className="btn btn-secondary" onClick={() => setModalDeleteOpen(false)}>❌ Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {modalEditOpen && encuestaAEditar && (
        <div className={`modal ${modalEditOpen ? "active" : ""}`}>
          <div className="modal-content">
            <h2>✏️ Editar Encuesta</h2>
            <label>Título:</label>
            <input type="text" name="titulo" value={encuestaAEditar.titulo} onChange={handleEditChange} />

            <label>Descripción:</label>
            <textarea name="descripcion" value={encuestaAEditar.descripcion} onChange={handleEditChange}></textarea>

            <label>Fecha de Inicio:</label>
            <input type="date" name="fecha_inicio" value={encuestaAEditar.fecha_inicio.split("T")[0]} onChange={handleEditChange} />

            <label>Fecha de Término:</label>
            <input type="date" name="fecha_fin" value={encuestaAEditar.fecha_fin.split("T")[0]} onChange={handleEditChange} />

            <button className="btn btn-primary" onClick={handleEditar}>Guardar Cambios</button>
            <button className="btn btn-danger" onClick={() => setModalEditOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <table className="encuestas-table">
        <thead>
          <tr>
            <th style={{ width: "140px" }}>Título</th>
            <th style={{ width: "300px" }}>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Término</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEncuestas.map((encuesta) => (
            <tr key={encuesta.id}>
              <td>{encuesta.titulo}</td>
              <td>{encuesta.descripcion}</td>
              <td>{new Date(encuesta.fecha_inicio).toLocaleDateString()}</td>
              <td>{new Date(encuesta.fecha_fin).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleOpenEditModal(encuesta)} className="action-button edit">✏️ Editar</button>

                <button onClick={() => { setEncuestaAEliminar(encuesta); setModalDeleteOpen(true); }} className="action-button delete">🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Paginacion*/ }
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          « Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente »
        </button>
      </div>
    </div >
  );
};

export default Encuestas;
