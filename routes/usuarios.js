//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('tipoUsuario', 'Selecciona un tipo de usuario').not().isEmpty()
    ],
    usuarioController.crearUsuario
)

module.exports = router;