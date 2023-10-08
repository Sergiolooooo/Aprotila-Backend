//Necesitamos recuperar un Schema y un modelo de Moongose
const {Schema,model}=require('mongoose');

const SchemaSampling= new Schema({
    
date: {type: String,
    required: [true, 'La fecha es un campo requerido'],
},
    //Pila actual
currentStack:{ type:Number,
    required:[true,'La pila actual es un campo requerido'],
},

amount: { type:Number,
    required:[true, 'La cantidad es un campo requerido'],
},

//Peso promedio
averageWeight:{ type:String,
    required:[true,'La pila destino es un campo requerido'],
},

approval:{ type:String,
    required:[true, 'La aprobación es un campo requerido'],
},

employee:{ type:String,
    required:[true,'El empleado es un campo requerido'],
},

observation:{ type:String,
    required:[true, 'La observación es un campo requerido'],
}

});
//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaSampling.methods.toJSON = function() {
    const { __v: version, ...SamplingData } = this.toObject();
    return SamplingData;
  };
module.exports=model('Sampling',SchemaSampling);