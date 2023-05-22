const bcrypt = require('bcryptjs');

const {Role, Usuario, Categoria, Producto} = require("../models");

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


const checkExistUsuarioById = async (id)=>{
    const exist = await Usuario.findById(id);

    if (!exist){
        throw new Error(`El usuario con id ${id} no existe`);
    }
};

const checkExistCategoriaById = async (id)=>{
    const exist = await Categoria.findById({"_id":id});

    if (!exist){
        throw new Error(`La Categoria con id ${id} no existe`);
    }
};

const checkExistProductoById = async (id)=>{
    const exist = await Producto.findById({"_id":id});

    if (!exist){
        throw new Error(`La Categoria con id ${id} no existe`);
    }
};

module.exports = {
    checkValidCorreo,
    checkExistCategoriaById,
    checkExistProductoById,
    checkValidRole,
    checkExistUsuarioById

}