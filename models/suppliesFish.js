const {Schema,model}=require('mongoose');

const SchemaSuppliesFish= new Schema({
    
date:{ type:String,
    required:[true,'La fecha es un campo requerido'],
},

employee:{ type:String,
    required:[true,'El empleado es un campo requerido'],
},

numPila:{ type:Number,
    required:[true,'El número de pila es un campo requerido'],
},
product_id:{  type:String,
    required:[true,'El Id del producto es un campo requerido'],
},
inventory_id:{  type:String,
    required:[true,'El Id del inventario del producto es un campo requerido'],
},

amountProduct:{  type:Number,
    required:[true,'La cantidad de producto es un campo requerido'],
},

unity:{  type:String,
    required:[true,'La unidad de medida es un campo requerido'],
},

observacion:{ type:String,
    required:[true,'La observacion es un campo requerido'],
},

});
//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaSuppliesFish.methods.toJSON = function() {
    const { __v: version, ...suppliesfishData } = this.toObject();
    return suppliesfishData;
};

module.exports=model('SuppliesFish',SchemaSuppliesFish);