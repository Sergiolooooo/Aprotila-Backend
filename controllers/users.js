const { request, response } = require('express');
const Users = require('../models/users');
var bcrypt = require('bcryptjs');



const usersGET = async (req = request, res = response) => {

    try {
        const users = await Users.find(); // Nos va a mostrar todos los usuarios
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                users

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const usersPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { name, identification, password, telephone, rol } = req.body;

        //Vamos a encriptar la clave, necesito un inst un paquete llamado bcryptjs
        const usuario = new Users({ name, identification, password, telephone, rol });

        //creamos las vueltas del  encriptado 
        const salt = bcrypt.genSaltSync();

        //Encriptamos el password
        usuario.password = bcrypt.hashSync(password, salt);


        //Registro en la base de datos
        await usuario.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                usuario
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const usersPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params
        //resto guarda lo que sobra 
        const resto = req.body;

        // if (password) {
        //    const salt = bcrypt.genSaltSync();
        //     resto.password = bcrypt.hashSync(password, salt)
        //  }

        const updated = await Users.findByIdAndUpdate(id, resto)

        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo PUT",
                updated
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo PUT');
    }
}


const usersDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const user = await Users.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo DELETE",
                user
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}

const usersGETById = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const users = await Users.find({"identification":id});
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GETbyId",
                users

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GETbyId');
 }
}


module.exports = {
    usersGET,
    usersPOST,
    usersPUT,
    usersDELETE,
    usersGETById
};