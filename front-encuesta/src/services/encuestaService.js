import { apiRequest } from '../api/api';
export const listarEncuesta = async () => {
    try {
        const response = await apiRequest('usuarios/listar', 'GET');
        if (!response) {
            throw new Error('No se pudo obtener la lista de usuarios');
        }
        return response;
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        throw error;
    }
};
export const listarEncuestaPorUsuario = async (usuarioId) => {
    try {
        const response = await apiRequest(`encuesta/listar/usuario/${usuarioId}`, 'GET');
        if (!response) {
            throw new Error('No se pudo obtener la lista de encuestas');
        }
        return response;
    } catch (error) {
        console.error('Error al obtener la lista de encuestas:', error);
        throw error;
    }
};
export const registrarEncuesta = async (datosEncuesta) => {
    try {
        const response = await apiRequest('encuesta/registrar', 'POST', datosEncuesta);
        if (!response) {
            throw new Error('No se pudo registrar la encuesta');
        }
        return response;
    } catch (error) {
        console.error('Error al registrar la encuesta:', error);
        throw error;
    }
};
export const actualizarEncuesta = async (id, datosEncuesta) => {
    try {
        const response = await apiRequest(`encuesta/actualizar/${id}`, 'PUT', datosEncuesta);
        if (!response) {
            throw new Error('No se pudo actualizar la encuesta');
        }
        return response;
    } catch (error) {
        console.error('Error al actualizar la encuesta:', error);
        throw error;
    }
};
export const eliminarEncuesta = async (id) => {
    try {
        const response = await apiRequest(`encuesta/eliminar/${id}`, 'DELETE');
        if (!response) {
            throw new Error('No se pudo eliminar la encuesta');
        }
        return response;
    } catch (error) {
        console.error('Error al eliminar la encuesta:', error);
        throw error;
    }
};
