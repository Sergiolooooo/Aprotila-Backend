//Necesitamos recuperar un Schema y un modelo de Moongose
const {Schema,model}=require('mongoose');

const SchemaSales= new Schema({
date:{ type:String,
    required:[true,'El nombre es un campo requerido'],
},

employee_id:{ type:String,
    required:[true,'El id del empleado es un campo requerido'],
},

currentStack:{ type:Number,
    required:[true,'La pila actual es un campo requerido'],
},

weight: { type:String,
    required:[true, 'El peso es un campo requerido'],
},

amount:{type:Number,
    required:[true,'La cantidad es un campo requerido'],
},

typeProduct:{type:String,
    required:[true,'La especie de pescado es un campo requerido'],
},

price:{ type:Number,
    required:[true, 'El price es un campo requerido']
},

subTotal:{ type:Number,
    required:[true, 'El total vendido es un campo requerido']
},

total:{ type:Number,
    required:[true, 'El total vendido es un campo requerido']
},


customer:{ type:String,
    required:[true, 'El cliente es un campo requerido']
},

number:{ type:String,
    required:[true, 'El number del cliente es un campo requerido']
},

pay:{ type:String,
    required:[true, 'El metodo de pago es un campo requerido']
},

});
//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaSales.methods.toJSON = function() {
    const { __v: version, ...SalesData } = this.toObject();
    return SalesData;
  };
module.exports=model('Sales',SchemaSales);