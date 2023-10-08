const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    saleProductGET,
    saleProductPOST,
    saleProductPUT,
    saleProductDELETE
} = require('../controllers/saleProduct');

const router = Router();

router.get('/',ValidateJWT, saleProductGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha es obligatorio').not().isEmpty(),
       check('typeProduct', 'El tipo producto es obligatorio').not().isEmpty(),
       check('amountProduct', 'La cantidad es obligatorio').not().isEmpty(),
       check('observation', 'La observacion es obligatorio').notEmpty(),
       validate_Errors
], saleProductPOST);

router.put('/:id', ValidateJWT, saleProductPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], saleProductDELETE);

module.exports = router;