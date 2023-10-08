const {validationResult } = require('express-validator');
const {request,response} = require('express');
const Users=require('../models/users');
const validate_Errors=async(req=request,res=response,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        msg:'Error en los campos ,verificar ', 
        data: errors.array() });
    }
    next();
}

//Sirve para validar la identificacion
const Validate_Identificacion=async(value)=>{
    return await  Users.exists({'identification':value}).then(user => {
      if (user) {
        return Promise.reject('La Identificacion ya existe ');
      }else{
        return Promise.resolve('La Identificacion esta li')
      }
    });
  }
  


module.exports={
    validate_Errors,
    Validate_Identificacion
}