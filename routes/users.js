const { Router } = require('express');
const { check } = require('express-validator');
const { validate_Errors, Validate_Identificacion } = require('../middleware/validate-fields')
const { RequiereRole, Roles } = require('../middleware/Validate-rolls')
const { ValidateJWT } = require('../middleware/Validate-JWT')

const { usersGET,
       usersPOST,
       usersPUT,
       usersDELETE,
       usersGETById
} = require('../controllers/users');

const router = Router();

router.get('/', [ValidateJWT, RequiereRole(Roles.admin)], usersGET);

router.get('/:id', [ValidateJWT, RequiereRole(Roles.admin,Roles.employee)], usersGETById);

router.post('/', [ValidateJWT, RequiereRole(Roles.admin),
       check('name', 'El nombre es obligatorio').not().isEmpty(),
       check('identification', 'La cedula es obligatoria').custom(Validate_Identificacion)
              .withMessage('Esta identificacion ya existe').notEmpty(),
       check('password', 'El password es obligatorio').not().isEmpty(),
       check('telephone', 'El telephone es obligatorio').not().isEmpty(),
       check('rol', 'El rol es obligatorio').not().isEmpty(),
       validate_Errors
], usersPOST);

router.put('/:id', [ValidateJWT, RequiereRole(Roles.admin)], usersPUT);

router.delete('/:id', [ValidateJWT, RequiereRole(Roles.admin)], usersDELETE);


module.exports = router;





