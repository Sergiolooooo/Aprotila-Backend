//Necesitamos recuperar un Schema y un modelo de Moongose
const { Schema, model } = require('mongoose');

const SchemaMantePila = new Schema({

    numPila: {
        type: Number,
        unique: true,
        required: [true, 'El número de pila es un campo requerido'],
    },
    numLote: {
        type: String,
    },

    cantidad: {
        type: Number,
    },
    entry_id: {
        type: String,
    },

    observacion: {
        type: String,
        required: [true, 'La observacion es un campo requerido'],
    },

});
//Creamos un metodo sobre escrito para devolver el mantenimiento de pila pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaMantePila.methods.toJSON = function () {
    const { __v: version, ...mantePilaData } = this.toObject();
    return mantePilaData;
};
module.exports = model('MantePila', SchemaMantePila);