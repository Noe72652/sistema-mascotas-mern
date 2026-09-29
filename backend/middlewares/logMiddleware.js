const Log = require('../models/Log'); // Tu modelo de logs en la BD

const registrarAcceso = async (req, res, next) => {
    try {
        const log = new Log({
            usuario: req.body.email || 'Anónimo',
            ip: req.ip || req.connection.remoteAddress,
            evento: req.path.includes('login') ? 'ingreso' : 'otro',
            browser: req.headers['user-agent'],
            fechaHora: new Date()
        });
        await log.save();
    } catch (error) {
        console.error('Error al guardar log', error);
    }
    next();
};

module.exports = registrarAcceso;