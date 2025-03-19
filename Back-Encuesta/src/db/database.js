const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('encuestas_db', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

// Verificar la conexión
sequelize.authenticate()
    .then(() => console.log('Conectado a MySQL .'))
    .catch(err => console.error('Error de conexión con Sequelize:', err));

module.exports = sequelize;
