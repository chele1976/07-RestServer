const {Router} = require("express");
const { check } = require('express-validator');

const {login, loginWithGoogle} = require("../controllers/auth")
const {checkValidationsResult} = require("../middlewares/chequear-validaciones");

const Usuario = require('../models/usuario');

const router = Router();

router.post('/login', 
    check('correo').isEmail().withMessage('El correo es obligatorio y debe tener un formato correcto'),
    check('password').isLength({min:5}).withMessage('El password es obligatorio y debe tener al menos 5 caracteres'),
    checkValidationsResult,
    login);

router.post('/google', 
    check('id_token').not().isEmpty().withMessage('El id_token es obligatorio'),
    checkValidationsResult,
    loginWithGoogle);

module.exports = router;