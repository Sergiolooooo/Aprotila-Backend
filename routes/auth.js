const { Router } = require('express');
const { LoginPOST } = require('../controllers/auth');
const { check } = require('express-validator');
const { validate_Errors } = require('../middleware/validate-fields');

// const { ValidateId } = require('../middleware/validate-id');
const router = Router();

//iniciar sesion 
router.post('/login', [
    check('identification')
        .notEmpty().withMessage('El campo identification es obligatorio'),
    check('password')
        .notEmpty().withMessage('El campo password es obligatorio'),
    validate_Errors
], LoginPOST);




module.exports = router