const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tipoUsuario: {
        type: Number,
        required: true
    },
    registro: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Usuario', UsuariosSchema);