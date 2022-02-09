//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// /api/auth
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('tipoUsuario', 'Selecciona un tipo de usuario').not().isEmpty()
    ],
    authController.autenticarUsuario
)

//Obtiene el usuario autenticado
router.get('/', 
    auth,
    authController.obtenerUsuario
);

module.exports = router;