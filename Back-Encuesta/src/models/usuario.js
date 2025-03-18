const { DataTypes } = require('sequelize');
const sequelize =require('../db/database');
const Rol = require('./Rol');

const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol_id: { type: DataTypes.INTEGER, allowNull: false },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'usuarios'
});

Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });

module.exports = Usuario;
