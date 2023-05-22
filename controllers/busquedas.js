const {response} = require("express");
const bcrypt = require('bcryptjs');
const {Categoria, Producto, Usuario} = require('../models');
const { isValidObjectId } = require("mongoose");

const colleccionesPermitidas = ['categorias','productos','usuarios'];


const findByColectionAndTerminoGET = async (req, res=response)=> {

    const {coleccion, termino} = req.params;

    switch (coleccion) {
        case 'categorias':
            const resultCat = await findCategoriasByTerminoGET(termino);
            
            res.status(resultCat.status).json({
                data:resultCat.data
            });
            break;
        case 'productos':
            const resultProd = await findProductosByTerminoGET(termino);
            
            res.status(resultProd.status).json({
                data:resultProd.data
            });
            break;
        case 'usuarios':
            const resultUsu = await findUsuariosByTerminoGET(termino);
            
            res.status(resultUsu.status).json({
                data:resultUsu.data
            });
            break;
            
        default:
            return res.status(400).json({
                errors: [{
                    value: "",
                    msg: `La coleccion  ${coleccion} no es una coleccion permitida (${colleccionesPermitidas})`,
                    param: "",
                    location: "body"
                 }]
    
            });
            
            break;
    }
};

const findCategoriasByTerminoGET = async (termino)=> {

    if (isValidObjectId(termino)){
        const categoria = await Categoria.findById(termino);
        
        if (categoria){
            return{
                status: 200,
                data: [categoria]
            }
        }

        return {
                status: 404,
                data: {
                    value: "",
                    msg: `El id  ${termino} no existe para la coleccion`,
                    param: "",
                    location: "body"
                }
        }
    }


    const regext = new RegExp(termino, "i");

    const categorias = await Categoria.find({nombre: regext});
    return{
        status: 200,
        data: categorias
    }


};

const findProductosByTerminoGET = async (termino)=> {

    if (isValidObjectId(termino)){
        const producto = await Producto.findById(termino);
        
        if (producto){
            return{
                status: 200,
                data: [producto]
            }
        }

        return {
                status: 404,
                data: {
                    value: "",
                    msg: `El id  ${termino} no existe para la coleccion`,
                    param: "",
                    location: "body"
                }
        }
    }


    const regext = new RegExp(termino, "i");

    const productos = await Producto.find({nombre: regext}).populate('categoria','nombre');
    return{
        status: 200,
        data: productos
    }
};

const findUsuariosByTerminoGET = async (termino)=> {

    if (isValidObjectId(termino)){
        const usuario = await Usuario.findById(termino);
        
        if (usuario){
            return{
                status: 200,
                data: [usuario]
            }
        }

        return {
                status: 404,
                data: {
                    value: "",
                    msg: `El id  ${termino} no existe para la coleccion`,
                    param: "",
                    location: "body"
                }
        }
    }

    const regext = new RegExp(termino, "i");

    const usuarios = await Usuario.find({$or:[{nombre: regext},{correo: regext}]});
    return{
        status: 200,
        data: usuarios
    }


};


module.exports = {
    findByColectionAndTerminoGET
}