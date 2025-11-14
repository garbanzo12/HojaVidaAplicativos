const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require('./src/routes');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a HojaVidaAplicativos API' });
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
