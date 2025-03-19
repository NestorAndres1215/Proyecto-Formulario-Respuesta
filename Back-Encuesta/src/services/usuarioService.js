const Usuario = require('../models/usuario');
const Rol = require('../models/Rol');
const bcrypt = require('bcryptjs');

class UserService {
    static async crearUsuario(datos) {
        const { nombre, email, password, rol_id } = datos;

        // Validar si el nombre ya está en uso
        const nombreExiste = await Usuario.findOne({ where: { nombre } });
        if (nombreExiste) throw new Error('El nombre de usuario ya está registrado');

        // Validar si el email ya está en uso
        const usuarioExiste = await Usuario.findOne({ where: { email } });
        if (usuarioExiste) throw new Error('El email ya está registrado');

        // Validar si el rol existe
        const rolExiste = await Rol.findByPk(rol_id);
        if (!rolExiste) throw new Error('El rol no existe');

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        return await Usuario.create({ nombre, email, password: hashedPassword, rol_id });
    }

    static async obtenerUsuarioPorEmail(email) {
        return await Usuario.findOne({ where: { email }, include: Rol });
    }
    static async listarUsuarios() {
        return await Usuario.findAll({ include: { model: Rol } });
    }
}

module.exports = UserService;