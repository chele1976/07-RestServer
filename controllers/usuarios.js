const {response} = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const usuariosGET = async (req, res=response)=> {

    console.log('usuario autenticado -> ', req.usuario);

    const {skip=0, limit=10} = req.query;
    const query = {estado:true};
    
    const [total, usuarios] = await Promise.all(
        [Usuario.count(), Usuario.find(query).skip(Number(skip)).limit(Number(limit))]
    );

    return res.status(200).json({
        total,
        usuarios
    });
}

const usuariosPOST = async (req, res=response)=> {

    console.log('usuario autenticado -> ', req.usuario);

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, rol});
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    try {
         await usuario.save();
         res.status(201).json({
            usuario
         });
    } catch (error) {
        console.log(`Error registrando el usuario ${usuario.nombre}`, error);
        res.status(500).json({
            errors: [{
                value: "",
                msg: `El usuario con correo ${correo} no ha sido registrado`,
                param: "",
                location: "body"
             }]
         });
    }
}   

const usuariosPUT = async (req, res=response)=> {

    console.log('usuario autenticado -> ', req.usuario);

    const {id} = req.params;
    const {correo, password, ...usuarioUpdate} = req.body;
    const {modifiedCount} = await Usuario.updateOne({_id:id}, usuarioUpdate);
    try {
        res.status(200).json({
            modifiedCount
         });
    } catch (error) {
        res.status(500).json({
            errors: [{
                value: "",
                msg: `El usuario con id ${id} no ha sido actualizado`,
                param: "",
                location: "body"
             }]
         });
    }
}   

const usuariosPATCH = (req, res=response)=> {

    console.log('usuario autenticado -> ', req.usuario);

    res.status(200).json({
        ok:true,
        message:'DELETE Success!'
    });
}   

const usuariosDELETE = async (req, res=response)=> {

    console.log('usuario autenticado -> ', req.usuario);

    const {id} = req.params;
    //const usuario = await Usuario.findByIdAndDelete({_id:id});
    const usuario = await Usuario.findByIdAndUpdate({_id:id}, {estado:false});

    res.status(200).json({
        usuario
    });
}   

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}