import { apiRequest } from '../api/api';

export const listarPreguntas = async () => {
    try {
        const response = await apiRequest('pregunta/listar', 'GET');
        if (!response) {
            throw new Error('No se pudo obtener la lista de preguntas');
        }
        return response;
    } catch (error) {
        console.error('Error al obtener la lista de preguntas:', error);
        throw error;
    }
};

export const listarPreguntasPorEncuesta = async (encuestaId) => {
    try {
        console.log("subiendo esto"+encuestaId);
        const response = await apiRequest(`pregunta/listar/pregunta/${encuestaId}`, 'GET');
console.log("hola"+response)
        return response;
    } catch (error) {
        console.error('Error al obtener la lista de preguntas:', error);
        throw error;
    }
};
export const registrarPregunta = async (datosPregunta) => {
    try {
        if (!datosPregunta || typeof datosPregunta !== 'object') {
            throw new Error("Los datos de la pregunta no son válidos.");
        }

        // Convertimos encuestaId a número y renombramos el campo si es necesario
        const datosCorregidos = {
            pregunta: datosPregunta.pregunta,
            tipo: datosPregunta.tipo,
            encuesta_id: Number(datosPregunta.encuestaId), // Convertir a número
            opciones: datosPregunta.opciones
        };

        console.log("📌 Datos corregidos antes de enviar:", JSON.stringify(datosCorregidos, null, 2));

        const response = await apiRequest('pregunta/registrar', 'POST', datosCorregidos);

        console.log("📌 Respuesta del servidor:", response);

        if (!response) {
            throw new Error('No se pudo registrar la pregunta');
        }

        console.log("✅ Pregunta registrada con éxito:", response);
        return response;
    } catch (error) {
        console.error("❌ Error al registrar la pregunta:", error);
        throw error;
    }
};


export const actualizarPregunta = async (id, datosPregunta) => {
    try {
        const response = await apiRequest(`pregunta/actualizar/${id}`, 'PUT', datosPregunta);
        if (!response) {
            throw new Error('No se pudo actualizar la pregunta');
        }
        return response;
    } catch (error) {
        console.error('Error al actualizar la pregunta:', error);
        throw error;
    }
};

export const eliminarPregunta = async (id) => {
    try {
        const response = await apiRequest(`pregunta/eliminar/${id}`, 'DELETE');
        if (!response) {
            throw new Error('No se pudo eliminar la pregunta');
        }
        return response;
    } catch (error) {
        console.error('Error al eliminar la pregunta:', error);
        throw error;
    }
};
