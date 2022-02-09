const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //Revisamos por errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer email y password
    const {email, password} = req.body;

    try {

        //Crear el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);


        //Guardar usuario
        await usuario.save();


        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600000 // 5 días
        }, (error, token) => {
            if(error) throw error;

            res.json({token: token, msg: 'Su cuenta se ha creado correctamente, ya puedes iniciar sesión'});
        });

        // res.status(200).json({msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }   
}