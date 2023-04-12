const {Router} = require("express");
const { check } = require('express-validator');

const {authPOST} = require("../controllers/auth")
const {checkValidationsResult} = require("../middlewares/chequear-validaciones");

const Usuario = require('../models/Usuario');

const router = Router();

router.post('/login', 
    check('correo').isEmail().withMessage('El correo es obligatorio y debe tener un formato correcto'),
    check('password').isLength({min:5}).withMessage('El password es obligatorio y debe tener al menos 5 caracteres'),
    checkValidationsResult,
    authPOST);

module.exports = router;