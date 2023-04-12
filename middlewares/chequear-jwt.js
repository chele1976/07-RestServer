const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const Usuario = require('../models/Usuario');


const checkJWT = async (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = req.header("x-token");

    try {
      const {uid} = jwt.verify(token, process.env.JWTSECRETKEY);
      
      const usuarioAutenticado = await Usuario.findById({_id:uid});

      req.usuario = usuarioAutenticado;

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        errors: [{
            value: "",
            msg: `${error}`,
            param: "",
            location: "body"
         }]
     });
  
    }

    next();
}

module.exports = {
  checkJWT
}