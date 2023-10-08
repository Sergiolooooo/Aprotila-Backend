const { Schema, model } = require('mongoose');

const SchemaProduct = new Schema({
    date: {
        type: String,
        required: [true, 'La fecha de compra es un campo requerido'],
    },
    dateLastUpdate: {
        type: String,
    },
    provider: {
        type: String,
        required: [true, 'El proveedor es un campo requerido'],
    },

    product: {
        type: String,
        required: [true, 'El producto es un campo requerido'],
    },
    brandProduct: {
        type: String,
        required: [true, 'La marca es un campo requerido'],
    },
    amountIncome: {
        type: Number,
        required: [true, 'La cantidad es un campo requerido'],
    },

    unity: {
        type: String,
        required: [true, 'La unidad es un campo requerido'],
    },

    expiration: {
        type: String,
        required: [true, 'La fecha de vencimiento es un campo requerido'],
    },

    price: {
        type: Number,
        required: [true, 'El precio es un campo requerido'],
    },

    unitPrice: {
        type: Number,
    },
  
    state: {
        type: String,
        required: [true, 'El estado es un campo requerido'],
    },
});

const SchemaInventory = new Schema({
    lastPrice: {
        type: Number,
        required: [true, 'El último precio es un campo requerido'],
    },

    actualPrice: {
        type: Number,
        required: [true, 'El precio actual es un campo requerido'],
    },

    averagePrice: {
        type: Number,
        required: [true, 'El precio promedio es un campo requerido'],
    },

    amount: {
        type: Number,
        required: [true, 'La cantidad es un campo requerido'],
    },
    
    products: [SchemaProduct], // Usando el esquema de producto como sub-esquema
});

// Eliminar el campo versión (__v) y devolver solo los datos del producto
SchemaProduct.methods.toJSON = function () {
    const { __v: version, ...dataProduct } = this.toObject();
    return dataProduct;
};

const InventoryData = model('Inventory', SchemaInventory);

module.exports = InventoryData;
