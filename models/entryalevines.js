//Necesitamos recuperar un Schema y un modelo de Moongose
const {Schema,model}=require('mongoose');

const SchemaEntryalevines= new Schema({
date:{ type:String,
    required:[true,'El nombre es un campo requerido'],
},

provider:{type:String,
    required:[true,'El proveedor es un campo requerido'],
},

loteProvider:{  type:String,
    required:[true,'El lote del proveedor es un campo requerido'],
},
batch:{  type:String,
    required:[true,'El lote es un campo requerido'],
},
pilaProvider:{ type:Number,
    required:[true,'La pila del proveedor es un campo requerido'],
},

employee_id:{ type:String,
    required:[true,'El id del empleado es un campo requerido'],
},

pilaEntry:{ type:Number,
    required:[true,'La pila de ingreso es un campo requerido'],
},

typeFish:{type:String,
    required:[true,'La especie de pescado es un campo requerido'],
},

cantidad:{type:Number,
    required:[true,'La cantidad es un campo requerido'],
},
});
//Creamos un metodo sobre escrito para devolver el usuario pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaEntryalevines.methods.toJSON = function() {
    const { __v: version, ...entryalevinesData } = this.toObject();
    return entryalevinesData;
  };
module.exports=model('Entryalevines',SchemaEntryalevines);