const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Usuario = require('./usuario');

const Encuesta = sequelize.define('Encuesta', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(255), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE, allowNull: false },
    estado: { 
        type: DataTypes.ENUM('activa', 'inactiva'), 
        allowNull: false, 
        defaultValue: 'activa' 
    },
    creada_en: { 
        type: DataTypes.DATE,  // ✅ Usa DATE en lugar de TIMESTAMP
        allowNull: false,
        defaultValue: DataTypes.NOW 
    }
    
}, {
    timestamps: false,
    tableName: 'encuestas'
});

// Relación: Una encuesta pertenece a un usuario (quien la crea)
Encuesta.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Encuesta;
