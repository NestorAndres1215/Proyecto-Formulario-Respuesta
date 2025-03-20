const Encuesta = require('../models/Encuesta');
const Usuario = require('../models/usuario');

class EncuestaService {
    static async crearEncuesta(datos) {
        let { titulo, descripcion, usuario_id, fecha_inicio, fecha_fin, estado } = datos;

        // Validar que los campos requeridos no estén vacíos
        if (!titulo || titulo.trim() === '') throw new Error('El título es obligatorio');
        if (!descripcion || descripcion.trim() === '') throw new Error('La descripción es obligatoria');

        // Validar usuario_id
        if (!usuario_id || isNaN(usuario_id)) throw new Error('El usuario_id debe ser un número válido');

        // Validar si el usuario existe antes de crear la encuesta
        const usuarioExiste = await Usuario.findByPk(usuario_id);
        if (!usuarioExiste) throw new Error('El usuario no existe');

        // Validar fechas
        fecha_inicio = new Date(fecha_inicio);
        fecha_fin = new Date(fecha_fin);

        if (isNaN(fecha_inicio.getTime())) throw new Error('La fecha de inicio no es válida');
        if (isNaN(fecha_fin.getTime())) throw new Error('La fecha de fin no es válida');
        if (fecha_fin <= fecha_inicio) throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');

        // Validar estado (solo permite 'activa' o 'inactiva')
        const estadosPermitidos = ['activa', 'inactiva'];
        if (!estado || !estadosPermitidos.includes(estado)) throw new Error("El estado debe ser 'activa' o 'inactiva'");

        // Crear encuesta si todas las validaciones se cumplen
        return await Encuesta.create({ titulo, descripcion, usuario_id, fecha_inicio, fecha_fin, estado });
    }
    static async obtenerEncuestasPorUsuario(usuario_id) {
        // Validar si el usuario existe antes de buscar sus encuestas
        const usuarioExiste = await Usuario.findByPk(usuario_id);
        if (!usuarioExiste) throw new Error('El usuario no existe');

        return await Encuesta.findAll({ where: { usuario_id }, include: Usuario });
    }
    static async obtenerEncuestaPorId(id) {
        return await Encuesta.findByPk(id, { include: Usuario });
    }
    static async actualizarEncuesta(id, usuario_id, datos) {
        // Validar que id y usuario_id sean números válidos
        if (!id || isNaN(id)) throw new Error('El ID de la encuesta debe ser un número válido');
        if (!usuario_id || isNaN(usuario_id)) throw new Error('El usuario_id debe ser un número válido');

        // Buscar la encuesta y verificar si pertenece al usuario
        const encuesta = await Encuesta.findOne({ where: { id, usuario_id } });
        if (!encuesta) throw new Error('Encuesta no encontrada o no pertenece al usuario');

        // Validar que titulo y descripcion no estén vacíos si se envían
        if (datos.titulo && datos.titulo.trim() === '') throw new Error('El título no puede estar vacío');
        if (datos.descripcion && datos.descripcion.trim() === '') throw new Error('La descripción no puede estar vacía');

        // Validar fechas si se envían en los datos
        if (datos.fecha_inicio || datos.fecha_fin) {
            const fecha_inicio = datos.fecha_inicio ? new Date(datos.fecha_inicio) : new Date(encuesta.fecha_inicio);
            const fecha_fin = datos.fecha_fin ? new Date(datos.fecha_fin) : new Date(encuesta.fecha_fin);

            if (isNaN(fecha_inicio.getTime())) throw new Error('La fecha de inicio no es válida');
            if (isNaN(fecha_fin.getTime())) throw new Error('La fecha de fin no es válida');
            if (fecha_fin <= fecha_inicio) throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
        }

        // Validar estado si se envía
        if (datos.estado) {
            const estadosPermitidos = ['activa', 'inactiva'];
            if (!estadosPermitidos.includes(datos.estado)) throw new Error("El estado debe ser 'activa' o 'inactiva'");
        }

        // Actualizar encuesta si todas las validaciones se cumplen
        return await encuesta.update(datos);
    }
    static async listarEncuestas() {
        return await Encuesta.findAll({
            include: { model: Usuario, attributes: ['id', 'nombre', 'email'] }
        });
    }

    static async eliminarEncuesta(id) {
        const encuesta = await Encuesta.findOne({ where: { id} });
        if (!encuesta) throw new Error('Encuesta no encontrada o no pertenece al usuario');

        await encuesta.destroy();
        return { mensaje: 'Encuesta eliminada exitosamente' };
    }
}

module.exports = EncuestaService;
