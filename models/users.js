//Necesitamos recuperar un Schema y un modelo de Moongose
const {Schema,model}=require('mongoose');

const SchemaUsers= new Schema({
name:{
    type:String,
    required:[true,'El nombre es un campo requerido'],
},

identification:{
    type:String,
    required:[true,'La cedula es un campo requerido'],
  
},

password:{
    type:String,
    required:[true,'La contraseña es un campo requerido'],
  
},

telephone:{
    type:String,
    required:[true,'El telefono es un campo requerido'],
  
},

rol:{
    type:String,
    required:[true,'El rol es un campo requerido'],
},



});


//Creamos un metodo sobre escrito para devolver el usuario pero
//con menos valores de los que se necesita para comprobar que lo
//registramos 
SchemaUsers.methods.toJSON=function(){
    const{__v, password,...user}=this.toObject();
    return user
}
module.exports=model('Users',SchemaUsers);