const { request, response } = require('express');
const SaleProduct = require('../models/saleProduct');



const saleProductGET = async (req = request, res = response) => {

    try {
        const saleProduct = await SaleProduct.find(); // Nos va a mostrar todas las ventas de productos
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                saleProduct

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const saleProductPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        // Desestructuramos lo que viene en el body
        const { date, typeProduct, amountProduct, observation } = req.body;

        // Creamos una nueva instancia del objeto SaleProduct (asegúrate de que la clase se llama así)
        const newSaleProduct = new SaleProduct({ date, typeProduct, amountProduct, observation });
        // Registro en la base de datos
        await newSaleProduct.save();

        // Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                saleProduct: newSaleProduct
            }
        );

    } catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}


const saleProductPUT = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const resto = req.body;
  
      const updated = await SaleProduct.findByIdAndUpdate(id, resto);
  
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
  
  

const saleProductDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const DELETE = await SaleProduct.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                "msg": "Se eliminó correctamente",
                DELETE
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    saleProductGET,
    saleProductPOST,
    saleProductPUT,
    saleProductDELETE
};