const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Encuesta = require('./Encuesta');
const OpcionPregunta = require('./opcion');

const Pregunta = sequelize.define('Pregunta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    encuesta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'encuestas', // Nombre de la tabla en la BD
            key: 'id'
        }
    },
    pregunta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('abierta', 'opcion_multiple'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'preguntas'
});

// 📌 Define la relación correctamente
Pregunta.hasMany(OpcionPregunta, { foreignKey: 'pregunta_id', as: 'opciones', onDelete: 'CASCADE' });
OpcionPregunta.belongsTo(Pregunta, { foreignKey: 'pregunta_id', as: 'pregunta' });

module.exports = Pregunta;

