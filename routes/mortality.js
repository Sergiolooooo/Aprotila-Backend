const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    mortalidadGET,
    mortalidadPOST,
    mortalidadPUT,
    mortalidadDELETE
} = require('../controllers/mortality');

const router = Router();

router.get('/',ValidateJWT, mortalidadGET);
router.post('/',[ValidateJWT,
       check('date', 'La fecha y hora es obligatorio').not().isEmpty(),
       check('numPila', 'El numero de pila es obligatorio').notEmpty(),
       check('cantidadMuertas', 'La cantidad de tilapias muertas es obligatorio').not().isEmpty(),
       check('employee', 'El empleado es obligatorio').not().isEmpty(),
       check('observacion', 'La observación es obligatoria').not().isEmpty(),
       validate_Errors
], mortalidadPOST);

router.put('/:id', ValidateJWT, mortalidadPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], mortalidadDELETE);

module.exports = router;
