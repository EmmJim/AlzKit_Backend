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
    cuidador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    pacientes: {
        type: Array,
        default: []
    },
    localizacion: {
        coordenadas: {
            type: [Number],
            required: true
        }
    },
    pushToken: {
        type: String,
        trim: true
    },
    informacion: {
        direccion: {
            type: Object,
        }
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);