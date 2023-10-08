const { request, response } = require('express');
const Entryalevines = require('../models/entryalevines');
const MantePila = require('../models/mantePila');
const Users = require('../models/users');


const alevinesGET = async (req = request, res = response) => {

    try {
        let alevines = await Entryalevines.find(); // Nos va a mostrar todos los ingresos de alebines
        const users = await Users.find(); 

        let alevinesWithUsers = [];
        alevines.forEach(alevin => {
            const userEncontrado = users.find((user) => user._id.toString() === alevin.employee_id.toString());
            if (userEncontrado) {
                const alevinWithUser = {
                    ...alevin.toObject(),
                    employee_name: userEncontrado.name
                };
                alevinesWithUsers.push(alevinWithUser);
            }else{
                const alevinWithUser = {
                    ...alevin.toObject(),
                    employee_name: 'eliminado'
                };
                alevinesWithUsers.push(alevinWithUser);
            }
        });

        alevines = alevinesWithUsers; 
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                alevines

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const alevinesPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, provider, loteProvider, batch, pilaProvider, employee_id, pilaEntry, typeFish, cantidad } = req.body;

        //Se crea una nueva Entryalebines con los campos anteriores
        const alevinesEtry = new Entryalevines({ date, provider, loteProvider, batch, pilaProvider, employee_id, pilaEntry, typeFish, cantidad });
        //Registro en la base de datos
        await alevinesEtry.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                alevinesEtry

            }
        );


    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const alevinesPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const resto = req.body;

        const updated = await Entryalevines.findByIdAndUpdate(id, resto);

        res.json(
            {
                ok: 200,
                msg: "Formulario actualizado correctamente",
                updated
            }
        );

    } catch (err) {
        console.log(err);
        throw new Error('Error en el método PUT');
    }
};



const alevinesDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params


        



        const alevin = await Entryalevines.findByIdAndDelete(id)
        // Actualiza el documento utilizando el objeto de actualización construido

        const updated = await MantePila.findOneAndUpdate(
            { entry_id: id },
            {
                cantidad: 0,
                numLote: 0,
                entry_id: null
            },
            { new: true } // Esto te devolverá el documento actualizado
        );

        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                alevin, updated
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    alevinesGET,
    alevinesPOST,
    alevinesPUT,
    alevinesDELETE
};