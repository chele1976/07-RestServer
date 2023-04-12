const checkValidationsResult = require("../middlewares/chequear-validaciones");
const checkJWT = require("../middlewares/chequear-jwt");
const checkRol = require("../middlewares/chequear-rol");

module.exports = {
    checkValidationsResult,
    checkJWT,
    checkRol
}