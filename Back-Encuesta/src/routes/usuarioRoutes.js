const express = require('express');
const { body } = require('express-validator');
const { crearUsuario, loginUsuario, obtenerPerfil } = require('../controllers/usuarioController');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

const validarRegistro = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol_id').isInt().withMessage('El rol es obligatorio y debe ser un número')
];

router.post('/register', validarRegistro, crearUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, obtenerPerfil);

module.exports = router;
