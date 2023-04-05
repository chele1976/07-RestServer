const {Router} = require("express");
const { check } = require('express-validator');
const {usuariosGET, usuariosPOST, usuariosPUT, usuariosPATCH, usuariosDELETE} = require("../controllers/usuarios")
const {checkValidRole, checkExistId, checkValidCorreo} = require("../helpers/db-validators");
const {checkValidationsResult} = require("../middlewares/chequear-validaciones");

const Usuario = require('../models/Usuario');


const router = Router();

router.get('/', usuariosGET);
router.post('/', 
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('correo').isEmail().withMessage('El correo es obligatorio y debe tener un formato correcto'),
    check('correo').custom(checkValidCorreo),
    check('password').isLength({min:5}).withMessage('El password es obligatorio y debe tener al menos 5 caracteres'),
    check('rol').custom(checkValidRole),
    checkValidationsResult,
    usuariosPOST);
router.put('/:id',
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistId),
    check('rol').custom(checkValidRole),
    checkValidationsResult,
    usuariosPUT);
router.patch('/', usuariosPATCH);
router.delete('/:id',
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistId),
    checkValidationsResult,
    usuariosDELETE);

module.exports = router;