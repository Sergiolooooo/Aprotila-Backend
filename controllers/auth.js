const { request, response } = require('express');
const Usuario = require('../models/users');
var bcrypt = require('bcryptjs'); //Sirve para encriptar las contraseñas
const GenerateJWT = require('../helpers/GenerateWebToken') //Sirve para generar el token


const LoginPOST = async (req = request, res = response) => {
    try {
        const { identification, password } = req.body;
        const usuario = await Usuario.findOne({ 'identification': { $regex: new RegExp(identification, 'i') } });
        if (!usuario) {
            return res.status(401).json({
                Ok: 401,
                msg: 'identification o Password invalidos',
            });
        }

        // Se valida que la identificacion o contraseña
        const passwordValid = bcrypt.compareSync(password, usuario.password);
        if (!passwordValid) {
            return res.status(401).json({
                Ok: 401,
                msg: 'identification o Password invalidos',
            });
        }

        // Se genera el token de las rutas
        const token = await GenerateJWT(usuario._id, usuario.name, usuario.identification, usuario.rol);

        return res.status(200).json({
            Ok: 200,
            msg: 'Token de acceso a las rutas',
            token: token,
            identification: usuario.identification //Incluir el campo identification en la respuesta
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo login post'
        });
    }
};

module.exports = {
    LoginPOST,
}