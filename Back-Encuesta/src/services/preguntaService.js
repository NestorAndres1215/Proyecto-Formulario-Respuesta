const Pregunta = require('../models/Pregunta');
const OpcionPregunta = require('../models/opcion');

class PreguntaService {
    static async crearPregunta(datos) {
        let { pregunta, tipo, encuesta_id, opciones } = datos;
    
        if (!pregunta || pregunta.trim() === '') throw new Error('La pregunta es obligatoria');
        if (!tipo || !['abierta', 'opcion_multiple'].includes(tipo)) {
            throw new Error("El tipo de pregunta debe ser 'abierta' o 'opcion_multiple'");
        }
        if (!encuesta_id) throw new Error("El encuesta_id es obligatorio");
    
        // **1. Crear la pregunta y obtener su ID**
        const nuevaPregunta = await Pregunta.create({ pregunta, tipo, encuesta_id });
    
        // **2. Si es opción múltiple, insertar opciones con el `pregunta_id` obtenido**
        if (tipo === 'opcion_multiple' && Array.isArray(opciones)) {
            const opcionesCreadas = opciones.map(opcion => ({
                pregunta_id: nuevaPregunta.id,  // Aquí usamos el ID generado
                opcion: opcion.opcion,
                es_correcta: opcion.es_correcta || false
            }));
            await OpcionPregunta.bulkCreate(opcionesCreadas);
        }
    
        return nuevaPregunta;
    }
    

    static async obtenerPreguntas() {
        return await Pregunta.findAll({ include: OpcionPregunta });
    }

    static async obtenerPreguntaPorId(id) {
        const pregunta = await Pregunta.findByPk(id, { include: OpcionPregunta });
        if (!pregunta) throw new Error('Pregunta no encontrada');
        return pregunta;
    }

    static async actualizarPregunta(id, datos) {
        const pregunta = await Pregunta.findByPk(id);
        if (!pregunta) throw new Error('Pregunta no encontrada');

        if (datos.pregunta && datos.pregunta.trim() === '') {
            throw new Error('La pregunta no puede estar vacía');
        }

        if (datos.tipo && !['abierta', 'opcion_multiple'].includes(datos.tipo)) {
            throw new Error("El tipo de pregunta debe ser 'abierta' o 'opcion_multiple'");
        }

        // Actualizar pregunta
        await pregunta.update(datos);

        // Si la pregunta es de opción múltiple y se envían opciones, actualizar
        if (datos.tipo === 'opcion_multiple' && datos.opciones) {
            await OpcionPregunta.destroy({ where: { pregunta_id: id } }); // Eliminar opciones previas

            const opcionesActualizadas = datos.opciones.map(opcion => ({
                pregunta_id: id,
                opcion: opcion.opcion,
                es_correcta: opcion.es_correcta || false
            }));
            await OpcionPregunta.bulkCreate(opcionesActualizadas);
        }

        return pregunta;
    }

    static async eliminarPregunta(id) {
        const pregunta = await Pregunta.findByPk(id);
        if (!pregunta) throw new Error('Pregunta no encontrada');

        // Eliminar opciones asociadas si existen
        await OpcionPregunta.destroy({ where: { pregunta_id: id } });

        await pregunta.destroy();
        return { mensaje: 'Pregunta eliminada exitosamente' };
    }
    static async  listarPreguntasPorEncuesta(encuestaId) {
        try {
            const preguntas = await Pregunta.findAll({
                where: { encuesta_id: encuestaId },
                include: [
                    {
                        model: OpcionPregunta,
                        as: 'opciones', // 👈 Debe coincidir con `hasMany(OpcionPregunta, { as: 'opciones' })`
                    }
                ]
            });
    
            return preguntas;
        } catch (error) {
            console.error('Error en listarPreguntasPorEncuesta:', error);
            throw new Error('Error al obtener las preguntas');
        }
    }
    
}

module.exports = PreguntaService;
