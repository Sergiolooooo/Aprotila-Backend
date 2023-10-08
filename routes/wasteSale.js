const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    wasteSaleGET,
    wasteSalePOST,
    wasteSalePUT,
    wasteSaleDELETE
} = require('../controllers/wasteSale');

const router = Router();

router.get('/',ValidateJWT, wasteSaleGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha y hora es obligatorio').not().isEmpty(),
       check('employee_id', 'El empleado es obligatorio').not().isEmpty(),
       check('currentStack', 'La pila actual es obligatoria').not().isEmpty().isNumeric(),
       check('weight', 'El peso es obligatorio').not().isEmpty(),
       check('amount', 'La cantidad es obligatorio').not().isEmpty().isNumeric(),
       check('typeProduct', 'El tipo de pez es obligatorio').not().isEmpty(),
       check('price', 'El precio es obligatoria').not().isEmpty().isNumeric(),
       check('total', 'El total es obligatorio').not().isEmpty().isNumeric(),
       check('customer', 'El cliente es obligatoria').not().isEmpty(),
       check('number', 'El numero del cliente obligatorio').not().isEmpty(),
       check('pay', 'El metodo de pago obligatorio').not().isEmpty(),
       validate_Errors
], wasteSalePOST);

router.put('/:id', ValidateJWT, wasteSalePUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], wasteSaleDELETE);

module.exports = router;
