const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fuerzaPassword: { type: String, enum: ['débil', 'intermedio', 'fuerte'], required: true },
    intentosFallidos: { type: Number, default: 0 },
    bloqueadoHasta: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);