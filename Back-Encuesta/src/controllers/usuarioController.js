const UserService = require('../services/usuarioService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = require("../config/config");
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
    console.log(req.body)
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const nuevoUsuario = await UserService.crearUsuario(req.body);
        res.status(201).json({ mensaje: 'Usuario creado', usuario: { id: nuevoUsuario.id, email: nuevoUsuario.email } });
    } catch (error) {
        console.log(error.messaje)
        res.status(400).json({ mensaje: error.message });
    }
};

exports.loginUsuario = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;

        const usuario = await UserService.obtenerUsuarioPorEmail(email);
        if (!usuario || !await bcrypt.compare(password, usuario.password))
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        console.log("Usuario : " + usuario)
        const token = jwt.sign({ id: usuario.id, email: usuario.email, rol: usuario.Rol.nombre }, JWT_SECRET, { expiresIn: '2h' });

        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

exports.obtenerPerfil = async (req, res) => { 
   console.log(req.body)
   const email = req.params.email; // Obtener el email de los parámetros de la URL
   console.log(`Buscando usuario con email: ${email}`);

    try {
        const usuario = await UserService.obtenerUsuarioPorEmail(email);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.Rol.nombre });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};
