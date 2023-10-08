const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    productsGET,
    productsPOST,
    productsPUT,
    productsDELETE,
    discountProductsPUT,
    incrementProductsPUT
} = require('../controllers/products');

const router = Router();

router.get('/',ValidateJWT, productsGET);

router.post('/',[ValidateJWT,
    check('lastPrice', 'El ultimo precio es obligatorio').not().isEmpty(),
    check('actualPrice', 'El precio actual es obligatorio').not().isEmpty(),
    check('averagePrice', 'El precio promedio es obligatorio').not().isEmpty(),
    check('amount', 'La cantidad es obligatoria').not().isEmpty(),
    check('products.*.date', 'La fecha de compra es obligatoria').not().isEmpty(),
    check('products.*.provider', 'El proveedor es obligatorio').not().isEmpty(),
    check('products.*.product', 'El producto es obligatorio').not().isEmpty(),
    check('products.*.brandProduct', 'La marca del producto es obligatoria').not().isEmpty(),
    check('products.*.amountIncome', 'La cantidad es obligatoria').not().isEmpty().isNumeric(),
    check('products.*.unity', 'La unidad es obligatoria').not().isEmpty(),
    check('products.*.expiration', 'La fecha de vencimeinto es obligatoria').not().isEmpty(),
    check('products.*.price', 'El precio es obligatorio').not().isEmpty().isNumeric(),
    check('products.*.state', 'El estado es obligatorio').not().isEmpty(),
       validate_Errors
], productsPOST);

router.put('/:inventoryId/:productId', ValidateJWT, productsPUT);

router.put('/discount/:inventoryId/:productId', ValidateJWT, discountProductsPUT);

router.put('/increment/:inventoryId/:productId', ValidateJWT, incrementProductsPUT);

router.delete('/:inventoryId', [ValidateJWT, RequiereRole(Roles.admin)], productsDELETE);
module.exports = router;
