const { request, response } = require('express');
const Inventory = require('../models/products');


const productsPOST = async (req = request, res = response) => {
  try {
    // Desestructuramos lo que viene en el body para el inventario
    const { lastPrice, actualPrice, averagePrice, amount, products } = req.body;

    

    // Creamos un nuevo objeto de inventario con los detalles proporcionados
    const newInventory = new Inventory({
      lastPrice,
      actualPrice,
      averagePrice,
      amount,
      products,
    });

    // Guardamos el inventario junto con los productos en la base de datos
    const inventoryWithProducts = await newInventory.save();

    // Retornamos el resultado de la llamada
    res.json({
      ok: 200,
      message: "Inventario con productos registrado correctamente",
      inventoryWithProducts,
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el metodo POST');
  }
};




const productsGET = async (req = request, res = response) => {
  try {
    // Buscar todos los inventarios en la base de datos
    const inventories = await Inventory.find();

    // Crear un array para almacenar solo los productos de todos los inventarios
    let allProducts = [];

    // Iterar a través de los inventarios y agregar los productos al array
    inventories.forEach((inventory) => {
      allProducts = allProducts.concat(inventory.products);
    });

    res.json({
      ok: true,
      message: 'Productos obtenidos correctamente',
      inventories: inventories, // Incluimos los inventarios completos en la respuesta
      products: allProducts, // Incluimos solo los productos en la respuesta
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el método GET');
  }
};



const productsDELETE = async (req = request, res = response) => {
  try {
    const { inventoryId } = req.params;

    // Buscar el inventario por su ID
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({
        error: 'El inventario no fue encontrado.',
      });
    }

    inventory.products[0].state = "No disponible"

    // cambia el estado del producto en el inventario que contiene el producto
    await inventory.save();
    res.json({
      ok: true,
      message: 'Producto eliminado del inventario correctamente, cambiando su estado',
      deletedInventory: inventory,
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el método DELETE');
  }
};


// ...

const productsPUT = async (req = request, res = response) => {
  try {
    const { inventoryId } = req.params; // Obtener el ID del inventario de los parámetros de la ruta
    const { products } = req.body; // Obtener solo los productos del cuerpo de la solicitud

    // Asegúrate de que products sea un arreglo
    if (!Array.isArray(products)) {
      return res.status(400).json({
        error: 'El campo products debe ser un arreglo de productos.',
      });
    }

    const inventory = await Inventory.findById(inventoryId);
    // Buscar el inventario por su ID
    if (!inventory) {
      return res.status(404).json({
        error: 'El inventario no fue encontrado.',
      });
    }

    // Actualizar los productos en el inventario con los nuevos datos proporcionados
    products.forEach((productData) => {
      const existingProduct = inventory.products.id(productData._id);
      if (existingProduct) {
        // Actualiza los campos del producto con los nuevos datos
        existingProduct.date = productData.date;
        existingProduct.dateLastUpdate = new Date().toISOString().slice(0, 16);
        existingProduct.provider = productData.provider;
        existingProduct.product = productData.product;
        existingProduct.brandProduct = productData.brandProduct;
        existingProduct.amountIncome = productData.amountIncome; // Mantener el valor del post
        existingProduct.unity = productData.unity;
        existingProduct.price = productData.price; // Tomar el nuevo valor del put
        existingProduct.state = productData.state;
        existingProduct.expiration = productData.expiration;
        // Calcula el nuevo precio unitario usando el valor proporcionado en el campo put y el valor del post
        existingProduct.unitPrice = (productData.price / productData.amountIncome).toFixed(2);
      }
    });

    // Guardar los cambios en el inventario
    await inventory.save();

    res.json({
      ok: true,
      message: 'Productos del inventario actualizados correctamente',
      updatedProducts: inventory.products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Error en el servidor',
    });
  }
};


// {
// "amount": 10 // Cantidad que deseas restar al producto en el inventario por put envian los 2 id
// }

// esto pues le mandan lo que quieren restar al producto que ewsta en un inventario

const discountProductsPUT = async (req = request, res = response) => {
  const { inventoryId, productId } = req.params;
  const { amount } = req.body;

  try {
    // Primero, buscas el inventario específico por su ID
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      // Si no se encuentra el inventario, puedes manejar el error aquí
      return res.status(404).json({ error: 'Inventario no encontrado.' });
    }

    if ((inventory.amount - amount) < 0) {

      return res.status(404).json({ error: 'No se encuentra esa cantidad disponible en inventario.' });
    }
    inventory.amount -= amount;


    await inventory.save();

    return res.json({ message: 'Cantidad restada exitosamente del producto en el inventario.' });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el método ResPUT');
  }

}

const incrementProductsPUT = async (req = request, res = response) => {
  const { inventoryId } = req.params;
  const { amount, actualPrice, products } = req.body;

  try {
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ error: 'Inventario no encontrado.' });
    }

    const amountInt = parseInt(amount);

    if ((inventory.amount + amountInt) < 0) {
      return res.status(404).json({ error: 'No se puede sumar esa cantidad' });
    }

    const product = inventory.products[0]; // El primer producto en el inventario

    inventory.amount += amountInt;
    product.amountIncome += amountInt; // Actualizar el amountIncome en el producto del inventario
    inventory.products[0].price = parseFloat(products[0].price); // Actualizar el precio en el producto del inventario

    if (inventory.actualPrice != actualPrice) {
      inventory.averagePrice = (inventory.actualPrice + parseFloat(actualPrice)) / 2;
      inventory.lastPrice = inventory.actualPrice;
    }
    inventory.actualPrice = parseFloat(actualPrice);
    inventory.products[0].unitPrice = parseFloat(actualPrice);

    // Guarda los cambios en la base de datos
    await inventory.save();

    return res.json({ message: 'Cantidad incrementada exitosamente del producto en el inventario.' });
  } catch (err) {
    console.log(err);
    throw new Error('Error en el método ResPUT');
    return res.status(404).json({ error: 'Error al incrementar, debe ser un número' });
  }
};

module.exports = {
  productsGET,
  productsPOST,
  productsPUT,
  productsDELETE,
  discountProductsPUT,
  incrementProductsPUT
}