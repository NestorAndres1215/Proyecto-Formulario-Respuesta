
const RolService = require('../services/rolService');
const { validationResult } = require('express-validator');

exports.registrarRol = async (req, res) => {
    // Validar errores en la solicitud
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const nuevoRol = await RolService.registrarRol(req.body);
        res.status(201).json({ mensaje: 'Rol creado', rol: { id: nuevoRol.id, nombre: nuevoRol.nombre } });
    } catch (error) {

        res.status(400).json({ mensaje: error.message });
    }
};

exports.listarRoles = async (req, res) => {
    try {

        if (!RolService || !RolService.listarRoles) {
            return res.status(500).json({ mensaje: "Error: RolService no está definido correctamente" });
        }

        const roles = await RolService.listarRoles();

        if (!roles || roles.length === 0) {
            return res.status(404).json({ mensaje: "No hay roles disponibles" });
        }

        res.json(roles);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener roles", error: error.message });
    }
};


exports.actualizarRol = async (req, res) => {
    // Validar errores en la solicitud
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const rolActualizado = await RolService.actualizarRol(req.params.id, req.body);
        res.json({ mensaje: 'Rol actualizado', rol: { id: rolActualizado.id, nombre: rolActualizado.nombre } });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};
