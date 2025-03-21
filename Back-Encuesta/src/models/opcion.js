const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Pregunta = require('./Pregunta'); // ⚠️ Esto puede generar importación circular

const OpcionPregunta = sequelize.define('OpcionPregunta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pregunta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'preguntas', // ⚠️ El nombre de la tabla en la BD
            key: 'id'
        }
    },
    opcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    es_correcta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false,
    tableName: 'opciones_preguntas'
});

module.exports = OpcionPregunta;
