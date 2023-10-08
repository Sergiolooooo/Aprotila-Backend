const { Schema, model } = require('mongoose');

const SchemasaleProduct = new Schema({
    date: {
        type: String,
        required: [true, 'La fecha es un campo requerido'],
    },

    typeProduct: {
        type: String,
        required: [true, 'El tipo producto es un campo requerido'],
    },

    amountProduct: {
        type: Number,
        required: [true, 'La cantidad es un campo requerido'],
    },

    observation: {
        type: String,
        required: [true, 'La observacion es un campo requerido'],
    },
    
    
});

//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemasaleProduct.methods.toJSON = function() {
    const { __v: version, ...SaleProductData } = this.toObject();
    return SaleProductData;
  };
module.exports=model('SaleProduct',SchemasaleProduct);