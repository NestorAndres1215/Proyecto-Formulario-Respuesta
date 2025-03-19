const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/usuarioRoutes');
const rolRoutes = require('./routes/rolRoutes');
const encuestaRoutes = require('./routes/encuestaRoutes');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json()); // 📌 Esto ya analiza JSON correctamente
app.use(express.urlencoded({ extended: true })); // 📌 Para datos en formularios

app.use('/api/usuarios', userRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/encuesta', encuestaRoutes);
module.exports = app;
