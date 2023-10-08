const { request, response } = require('express');
const Mortalidad = require('../models/mortality');
const Pila = require('../models/mantePila');



const mortalidadGET = async (req = request, res = response) => {

    try {
        const mortalidad = await Mortalidad.find(); // Nos va a mostrar todos los datos de mortalidad
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                mortalidad
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const mortalidadPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, numPila, cantidadMuertas, employee, observacion } = req.body;

        const pilaMortalidad = await Pila.findOne({ numPila: numPila})
        if (!pilaMortalidad) { 
            return res.status(404).json({ error: "No se encontro la pila" });
        }

        if ((pilaMortalidad.cantidad - cantidadMuertas) < 0) { 
            return res.status(404).json({ error: "La pila debe contener esa cantidad de peces actualmente" });
        }

        await Pila.findByIdAndUpdate(pilaMortalidad._id, {cantidad: (pilaMortalidad.cantidad - cantidadMuertas) });

        //Se crea una nueva Mortalidad con los campos anteriores
        const dead = new Mortalidad ({ date, numPila, cantidadMuertas, employee, observacion });
        //Registro en la base de datos
        await dead.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Se registro exitosamente",
                dead
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const mortalidadPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await Mortalidad.findByIdAndUpdate(id, resto);
  
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
  
  

const mortalidadDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const muerto = await Mortalidad.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                muerto
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    mortalidadGET,
    mortalidadPOST,
    mortalidadPUT,
    mortalidadDELETE
};