const UserService = require('../services/usuarioService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = require("../config/config");
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
    
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const nuevoUsuario = await UserService.crearUsuario(req.body);
        res.status(201).json({ mensaje: 'Usuario creado', usuario: { id: nuevoUsuario.id, email: nuevoUsuario.email } });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.loginUsuario = async (req, res) => {

    try {
        const { email, password } = req.body;

        const usuario = await UserService.obtenerUsuarioPorEmail(email);
        if (!usuario || !await bcrypt.compare(password, usuario.password))
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  
        const token = jwt.sign({ id: usuario.id, email: usuario.email, rol: usuario.Rol.nombre }, JWT_SECRET, { expiresIn: '2h' });

        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

exports.obtenerPerfil = async (req, res) => { 
   
   const email = req.params.email; // Obtener el email de los parámetros de la URL
 

    try {
        const usuario = await UserService.obtenerUsuarioPorEmail(email);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.Rol.nombre });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};


exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await UserService.listarUsuarios();

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ mensaje: 'No hay usuarios registrados' });
        }

        const usuariosFormateados = usuarios.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.Rol ? usuario.Rol.nombre : 'Sin rol'
        }));

        res.json(usuariosFormateados);
    } catch (error) {
        
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};