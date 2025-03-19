const express = require('express');
const { body } = require('express-validator');
const { obtenerEncuesta, listarEncuestasPorUsuario, crearEncuesta, actualizarEncuesta, eliminarEncuesta, listarEncuestas } = require('../controllers/encuestaController');



const router = express.Router();

// Validaciones para el registro/actualización de roles
const validarEncuesta = [
    body('titulo').notEmpty().withMessage('El título es obligatorio').trim(),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria').trim(),
    body('usuario_id').isInt().withMessage('El usuario_id debe ser un número válido'),
    body('fecha_inicio').isISO8601().withMessage('La fecha de inicio no es válida'),
    body('fecha_fin')
        .isISO8601().withMessage('La fecha de fin no es válida')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.fecha_inicio)) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        }),
    body('estado').isIn(['activa', 'inactiva']).withMessage("El estado debe ser 'activa' o 'inactiva'")
];

// Rutas
// Registrar una nueva encuesta
router.post('/registrar', validarEncuesta, crearEncuesta);

// Listar todas las encuestas
router.get('/listar', listarEncuestas);

// Listar encuestas por usuario
router.get('/listar/usuario/:usuario_id', listarEncuestasPorUsuario);
// Listar encuestas por usuario
router.get('/listar/codigo/:id', obtenerEncuesta);

// Actualizar una encuesta
router.put('/actualizar/:id', validarEncuesta, actualizarEncuesta);

// Eliminar una encuesta
router.delete('/eliminar/:id', eliminarEncuesta);


module.exports = router;
