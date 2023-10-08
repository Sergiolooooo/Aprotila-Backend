const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    traceabilityGET,
    traceabilityPOST,
    traceabilityPUT,
    traceabilityDELETE
} = require('../controllers/traceability');

const router = Router();

router.get('/',ValidateJWT, traceabilityGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha y hora es obligatorio').not().isEmpty(),
       check('currentStack', 'La pila actual es un campo requerido').not().isEmpty().isNumeric(),
       check('destinationStack', 'La pila destino es un campo requerido').not().isEmpty().isNumeric(),
       check('batch', 'El lote es un campo requerido').not().isEmpty(),
       check('amount', 'La cantidad es un campo requerido').not().isEmpty().isNumeric(),
       check('typeFish', 'El tipo de pez es un campo requerido').not().isEmpty(),
       check('employee', 'El empleado es un campo requerido').not().isEmpty(),
       check('sampling_id', 'El id del muestreo es un campo requerido').not().isEmpty(),
       validate_Errors
], traceabilityPOST);

router.put('/:id', ValidateJWT, traceabilityPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], traceabilityDELETE);

module.exports = router;
