const { request, response } = require('express');
const Provider = require('../models/provider');



const providerGET = async (req = request, res = response) => {

    try {
        const provider = await Provider.find(); // Nos va a mostrar todos los ingresos de proveedores
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                provider,
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const providerPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { typeProvider, nameProvider, direccion, provincia, canton, distrito, fullName, typeIdentification, identification, telephone, email } = req.body;

        //Se crea un nuevo proveedor con los campos anteriores
        const proveedor = new Provider ({typeProvider, nameProvider, direccion, provincia, canton, distrito, fullName,typeIdentification, identification, telephone, email });
        //Registro en la base de datos
        await proveedor.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                proveedor

            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const providerPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await Provider.findByIdAndUpdate(id, resto);
  
      res.json(
      {
        ok: 200,
        msg: "Formulario actualizado correctamente",
        updated
      }
      );
  
    } catch (err) {
      console.log(err);
      throw new Error('Error en el método PUT');
    }
  };
  
  

const providerDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const prove = await Provider.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                prove
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    providerGET,
    providerPOST,
    providerPUT,
    providerDELETE
};