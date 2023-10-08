const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    suppliesfishGET,
    suppliesfishPOST,
    suppliesfishPUT,
    suppliesfishDELETE
} = require('../controllers/suppliesFish');

const router = Router();

router.get('/',ValidateJWT, suppliesfishGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha y hora es obligatorio').not().isEmpty(),
       check('employee', 'El encargado es obligatorio').not().isEmpty(),
       check('numPila', 'El numero de pila es obligatorio').notEmpty(),
       check('product_id', 'El id del producto es obligatorio').not().isEmpty(),
       check('inventory_id', 'El id del inventario del producto es obligatorio').not().isEmpty(),
       check('amountProduct', 'La cantidad de alimento es obligatorio').not().isEmpty(),
       check('unity', 'La unidad de medida es obligatorio').not().isEmpty(),
       check('observacion', 'La observación es obligatoria').not().isEmpty(),
       validate_Errors
], suppliesfishPOST);

router.put('/:id', ValidateJWT, suppliesfishPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], suppliesfishDELETE);

module.exports = router;
