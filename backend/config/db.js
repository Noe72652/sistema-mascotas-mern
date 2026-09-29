const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // Intenta conectarse usando la URI del archivo .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Base de datos MongoDB conectada exitosamente');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1); // Detiene el servidor si falla la conexión
    }
};

module.exports = conectarDB;