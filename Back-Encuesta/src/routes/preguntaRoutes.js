const express = require('express');
const { body } = require('express-validator');
const { 
    obtenerPregunta, 
    listarPreguntasPorEncuesta, 
    crearPregunta, 
    actualizarPregunta, 
    eliminarPregunta, 
    listarPreguntas 
} = require('../controllers/preguntaController');

const router = express.Router();

// Validaciones para el registro/actualización de preguntas
const validarPregunta = [
    body('pregunta').notEmpty().withMessage('La pregunta es obligatoria').trim(),
    body('encuesta_id').isInt().withMessage('El encuesta_id debe ser un número válido')
];

// Rutas
// Registrar una nueva pregunta
router.post('/registrar', validarPregunta, crearPregunta);

// Listar todas las preguntas
router.get('/listar', listarPreguntas);

// Listar preguntas por encuesta
router.get('/listar/pregunta/:encuesta_id', listarPreguntasPorEncuesta);

// Obtener una pregunta por ID
router.get('/listar/codigo/:id', obtenerPregunta);

// Actualizar una pregunta
router.put('/actualizar/:id', validarPregunta, actualizarPregunta);

// Eliminar una pregunta
router.delete('/eliminar/:id', eliminarPregunta);

module.exports = router;