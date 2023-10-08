const { request, response } = require('express');
const MantePila = require('../models/mantePila');



const mantePilaGET = async (req = request, res = response) => {

    try {
        const mantePila = await MantePila.find(); // Nos va a mostrar todos los datos de mortalidad
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                mantePila
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const mantePilaPOST = async (req = request, res = response) => {
    try {
        const body = req.body;

        // Desestructuramos lo que viene en el body
        const { numPila, observacion } = req.body;

        // Intentamos crear un nuevo documento en la base de datos
        const nuevoMantePila = await MantePila.create({ numLote: 0, numPila, observacion, cantidad: 0, entry_id:null });

        // Retornamos el resultado de la llamada
        res.json({
            ok: 200,
            msg: "Formulario agregado correctamente",
            enviar: nuevoMantePila
        });
    } catch (err) {
        if (err.code === 11000) {
            // Código de error 11000 indica una violación de índice único (duplicado)
            res.status(400).json({ error: "El número de pila ya existe. Proporciona un número único." });
        } else {
            console.log(err);
            res.status(500).json({ error: "Hubo un error en el servidor." });
        }
    }
};


const mantePilaPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const resto = req.body;

        console.log("Valor de batch:", resto.numLote); // Agregamos un console.log para verificar el valor de batch
        let numCantidad;
        try {
            numCantidad = parseInt(resto.cantidad);
        } catch (err) {
            console.log(err);
            return res.status(404).json({ error: "La cantidad debe ser numérica." });
        }

        const updateFields = {};
        if (typeof resto.cantidad !== "undefined") {
            updateFields.$inc = { cantidad: numCantidad }; // Utiliza "$inc" para acumular la cantidad
        }
        if (typeof resto.numLote !== "undefined") {
            updateFields.numLote = resto.numLote;
        }
        if (typeof resto.entry_id !== "undefined") {
            updateFields.entry_id = resto.entry_id;
        }

        console.log("Valores de actualización:", updateFields); // Agregamos un console.log para verificar los valores de actualización

        // Actualiza el documento utilizando el objeto de actualización construido
        const updated = await MantePila.findByIdAndUpdate(
            id,
            updateFields,
            { new: true } // Devuelve el documento actualizado en lugar del anterior
        );

        if (!updated) {
            // Si el documento no se encontró, devuelve un mensaje de error
            return res.status(404).json({ error: "El formulario no existe." });
        }
        res.json({
            ok: 200,
            msg: "Formulario actualizado correctamente",
            updated
        });

    } catch (err) {
        console.log(err);
        throw new Error('Error en el método PUT');
    }
};



const mantePilaDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const eliminar = await MantePila.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                eliminar
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    mantePilaGET,
    mantePilaPOST,
    mantePilaPUT,
    mantePilaDELETE
};