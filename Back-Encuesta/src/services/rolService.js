const Rol = require('../models/Rol');
class RolService {

    static async registrarRol(datosRol) {
        console.log(datosRol.nombre)
    
        try {
            // Validar que el nombre del rol no esté vacío
            if (!datosRol.nombre || datosRol.nombre.trim() === '') {
                throw new Error('El nombre del rol es obligatorio');
            }
    
            // Validar si el rol ya existe (asumiendo que el nombre debe ser único)
            const rolExistente = await Rol.findOne({ where: { nombre: datosRol.nombre } });
            if (rolExistente) {
                throw new Error('El rol ya existe');
            }
    
            // Registrar el nuevo rol
            return await Rol.create(datosRol);
        } catch (error) {
            throw new Error(`Error al registrar rol: ${error.message}`);
        }
    }
    static async listarRoles() {
        try {
            console.log("🔍 Buscando roles en la base de datos...");
            const roles = await Rol.findAll();
    
            console.log("✅ Roles encontrados:", roles);
    
            if (roles.length === 0) {
                console.warn("⚠️ No hay roles registrados.");
                return []; // No lanzar error, solo devolver array vacío
            }
    
            return roles.map(rol => rol.toJSON()); // Asegurarse de devolver JSON válido
        } catch (error) {
            console.error("❌ Error al listar roles:", error.message);
            throw new Error(`Error al listar roles: ${error.message}`);
        }
    }
    
    static async actualizarRol(id, datosActualizados) {
        try {
            // Validar si el ID es válido
            if (!id || isNaN(id)) {
                throw new Error('ID de rol inválido');
            }
    
            // Buscar el rol en la base de datos
            const rol = await Rol.findByPk(id);
            if (!rol) {
                throw new Error('Rol no encontrado');
            }
    
            // Validar que el nombre del rol no esté vacío
            if (!datosActualizados.nombre || datosActualizados.nombre.trim() === '') {
                throw new Error('El nombre del rol es obligatorio');
            }
    
            // Validar si ya existe otro rol con el mismo nombre
            const rolExistente = await Rol.findOne({ where: { nombre: datosActualizados.nombre } });
            if (rolExistente && rolExistente.id !== parseInt(id)) {
                throw new Error('Ya existe un rol con este nombre');
            }
    
            // Actualizar el rol
            await rol.update(datosActualizados);
            return rol;
        } catch (error) {
            throw new Error(`Error al actualizar rol: ${error.message}`);
        }
    }
    
}
module.exports = RolService;