const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Función para Registrar un Usuario Nuevo
const registrar = async (req, res) => {
    const { email, password, fuerzaPassword } = req.body;
    try {
        // Encriptar la contraseña (nadie podrá verla en la base de datos)
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            email,
            password: passwordEncriptada,
            fuerzaPassword
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error });
    }
};

// 2. Función para Iniciar Sesión (Login) con bloqueo
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        // Validar si la cuenta está bloqueada
        if (usuario.bloqueadoHasta && usuario.bloqueadoHasta > Date.now()) {
            return res.status(403).json({ mensaje: 'Cuenta bloqueada por múltiples intentos fallidos. Intente en 15 minutos.' });
        }

        // Comparar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            usuario.intentosFallidos += 1;
            // Bloquear si llega a 3 intentos
            if (usuario.intentosFallidos >= 3) {
                usuario.bloqueadoHasta = Date.now() + 15 * 60 * 1000; // Bloqueo de 15 mins
                usuario.intentosFallidos = 0; // Reiniciar contador para el futuro
            }
            await usuario.save();
            return res.status(401).json({ mensaje: `Contraseña incorrecta. Intentos fallidos: ${usuario.intentosFallidos}` });
        }

        // Si ingresa bien, limpiar bloqueos
        usuario.intentosFallidos = 0;
        usuario.bloqueadoHasta = null;
        await usuario.save();

        // Crear token de sesión
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ mensaje: 'Ingreso exitoso', token });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

module.exports = { registrar, login };