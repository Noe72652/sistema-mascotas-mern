require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

// 1. Importar las rutas (Aquí agregamos la de mascotas)
const authRoutes = require('./routes/authRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes'); // <-- NUEVA LÍNEA

const app = express();

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// 2. Habilitar las rutas en la API (Aquí agregamos la de mascotas)
app.use('/api/auth', authRoutes);
app.use('/api/mascotas', mascotaRoutes); // <-- NUEVA LÍNEA

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del Sistema de Control de Mascotas funcionando 🐶🐱');
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
/*
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json'); // Tu config de Swagger
// const conectarDB = require('./config/db'); // Descomentar al tener la DB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importar Rutas
// const authRoutes = require('./routes/authRoutes');
// const mascotaRoutes = require('./routes/mascotaRoutes');

// Rutas base
// app.use('/api/auth', authRoutes);
// app.use('/api/mascotas', mascotaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
*/