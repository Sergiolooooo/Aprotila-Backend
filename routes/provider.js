const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors} = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { 
    providerGET,
    providerPOST,
    providerPUT,
    providerDELETE
} = require('../controllers/provider');

const router = Router();

router.get('/',[ValidateJWT, RequiereRole(Roles.admin,Roles.employee)], providerGET);

router.post('/',[ValidateJWT, RequiereRole(Roles.admin,Roles.employee),
       check('typeProvider', 'El tipo de proveedor es obligatorio').not().isEmpty(),
       check('nameProvider', 'El nombre del proveedor es obligatorio').notEmpty(),
       check('direccion', 'La direccion del proveedor es obligatorio').not().isEmpty(),
       check('provincia', 'La provincia del proveedor es obligatorio').not().isEmpty(),
       check('canton', 'El canton es obligatorio').not().isEmpty(),
       check('distrito', 'El distrito es obligatorio').not().isEmpty(),
       check('fullName', 'El nombre completo del proveedor obligatorio').not().isEmpty(),
       check('typeIdentification', 'El tipo de cedula es obligatoria').not().isEmpty(),
       check('identification', 'La cedula es obligatoria').not().isEmpty(),
       check('telephone', 'El telefono es obligatorio').not().isEmpty(),
       check('email', 'El email es obligatorio').not().isEmpty(),
       validate_Errors
], providerPOST);

router.put('/:id', ValidateJWT, providerPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], providerDELETE);

module.exports = router;