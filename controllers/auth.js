const {response} = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require("../helpers/generar-jwt");

const authPOST = async (req, res=response)=> {
    const {correo, password} = req.body;

    try {

        if (!correo || !password){
            throw new Error(`El email/password no es valido -> empty`);
        }
        
        const usuarioBBDD = await Usuario.findOne({correo:`${correo}`});
        if (!usuarioBBDD){
            throw new Error(`El email/password no es valido -> not found correo`);
        }
    
        if (usuarioBBDD.estado === false){
            throw new Error(`El email/password no es valido -> estado`);
        }
    
        
        if (!bcrypt.compareSync(password, usuarioBBDD.password)){
            throw new Error(`El email/password no es valido -> password`);
        }
    
        const token = await generarJWT(usuarioBBDD._id);

        res.status(200).json({
            usuarioBBDD, token
         });
    } catch (error) {
        console.log(`Error autenticando al usuario con correo ${correo}`, error);
        res.status(400).json({
            errors: [{
                value: "",
                msg: `${error}`,
                param: "",
                location: "body"
             }]
         });
    }
}   


module.exports = {
    authPOST
}