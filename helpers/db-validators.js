const bcrypt = require('bcryptjs');

const Role = require("../models/Role");
const Usuario = require("../models/Usuario");

const checkValidRole = async (rol = "")=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no es un rol valido`);
    }
};

const checkValidCorreo = async (correo = "")=>{
    const isUsuario = await Usuario.findOne({correo});

    if (isUsuario){
        throw new Error(`El email ${correo} ya esta registrado`);
    }
};


const checkExistId = async (id)=>{
    const isUsuario = await Usuario.findById(id);

    if (!isUsuario){
        throw new Error(`El usuario con id ${id} no existe`);
    }
};

module.exports = {
    checkValidRole,
    checkValidCorreo,
    checkExistId
}