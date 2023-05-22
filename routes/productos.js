const {Router, response} = require("express");
const { check } = require('express-validator');
const {productosGET, productosGETById, productosPOST, productosPUT, productosDELETE} = require("../controllers/productos")
const {checkExistProductoById} = require("../helpers/db-validators");
const {checkValidationsResult} = require("../middlewares/chequear-validaciones");
const {checkJWT} = require("../middlewares/chequear-jwt");

const router = Router();

router.get('/', checkJWT,checkValidationsResult, productosGET);

router.get('/:id', 
    checkJWT, 
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistProductoById), 
    checkValidationsResult,
    productosGETById
);

router.post('/', 
    checkJWT,
    checkValidationsResult,
    productosPOST
);

router.put('/:id', 
    checkJWT,
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistProductoById), 
    checkValidationsResult,
    productosPUT
);
router.delete('/:id',
    checkJWT,
    check('id', `El id no tiene el formato correcto`).isMongoId(),
    check('id').custom(checkExistProductoById), 
    checkValidationsResult, 
    productosDELETE
);

module.exports = router;