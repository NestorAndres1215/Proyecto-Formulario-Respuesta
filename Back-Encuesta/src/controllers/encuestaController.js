const EncuestaService = require('../services/encuestaService');
const { validationResult } = require('express-validator');

exports.crearEncuesta = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const nuevaEncuesta = await EncuestaService.crearEncuesta(req.body);
        res.status(201).json({ mensaje: 'Encuesta creada', encuesta: nuevaEncuesta });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.obtenerEncuesta = async (req, res) => {
    const { id } = req.params;

    try {
        const encuesta = await EncuestaService.obtenerEncuestaPorId(id);
        if (!encuesta) return res.status(404).json({ mensaje: 'Encuesta no encontrada' });

        res.json(encuesta);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

exports.actualizarEncuesta = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.body.usuario_id; // Obtener usuario_id del body para validar

    try {
        const encuestaActualizada = await EncuestaService.actualizarEncuesta(id, usuario_id, req.body);
        res.json({ mensaje: 'Encuesta actualizada', encuesta: encuestaActualizada });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.eliminarEncuesta = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.body.usuario_id; // Obtener usuario_id del body

    try {
        await EncuestaService.eliminarEncuesta(id);
        res.json({ mensaje: 'Encuesta eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.listarEncuestas = async (req, res) => {
    try {
        const encuestas = await EncuestaService.listarEncuestas();
        if (!encuestas || encuestas.length === 0) {
            return res.status(404).json({ mensaje: 'No hay encuestas disponibles' });
        }
        res.json(encuestas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};
exports.listarEncuestasPorUsuario = async (req, res) => {
    const { usuario_id } = req.params; // ID del usuario en la URL

    try {
        const encuestas = await EncuestaService.obtenerEncuestasPorUsuario(usuario_id);
        if (!encuestas || encuestas.length === 0) {
            return res.status(404).json({ mensaje: 'No hay encuestas para este usuario' });
        }
        res.json(encuestas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};