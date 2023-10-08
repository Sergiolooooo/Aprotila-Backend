const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    samplingGET,
    samplingTracebilityGET,
    samplingPOST,
    samplingPUT,
    samplingDELETE
} = require('../controllers/sampling');

const router = Router();

router.get('/',ValidateJWT, samplingGET);
router.get('/samplingTracebilityGET/',ValidateJWT, samplingTracebilityGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha y hora es obligatorio').not().isEmpty(),
       check('currentStack', 'La pila actual es un campo requerido').not().isEmpty().isNumeric(),
       check('amount', 'La cantidad es un campo requerido').not().isEmpty().isNumeric(),
       check('averageWeight', 'El peso promedio es un campo requerido').not().isEmpty(),
       check('approval', 'La aprobación es un campo requerido').not().isEmpty(),
       check('employee', 'El empleado es un campo requerido').not().isEmpty(),
       check('observation', 'La observación es un campo requerido').not().isEmpty(),
       validate_Errors
], samplingPOST);

router.put('/:id', ValidateJWT, samplingPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], samplingDELETE);

module.exports = router;