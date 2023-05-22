const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');

const checkRol = (role)=>{

  return (req, res, next)=>{

    if (role !== req.usuario.rol){
      return res.status(401).json({
          errors: [{
              value: "",
              msg: `El usuario no tiene un rol permitido para realiar la operacion`,
              param: "",
              location: "body"
           }]
       });
    }
    
    next();
  }

}

module.exports = {
  checkRol
}