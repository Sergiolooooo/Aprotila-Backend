const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    alevinesGET,
    alevinesPOST,
    alevinesPUT,
    alevinesDELETE
} = require('../controllers/entryalevines');

const router = Router();

router.get('/',ValidateJWT, alevinesGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha y hora es obligatorio').not().isEmpty(),
       check('provider', 'El proveedor es obligatorio').notEmpty(),
       check('loteProvider', 'El lote del proveedor es obligatorio').not().isEmpty(),
       check('batch', 'El lote es obligatorio').not().isEmpty(),
       check('pilaProvider', 'La pila del proveedor es obligatorio').not().isEmpty().isNumeric(),
       check('employee_id', 'El id empleado es obligatorio').not().isEmpty(),
       check('pilaEntry', 'La pila de entrada es obligatoria').not().isEmpty().isNumeric(),
       check('typeFish', 'El tipo de alebin es obligatorio').not().isEmpty(),
       check('cantidad', 'La cantidad de alebines obligatoria').not().isEmpty(),
       validate_Errors
], alevinesPOST);

router.put('/:id', ValidateJWT, alevinesPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], alevinesDELETE);

module.exports = router;
