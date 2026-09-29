const express = require('express');
const router = express.Router();
const { obtenerMascotas, crearMascota, eliminarMascota } = require('../controllers/mascotaController');

// Ruta para obtener mascotas (GET /api/mascotas)
router.get('/', obtenerMascotas);

// Ruta para crear mascota (POST /api/mascotas)
router.post('/', crearMascota);

// Ruta para la eliminación lógica (PUT /api/mascotas/eliminar/:id)
router.put('/eliminar/:id', eliminarMascota);

module.exports = router;