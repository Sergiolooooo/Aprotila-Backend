const { request, response } = require('express');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

const ValidateJWT = (req = request, res = response, next) => {
    try {
        const token = req.header('authenticate');// authenticate es el token y se va a enviar en el header
        // const ced = req.header('ced');
        if (!token) {
            return res.status(400).json({
                ok: false,
                msg: 'El token no es valido'
            });
        }
        // if (!ced) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'El ced no es valido xd'

        //     });
        // }
        
        //Sirve para verificar el token con el id y rol
        const payload = Jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { id, rol } = payload;
        req.validate = id;
        req.Rol = rol;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({
            ok: false,
            msg: 'El token no es valido' //Lanzara ese error en caso que el token no sea valido
        })
    }
}
module.exports = { ValidateJWT }