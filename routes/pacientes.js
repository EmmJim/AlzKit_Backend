//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

//Obtener la localizacion de la BD
router.get('/localizacion/:id', 
    pacientesController.obtenerLocalizacionPaciente
);

//Guardar localizacion en la BD
router.post('/localizacion', 
    pacientesController.guardarLocalizacionPaciente
)

router.post('/push-token', 
    pacientesController.guardarPushToken
);

module.exports = router;