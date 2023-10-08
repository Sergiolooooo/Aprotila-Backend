const { request, response } = require('express');
const Sales = require('../models/sales');
const MantePila = require('../models/mantePila');
const saleProduct = require('../models/saleProduct');


const salesGET = async (req = request, res = response) => {

    try {
        const sales = await Sales.find(); // Nos va a mostrar todos los ingresos de alebines
        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                sales

            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const salesPOST = async (req = request, res = response) => {

    try {
        const body = req.body;

        //Desestructuramos lo que viene en el body
        const { date, employee_id, currentStack, weight, amount, typeProduct, price, subTotal, total, customer, number, pay } = req.body;


        const pilaOrigen = await MantePila.findOne({ numPila: currentStack })
        if (!pilaOrigen) {
            return res.status(404).json({ error: "No se encontro la pila origen" });
        }

        if (pilaOrigen.cantidad < amount) {
            return res.status(404).json({ error: "La pila origen no contiene esa cantidad " });
        }

        const nuevaCantidadOrigen = pilaOrigen.cantidad - amount;

        const updated1 = await MantePila.findByIdAndUpdate(pilaOrigen._id, { cantidad: nuevaCantidadOrigen });

        if (!updated1) {
            // Si el documento no se encontró, devuelve un mensaje de error
            return res.status(404).json({ error: "No existe la pila." });
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



        //Se crea una nueva Entryalebines con los campos anteriores
        const sales = new Sales({ date, employee_id, currentStack, weight, amount, typeProduct, price, subTotal, total, customer, number, pay });
        //Registro en la base de datos
        await sales.save();

        //Retornamos el resultado de la llamada   
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                sales
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const salesPUT = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const resto = req.body;

        const updated = await Sales.findByIdAndUpdate(id, resto);

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


const salesDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const DELETE = await Sales.findByIdAndDelete(id)

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
    salesGET,
    salesPOST,
    salesPUT,
    salesDELETE
}