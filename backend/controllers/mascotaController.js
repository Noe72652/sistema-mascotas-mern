const Mascota = require('../models/Mascota');

// 1. Obtener todas las mascotas ACTIVAS
const obtenerMascotas = async (req, res) => {
    try {
        // Solo buscamos las que tienen activo: true
        const mascotas = await Mascota.find({ activo: true });
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las mascotas', error });
    }
};

// 2. Crear una nueva mascota
const crearMascota = async (req, res) => {
    try {
        const nuevaMascota = new Mascota(req.body);
        await nuevaMascota.save();
        res.status(201).json({ mensaje: 'Mascota creada con éxito', mascota: nuevaMascota });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la mascota', error });
    }
};

// 3. Eliminación Lógica de una mascota
const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        // En lugar de borrar de la BD, actualizamos el campo 'activo' a false
        await Mascota.findByIdAndUpdate(id, { activo: false });
        res.status(200).json({ mensaje: 'Mascota eliminada lógicamente (inactiva)' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la mascota', error });
    }
};

module.exports = { obtenerMascotas, crearMascota, eliminarMascota };