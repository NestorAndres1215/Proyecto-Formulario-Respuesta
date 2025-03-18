const { DataTypes } = require('sequelize');
const sequelize = require('../db/database'); // Verifica que esta ruta sea correcta

const Rol = sequelize.define('Rol', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.ENUM('admin', 'usuario'), allowNull: false }
}, {
    timestamps: false,
    tableName: 'roles'
});

module.exports = Rol; // ⚠️ Elimina la `}` extra aquí
