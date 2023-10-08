const { request, response } = require('express');
const Sampling = require('../models/sampling');
const Traceability = require('../models/traceability');
const MantePila = require('../models/mantePila');


const samplingGET = async (req = request, res = response) => {

    try {
        const sampling = await Sampling.find();
        // Nos va a mostrar todos los ingresos de alebines
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                sampling

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}


const samplingTracebilityGET = async (req = request, res = response) => {

    try {
        const sampling = await Sampling.find();
        const traceabilities = await Traceability.find();
        const mantePila = await MantePila.find();
        // Filtrar los samplings que no tienen correspondencia en traceabilities
        const samplings = sampling.filter((s) => {
            return traceabilities.every((t) => (t.sampling_id.toString() !== s._id.toString()));
        });

        // Crear una nueva variable con las muestras aprobadas
        const approvedSamplings = samplings.filter((s) => s.approval === 'Si');


        // Crear una variable con las muestras cuyas pilas tienen cantidad mayor a cero
        const muestrasConPilasllenas = [];

        approvedSamplings.forEach((s) => {
            const numPila = s.currentStack;
            const pila = mantePila.find((p) => p.numPila === numPila);

            if (pila && pila.cantidad > 0) {
                muestrasConPilasllenas.push({
                    muestra: s,
                    numLote: pila.numLote
                });
            }
        });


        console.log(approvedSamplings)
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                muestrasConPilasllenas
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const samplingPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, currentStack, amount, averageWeight, approval, employee, observation } = req.body;

        //Se crea una nueva Entryalebines con los campos anteriores
        const post = new Sampling({ date, currentStack, amount, averageWeight, approval, employee, observation });
        //Registro en la base de datos
        await post.save();

        //Retornamos el resultado de la llamada   
        return res.json({ ok: 200, "msg": "Se registro exitosamente", post });

    }
    catch (err) {
        console.log(err);
        return res.json({ ok: 400, "msg": "Error al registrar" });
        throw new Error('Error en el metodo POST');
    }
}

const samplingPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const resto = req.body;

        const updated = await Sampling.findByIdAndUpdate(id, resto);

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



const samplingDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params

        const samplingWithTreacebility = await Traceability.findOne({ sampling_id: id })
        if (samplingWithTreacebility) {
            return res.status(404).json({ error: "No se puede eliminar, porque posee una trazabilidad" });
        }

        const DELETE = await Sampling.findByIdAndDelete(id)


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
    samplingGET,
    samplingTracebilityGET,
    samplingPOST,
    samplingPUT,
    samplingDELETE
};
