//Necesitamos recuperar un Schema y un modelo de Moongose
const {Schema,model}=require('mongoose');

const SchemaProvider= new Schema({

typeProvider:{ type:String,
    required:[true,'El tipo de proveedor es un campo requerido'],
},

nameProvider:{type:String,
    required:[true,'El nombre del proveedor es un campo requerido'],
},

direccion:{  type:String,
    required:[true,'La direccion del proveedor es un campo requerido'],
},

provincia:{ type:String,
    required:[true,'La provincia del proveedor es un campo requerido'],
},

canton:{ type:String,
    required:[true,'El canton del proveedor es un campo requerido'],
},

distrito:{ type:String,
    required:[true,'El distrito del proveedor es un campo requerido'],
},

fullName:{type:String,
    required:[true,'El nombre completo del proveedor es un campo requerido'],
},

typeIdentification:{type:String,
    required:[true,'El tipo de cedula del proveedor es un campo requerido'],
},

identification:{type:String,
    required:[true,'La cedula del proveedor es un campo requerido'],
},

telephone:{type:String,
    required:[true,'El telefono del proveedor es un campo requerido'],
},

email:{type:String,
    required:[true,'El email de cedula del proveedor es un campo requerido'],
},

});
//Creamos un metodo sobre escrito para devolver el proveedor pero con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaProvider.methods.toJSON = function() {
    const { __v: version, ...providerData } = this.toObject();
    return providerData;
  };
module.exports=model('Provider',SchemaProvider);