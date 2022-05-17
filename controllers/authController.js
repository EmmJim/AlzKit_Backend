const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisamos por errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer el email y password
    const {nombre, password, tipoUsuario} = req.body;

    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({nombre});

        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Revisar el tipo usuario
        if(tipoUsuario !== usuario.tipoUsuario){
            return res.status(400).json({msg: 'Verifica si eres paciente o usuario'});
        }

        if(tipoUsuario === 1){
            const cuidador = await Usuario.findOne({email: usuario.email, tipoUsuario: 2});
            usuario.cuidador = cuidador; 
            await usuario.save();
        }else if(tipoUsuario === 2){
            const pacientes = await Usuario.find({email: usuario.email, tipoUsuario: 1});
            usuario.pacientes = pacientes;
            await usuario.save();
        }

        //Revisar el password
        const passCorrecto = await bcrypt.compare(password, usuario.password);

        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'});
        }

        //Si todo es correcto crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600000 // 5 días
        }, (error, token) => {
            if(error) throw error;

            res.json({token: token});
        });

    } catch (error) {
        console.log(error);
    }


}

exports.obtenerUsuario = async(req, res, next) => {
    try {
        const usuario = await Usuario.findOne({_id: req.usuario.id });

        if(!usuario){
            return res.status(500).json({msg: 'Usuario no encontrado'});
        }

        if(usuario.tipoUsuario === 1){
            let cuidador = await Usuario.findOne({_id: usuario.cuidador});
            usuario.cuidador = cuidador;
            await cuidador.save();
        }else if(usuario.tipoUsuario === 2){
            const pacientes = await Usuario.find({email: usuario.email, tipoUsuario: 1});
            usuario.pacientes = pacientes;
            await usuario.save();
        }

        res.status(200).json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}