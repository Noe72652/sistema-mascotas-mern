// Ejemplo usando Mongoose (MongoDB)
const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    edad: { type: Number, required: true },
    // ELIMINACIÓN LÓGICA: En lugar de borrar de la DB, cambiamos este estado
    activo: { type: Boolean, default: true } 
}, { timestamps: true });

module.exports = mongoose.model('Mascota', mascotaSchema);