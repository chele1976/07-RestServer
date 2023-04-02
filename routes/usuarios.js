const {Router} = require("express");
const {usuariosGET, usuariosPOST, usuariosPUT, usuariosPATCH, usuariosDELETE} = require("../controllers/usuarios")

const router = Router();

router.get('/', usuariosGET);
router.post('/', usuariosPOST);
router.put('/', usuariosPUT);
router.patch('/', usuariosPATCH);
router.delete('/', usuariosDELETE);

module.exports = router;