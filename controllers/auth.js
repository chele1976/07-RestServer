const {response} = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require("../helpers/generar-jwt");
const {googleVerify} = require("../helpers/google-validator");

const login = async (req, res=response)=> {
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

const loginWithGoogle = async (req, res=response)=> {
    const {id_token} = req.body;
    
    try {
        const userData = await googleVerify(id_token);

        const usuarioBBDD = await Usuario.findOne({correo:`${userData.correo}`});
        if (!usuarioBBDD){
            throw new Error(`El usuario no esta dado de alta en la aplicacion`);
        }
         
        if (usuarioBBDD.estado === false){
            throw new Error(`El usuario esta desactivado`);
        }

        if (!usuarioBBDD.google){
            const {modifiedCount} = await Usuario.updateOne({_id:`${usuarioBBDD._id}`}, {google:true});
            console.log("Usuario google=true", usuarioBBDD.correo, modifiedCount);
        }
        const token = await generarJWT(usuarioBBDD._id);

        res.status(200).json({
            usuarioBBDD, token
         });
    } catch (error) {
        console.log(`Error chequeando el id_token`, error);
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
    login,
    loginWithGoogle
}