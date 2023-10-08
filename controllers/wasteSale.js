const { request, response } = require('express');
const Sales = require('../models/sales');
const MantePila = require('../models/mantePila');
const saleProduct = require('../models/saleProduct');
const wasteSale = require('../models/wasteSale');

const wasteSaleGET = async (req = request, res = response) => {

    try {
        const wastesale = await wasteSale.find(); // Nos va a mostrar todos los residuos de esa venta
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                wastesale

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const wasteSalePOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        
        const { date, employee_id, currentStack, weight, amount, typeProduct, price, total, customer, number, pay } = req.body;


        const fileteWaste = await Sales.findOne({ numPila: typeProduct })
        if (!fileteWaste) {
            return res.status(404).json({ error: "No se encontro el tipo producto" });
        }

        if (fileteWaste.cantidad < amount) {
            return res.status(404).json({ error: "La pila origen no contiene esa cantidad " });
        }

        const nuevaCantidad = fileteWaste.cantidad + amount;

        const updated1 = await Sales.findByIdAndUpdate(fileteWaste._id, { cantidad: nuevaCantidad });

        if (!updated1) {
            // Si el documento no se encontró, devuelve un mensaje de error
            return res.status(404).json({ error: "No existen residuos de ese filete" });
        }

        // // otro cambio
        // const cantidad = await saleProduct.findOne({ amount: amountProduct })


        // if (cantidad.amountProduct < amount) {
        //     return res.status(404).json({ error: "La cantidad no esta disponible" });
        // }

        // const nuevaCantidad = cantidad.amountProduct - amount;

        // const updatedsaleProduct = await saleProduct.findByIdAndUpdate(cantidad._id, { amountProduct: nuevaCantidad });

        // if (!updatedsaleProduct) {
        //     // Si el documento no se encontró, devuelve un mensaje de error
        //     return res.status(404).json({ error: "No existe esa cantidad de venta producto" });
        // }



        const wastesale = new wasteSale({ date, employee_id, currentStack, weight, amount, typeProduct, price, total, customer, number, pay });
        //Registro en la base de datos
        await wastesale.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                wastesale
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const wasteSalePUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const resto = req.body;

        const updated = await wasteSale.findByIdAndUpdate(id, resto);

        res.json({
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


const wasteSaleDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const DELETE = await wasteSale.findByIdAndDelete(id)

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
    wasteSaleGET,
    wasteSalePOST,
    wasteSalePUT,
    wasteSaleDELETE
}