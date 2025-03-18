const express = require('express');
const { body } = require('express-validator');
const { registrarRol, listarRoles, actualizarRol } = require('../controllers/rolController');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Validaciones para el registro/actualización de roles
const validarRol = [
    body('nombre').notEmpty().withMessage('El nombre del rol es obligatorio'),
];

// Rutas
router.post('/registrar', verificarToken, validarRol, registrarRol);
router.get('/listar', listarRoles);
router.put('/actualizar/:id', verificarToken, validarRol, actualizarRol);

module.exports = router;
