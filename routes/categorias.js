const {Router, response} = require("express");
const { check } = require('express-validator');
const {categoriasGET, categoriasGETById, categoriasPOST, categoriasPUT, categoriasDELETE} = require("../controllers/categorias")
const {checkExistCategoriaById} = require("../helpers/db-validators");
const {checkValidationsResult} = require("../middlewares/chequear-validaciones");
const {checkJWT} = require("../middlewares/chequear-jwt");

const router = Router();

router.get('/', checkJWT,checkValidationsResult, categoriasGET);

router.get('/:id', 
    checkJWT, 
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistCategoriaById), 
    checkValidationsResult,
    categoriasGETById
);

router.post('/', 
    checkJWT,
    checkValidationsResult,
    categoriasPOST
);

router.put('/:id', 
    checkJWT,
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistCategoriaById), 
    checkValidationsResult,
    categoriasPUT
);
router.delete('/:id',
    checkJWT,
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistCategoriaById), 
    checkValidationsResult, 
    categoriasDELETE
);

module.exports = router;