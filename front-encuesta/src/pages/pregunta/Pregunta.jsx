import { useEffect, useState } from 'react';
import { listarEncuestaPorUsuario } from '../../services/encuestaService';
import { listarPreguntasPorEncuesta,registrarPregunta } from '../../services/preguntaService';
import './Pregunta.css';

const Pregunta = () => {
    const [codigo, setCodigo] = useState(localStorage.getItem("codigo") || "");
    const [encuestas, setEncuestas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [selectedEncuesta, setSelectedEncuesta] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [nuevaPregunta, setNuevaPregunta] = useState({
        pregunta: "",
        tipo: "opcion_multiple",
        encuestaId: "", // Cambiar de encuesta_id a encuestaId
        opciones: []
    });

    const [modalOpen, setModalOpen] = useState(false);
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

    useEffect(() => {
        setPreguntas([]);  // ⚠️ Limpia las preguntas al cambiar la encuesta
        setError(null);
        setCurrentPage(1); // ⚠️ Reinicia la paginación al seleccionar una nueva encuesta

        if (!selectedEncuesta) return;

        const fetchPreguntas = async () => {
            try {
                setLoading(true);
                const data = await listarPreguntasPorEncuesta(selectedEncuesta);
                setPreguntas(data.length > 0 ? data : []);
            } catch (error) {
                setError('Error al obtener las preguntas');
                setPreguntas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPreguntas();
    }, [selectedEncuesta]);
    useEffect(() => {
        setNuevaPregunta((prev) => ({ ...prev, encuestaId: selectedEncuesta }));
    }, [selectedEncuesta]);

    // FUNCION PARA CERRAR MODAL
    const toggleModal = () => {
        console.log("holaaaa")
        setModalOpen(!modalOpen);
    };
    const removeOption = (index) => {
        setNuevaPregunta((prev) => ({
            ...prev,
            opciones: prev.opciones.filter((_, i) => i !== index),
        }));
    };

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        setNuevaPregunta({
            ...nuevaPregunta,
            [e.target.name]: e.target.value
        });
    };

    const handleRegistrar = async () => {
        console.log("📌 Nueva Pregunta antes de registrar:", nuevaPregunta);
    
        const preguntaARegistrar = {
            ...nuevaPregunta,
            encuestaId: nuevaPregunta.encuestaId // Asegurar que tenga un ID de encuesta válido
        };
    
        console.log("📦 Pregunta a registrar:", JSON.stringify(preguntaARegistrar, null, 2));
    
        try {
            await registrarPregunta(preguntaARegistrar);
            console.log("✅ Pregunta registrada con éxito.");
            setModalOpen(false); // Cerrar modal solo si se registró correctamente
        } catch (error) {
            console.error("❌ Error al registrar la pregunta:", error);
        }
    };
    


    const addOption = () => {
        setNuevaPregunta((prev) => ({
            ...prev,
            opciones: [...prev.opciones, { opcion: "", es_correcta: false }]
        }));
    };
    const handleOptionChange = (e, index) => {
        const { value } = e.target;

        setNuevaPregunta((prev) => {
            const opcionesActualizadas = [...prev.opciones];
            opcionesActualizadas[index].opcion = value;
            return { ...prev, opciones: opcionesActualizadas };
        });
    };
    const toggleCorrectOption = (index) => {
        setNuevaPregunta((prev) => {
            const opcionesActualizadas = [...prev.opciones];
            opcionesActualizadas[index].es_correcta = !opcionesActualizadas[index].es_correcta;
            return { ...prev, opciones: opcionesActualizadas };
        });
    };


    // 🟢 Paginación corregida
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPreguntas = preguntas.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(preguntas.length / itemsPerPage);

    return (
        <div className="preguntas-container">
            <div className="encuesta-select-container">
                <label htmlFor="encuestaSelect">Selecciona una Encuesta:</label>
                <select
                    id="encuestaSelect"
                    value={selectedEncuesta}
                    onChange={(e) => setSelectedEncuesta(e.target.value)}
                >
                    <option value="">-- Seleccionar --</option>
                    {encuestas.length > 0 ? (
                        encuestas.map((encuesta) => (
                            <option key={encuesta.id} value={encuesta.id}>
                                {encuesta.titulo}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay encuestas disponibles</option>
                    )}
                </select>
            </div>

            {/* Modal de Registro de Pregunta */}
            {modalOpen && (
                <div className={`modal ${modalOpen ? "active" : ""}`}>
                    <div className="modal-content-pregunta">
                        <h2>Registrar Pregunta</h2>

                        <label>Pregunta:</label>
                        <input
                            type="text"
                            className='preguntas'
                            name="pregunta"
                            value={nuevaPregunta.pregunta}
                            onChange={handleChange}
                        />
                        <label>Encuesta:</label>
                        <select
    name="encuestaId"
    value={nuevaPregunta.encuestaId || selectedEncuesta}
    onChange={(e) => setNuevaPregunta(prev => ({ ...prev, encuestaId: e.target.value }))}
>

                            <option value="">Seleccione una encuesta</option>
                            {encuestas.map((encuesta) => (
                                <option key={encuesta.id} value={encuesta.id}>
                                    {encuesta.titulo}
                                </option>
                            ))}
                        </select>

                        <label>Tipo de Pregunta:</label>
                        <select name="tipo" value={nuevaPregunta.tipo} onChange={handleChange}>
                            <option value="opcion_multiple">Opción Múltiple</option>
                            <option value="texto_libre">Texto Libre</option>
                        </select>

                        {nuevaPregunta.tipo === "opcion_multiple" && (
                            <div className="opciones-container">
                                <h3 className="titulo-opciones">Opciones:</h3>
                                {nuevaPregunta.opciones.map((opcion, index) => (
                                    <div key={index} className="opcion-item">
                                        <input
                                            type="text"
                                            className="input-opcion"
                                            placeholder={`Opción ${index + 1}`}
                                            value={opcion.opcion}
                                            onChange={(e) => handleOptionChange(e, index)}
                                        />

                                        <input
                                            type="checkbox"
                                            className="checkbox-opcion"
                                            checked={opcion.es_correcta}
                                            onChange={() => toggleCorrectOption(index)}
                                        />

                                        <button className=" opcion-boton" onClick={() => removeOption(index)}>❌</button>
                                    </div>
                                ))}
                                <button className="btn btn-secondary" onClick={addOption}>➕ Agregar Opción</button>
                            </div>
                        )}

                        <button className="btn btn-primary" onClick={handleRegistrar}>Guardar</button>
                        <button className="btn btn-danger" onClick={toggleModal}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* Botón para abrir modal */}
            <button className="register-button" onClick={toggleModal}>
                ➕ Registrar Pregunta
            </button>
            <table className="preguntas-table">
                <thead>
                    <tr>
                        <th>Pregunta</th>
                        <th>Tipo</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {preguntas.length > 0 ? (
                        currentPreguntas.map((pregunta) => (
                            <tr key={pregunta.id}>
                                <td>{pregunta.pregunta}</td>
                                <td>{pregunta.tipo}</td>
                                <td>
                                    {pregunta.tipo === "opcion_multiple" && pregunta.opciones ? (
                                        <ul>
                                            {pregunta.opciones.map((opcion) => (
                                                <li key={opcion.id}>
                                                    {opcion.opcion} {opcion.es_correcta ? "✅" : ""}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : "N/A"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="no-data-message">
                                No hay preguntas disponibles para esta encuesta.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación corregida */}
            {preguntas.length > itemsPerPage && (
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
            )}
        </div>
    );
};

export default Pregunta;
