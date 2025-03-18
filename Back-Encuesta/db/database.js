const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'encuestas_db'
});

// Conectar y manejar errores
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err.message);
    return;
  }
  console.log('Conectado a MySQL correctamente.');
});

module.exports = connection;

