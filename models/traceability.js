const { Schema, model } = require('mongoose');

const SchemaTraceability = new Schema({

    date: {
        type: String,
        required: [true, 'La fecha es un campo requerido'],
    },
    //Pila actual
    currentStack: {
        type: Number,
        required: [true, 'La pila actual es un campo requerido'],
    },
    //Pila destino
    destinationStack: {
        type: Number,
        required: [true, 'La pila destino es un campo requerido'],
    },

    batch: {
        type: String,
        required: [true, 'El lote es un campo requerido'],
    },

    amount: {
        type: Number,
        required: [true, 'La cantidad es un campo requerido'],
    },

    typeFish: {
        type: String,
        required: [true, 'El tipo de pez es un campo requerido'],
    },

    employee: {
        type: String,
        required: [true, 'El empleado es un campo requerido'],
    },

    sampling_id: {
        unique: true,
        type: String,
        required: [true, 'El id del muestreo es un campo requerido'],
    },




});
//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaTraceability.methods.toJSON = function () {
    const { __v: version, ...TraceabilityData } = this.toObject();
    return TraceabilityData;
};
module.exports = model('Traceability', SchemaTraceability);