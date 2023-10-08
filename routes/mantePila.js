const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors } = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const {
    mantePilaGET,
    mantePilaPOST,
    mantePilaPUT,
    mantePilaDELETE
} = require('../controllers/mantePila');

const router = Router();

router.get('/', ValidateJWT, mantePilaGET);
router.post('/', [ValidateJWT,
    check('numPila', 'El numero de pila es obligatorio').notEmpty(),
    check('observacion', 'La observación es obligatoria').notEmpty(),
    validate_Errors
], mantePilaPOST);

router.put('/:id', ValidateJWT, mantePilaPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], mantePilaDELETE);

module.exports = router;
