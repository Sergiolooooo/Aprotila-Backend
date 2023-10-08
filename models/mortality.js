//Necesitamos recuperar un Schema y un modelo de Moongose
const {Schema,model}=require('mongoose');

const SchemaMortality= new Schema({
    
date:{ type:String,
    required:[true,'La fecha es un campo requerido'],
},

numPila:{ type:Number,
    required:[true,'El número de pila es un campo requerido'],
},

cantidadMuertas:{  type:Number,
    required:[true,'La cantidad es un campo requerido'],
},

employee:{ type:String,
    required:[true,'El empleado es un campo requerido'],
},

observacion:{ type:String,
    required:[true,'La observacion es un campo requerido'],
},

});
//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaMortality.methods.toJSON = function() {
    const { __v: version, ...mortalidadData } = this.toObject();
    return mortalidadData;
  };
module.exports=model('Mortalidad',SchemaMortality);