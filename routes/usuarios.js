const {Router} = require("express");
const { check } = require('express-validator');
const {usuariosGET, usuariosPOST, usuariosPUT, usuariosPATCH, usuariosDELETE} = require("../controllers/usuarios")
const {checkValidRole, checkExistId, checkValidCorreo} = require("../helpers/db-validators");

//const {checkValidationsResult,checkJWT, checkRol} = require("../middlewares");

const {checkValidationsResult} = require("../middlewares/chequear-validaciones");
const {checkJWT} = require("../middlewares/chequear-jwt");
const {checkRol} = require("../middlewares/chequear-rol");


const Usuario = require('../models/Usuario');

const router = Router();

router.get('/', checkJWT, usuariosGET);
router.post('/',
    //checkJWT, 
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('correo').isEmail().withMessage('El correo es obligatorio y debe tener un formato correcto'),
    check('correo').custom(checkValidCorreo),
    check('password').isLength({min:5}).withMessage('El password es obligatorio y debe tener al menos 5 caracteres'),
    check('rol').custom(checkValidRole),
    checkValidationsResult,
    usuariosPOST);
router.put('/:id',
    checkJWT, 
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistId),
    check('rol').custom(checkValidRole),
    checkValidationsResult,
    usuariosPUT);
router.patch('/',     
    checkJWT, 
    usuariosPATCH);
router.delete('/:id',
    checkJWT,
    checkRol('ADMIN_ROLE'), 
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistId),
    checkValidationsResult,
    usuariosDELETE);

module.exports = router;