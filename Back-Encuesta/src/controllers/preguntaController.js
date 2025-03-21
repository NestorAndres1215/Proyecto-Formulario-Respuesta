const { validationResult } = require('express-validator');
const PreguntaService = require('../services/preguntaService');

exports.crearPregunta = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const nuevaPregunta = await PreguntaService.crearPregunta(req.body);
        res.status(201).json({ mensaje: 'Pregunta creada', pregunta: nuevaPregunta });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.obtenerPregunta = async (req, res) => {
    const { id } = req.params;

    try {
        const pregunta = await PreguntaService.obtenerPreguntaPorId(id);
        if (!pregunta) return res.status(404).json({ mensaje: 'Pregunta no encontrada' });

        res.json(pregunta);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

exports.actualizarPregunta = async (req, res) => {
    const { id } = req.params;
    const { encuesta_id } = req.body; // Obtener encuesta_id para validar

    try {
        const preguntaActualizada = await PreguntaService.actualizarPregunta(id, encuesta_id, req.body);
        res.json({ mensaje: 'Pregunta actualizada', pregunta: preguntaActualizada });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.eliminarPregunta = async (req, res) => {
    const { id } = req.params;

    try {
        await PreguntaService.eliminarPregunta(id);
        res.json({ mensaje: 'Pregunta eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.listarPreguntas = async (req, res) => {
    try {
        const preguntas = await PreguntaService.listarPreguntas();
        if (!preguntas || preguntas.length === 0) {
            return res.status(404).json({ mensaje: 'No hay preguntas disponibles' });
        }
        res.json(preguntas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};
exports.listarPreguntasPorEncuesta = async (req, res) => {
    const { encuesta_id } = req.params; // ID de la encuesta en la URL

    try {
        const preguntas = await PreguntaService.listarPreguntasPorEncuesta(encuesta_id);
        if (!preguntas || preguntas.length === 0) {
            return res.status(404).json({ mensaje: 'No hay preguntas para esta encuesta' });
        }
        res.json(preguntas);
    } catch (error) {
        console.error('Error en listarPreguntasPorEncuesta:', error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};