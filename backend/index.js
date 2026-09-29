const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta de prueba para comprobar que el servidor responde
app.get('/', (req, res) => {
    res.send('¡Hola! El backend del sistema de Mascotas está funcionando perfectamente 🐶🐱');
});

// Configurar el puerto y arrancar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});