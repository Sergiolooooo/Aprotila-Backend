const { request, response } = require('express');
const SuppliesFish = require('../models/suppliesFish');
const Inventory = require('../models/products');



const suppliesfishGET = async (req = request, res = response) => {
    try {
        const suppliesfish = await SuppliesFish.find(); // Nos va a mostrar todos los datos 
        res.status(200).json(
            {
                msg: "Mensaje desde el metodo GET",
                suppliesfish
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const suppliesfishPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, employee, numPila, product_id, inventory_id, amountProduct, unity, observacion } = req.body;

        const inventory = await Inventory.findById(inventory_id);

        if (!inventory) {
            return res.status(404).json({ error: "No se encontro el inventario" });
        }
        console.log(inventory);

        if (inventory.products[0].state === "No disponible") {
            return res.status(404).json({ error: "El producto que selecciono no esta disponible" });

        }

        //Se crea un nuevo insumo de peces con los campos anteriores
        const post = new SuppliesFish({ date, employee, numPila, product_id, inventory_id, amountProduct, unity, observacion });
        //Registro en la base de datos
        await post.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                msg: "Se registró correctamente",
                post

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const suppliesfishPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const resto = req.body;

        const updated = await SuppliesFish.findByIdAndUpdate(id, resto);

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



const suppliesfishDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const eliminar = await SuppliesFish.findByIdAndDelete(id)


        res.json(
            {
                ok: 200,
                msg: "Se eliminó correctamente",
                eliminar
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    suppliesfishGET,
    suppliesfishPOST,
    suppliesfishPUT,
    suppliesfishDELETE
};