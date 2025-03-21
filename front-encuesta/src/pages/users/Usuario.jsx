import { useEffect, useState } from 'react';
import { listarUsuario } from '../../services/loginService'; // Asegúrate de importar tu función correctamente
import './Usuario.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await listarUsuario();
                setUsuarios(data);
            } catch (error) {
                setError('Error al obtener los usuarios');
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    // Lógica de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEncuestas = usuarios.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

    if (loading) return <div className="loading-message">Cargando usuarios...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="usuarios-container">
            <h1 className="usuarios-title">Mantenimiento de Usuarios</h1>
            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEncuestas.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
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
        </div>
    );
};

export default Usuarios;