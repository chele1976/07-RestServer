const {Router} = require("express");
const { check } = require('express-validator');
const {findByColectionAndTerminoGET} = require("../controllers/busquedas")

const {checkValidationsResult} = require("../middlewares/chequear-validaciones");
const {checkJWT} = require("../middlewares/chequear-jwt");

const Usuario = require('../models/usuario');

const router = Router();

router.get('/:coleccion/:termino', checkJWT, checkValidationsResult, findByColectionAndTerminoGET);

module.exports = router;