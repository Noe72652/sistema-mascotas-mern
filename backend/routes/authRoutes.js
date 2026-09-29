const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');

// Ruta para registrar un nuevo usuario (POST /api/auth/registrar)
router.post('/registrar', registrar);

// Ruta para iniciar sesión (POST /api/auth/login)
router.post('/login', login);

module.exports = router;