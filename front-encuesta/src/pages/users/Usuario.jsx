import { useEffect, useState } from 'react';
import { listarUsuario } from '../../services/loginService'; // Asegúrate de importar tu función correctamente
import './Usuario.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Número de usuarios por página

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
    const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button className="action-button edit">✏️ Editar</button>
                                <button className="action-button delete">🗑️ Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(usuarios.length / itemsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Usuarios;