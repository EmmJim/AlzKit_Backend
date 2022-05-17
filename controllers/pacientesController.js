const Usuario = require('../models/Usuario');

exports.obtenerLocalizacionPaciente = async(req, res, next) => {

    const {id} = req.params;
    // console.log(req.params);

    try {
        const usuario = await Usuario.findOne({_id: id});

        if(!usuario){
            return res.status(500).json({msg: 'Usuario no encontrado'});
        }
        
        const localizacion = usuario.localizacion;

        res.status(200).json({localizacion});
    } catch (error) {
        
    }
}
exports.obtenerDirecciónPaciente = async(req, res, next) => {

    const {id} = req.params;
    // console.log(req.params);

    try {
        const usuario = await Usuario.findOne({_id: id});

        if(!usuario){
            return res.status(500).json({msg: 'Usuario no encontrado'});
        }
        
        const localizacion = usuario.localizacion;

        res.status(200).json({localizacion});
    } catch (error) {
        
    }
}

exports.guardarLocalizacionPaciente = async(req, res, next) => {
    const {locationData, address, id} = req.body;
    console.log(address);

    try {
        const usuario = await Usuario.findOne({_id: id });

        if(!usuario){
            return res.status(500).json({msg: 'Usuario no encontrado'});
        }

        if(usuario.tipoUsuario === 1){
            usuario.localizacion.coordenadas[0] = locationData.latitude; //Añadir coordenadas al paciente
            usuario.localizacion.coordenadas[1] = locationData.longitude; //Añadir coordenadas al paciente
            usuario.informacion.direccion = address;
            await usuario.save();
        }

        res.status(200).json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.guardarPushToken = async(req, res, next) => {
    const {pushToken, id} = req.body;

    try {
        const usuario = await Usuario.findOne({_id: id });

        if(!usuario){
            return res.status(500).json({msg: 'Usuario no encontrado'});
        }

        usuario.pushToken = pushToken;
        await usuario.save();

        res.status(200).json({usuario});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

