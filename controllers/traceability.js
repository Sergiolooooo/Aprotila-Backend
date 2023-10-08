const { request, response } = require('express');
const Traceability = require('../models/traceability');
const Sampling = require('../models/sampling');
const MantePila = require('../models/mantePila');


const traceabilityGET = async (req = request, res = response) => {

    try {
        const traceability = await Traceability.find(); // Nos va a mostrar todos los ingresos de alebines
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                traceability

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const traceabilityPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, currentStack, destinationStack, batch, amount, typeFish, employee, sampling_id } = req.body;

        const samplingEncontrado = await Sampling.findOne({ _id: sampling_id })
        if (!samplingEncontrado) {
            return res.status(404).json({ error: "No se encontro la muestra" });
        }

        const traceabilityEncontrado = await Traceability.findOne({ sampling_id: sampling_id })
        if (traceabilityEncontrado) {
            return res.status(404).json({ error: "La muestra ya posee una trazabilidad" });
        }

        const pilaOrigen = await MantePila.findOne({ numPila: currentStack })
        if (!pilaOrigen) {
            return res.status(404).json({ error: "No se encontro la pila origen" });
        }

        const pilaDestino = await MantePila.findOne({ numPila: destinationStack })
        if (!pilaDestino) {
            return res.status(404).json({ error: "No se encontro la pila Destino" });
        }


        if (pilaOrigen.cantidad < amount) {
            return res.status(404).json({ error: "La pila origen no contiene esa cantidad " });
        }
        
        const nuevaCantidadOrigen = pilaOrigen.cantidad - amount;
        const nuevaCantidadDestino = pilaDestino.cantidad + amount;
        
        const updated1 = await MantePila.findByIdAndUpdate(pilaOrigen._id, {cantidad: nuevaCantidadOrigen });
        const updated2 = await MantePila.findByIdAndUpdate(pilaDestino._id, {cantidad: nuevaCantidadDestino });

        if (!updated1) {
            // Si el documento no se encontró, devuelve un mensaje de error
            return res.status(404).json({ error: "No existe la pila." });
        }
        if (!updated2) {
            // Si el documento no se encontró, devuelve un mensaje de error
            return res.status(404).json({ error: "No existe la pila." });
        }

   // Encuentra el documento MantePila asociado al lote (batch) ingresado en la trazabilidad
   const loteOrigen = await MantePila.findOne({ numLote: batch });

   if (!loteOrigen) {
       return res.status(404).json({ error: "No existe el lote." });
   }

   // Actualiza el valor numLote en MantePila con el valor ingresado en el formulario de trazabilidad
   loteOrigen.numLote = batch; // Asignamos el valor de batch al campo numLote de loteOrigen
   await loteOrigen.save(); //

        //Se crea una nueva Entryalebines con los campos anteriores
        const traceability = new Traceability({ date, currentStack, destinationStack, batch, amount, typeFish, employee, sampling_id });
        //Registro en la base de datos
        await traceability.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                traceability
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const traceabilityPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const resto = req.body;

        const updated = await Traceability.findByIdAndUpdate(id, resto);

        res.json({
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


const traceabilityDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const DELETE = await Traceability.findByIdAndDelete(id)

        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                DELETE
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}

module.exports = {
    traceabilityGET,
    traceabilityPOST,
    traceabilityPUT,
    traceabilityDELETE
};