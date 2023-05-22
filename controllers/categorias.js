const {response} = require("express");
const bcrypt = require('bcryptjs');
const {Categoria} = require('../models');

const categoriasGET = async (req, res=response)=> {

    const {skip=0, limit=10} = req.query;
    const query = {estado:true};
    
    const [total, categorias] = await Promise.all(
        [Categoria.find(query).count(), Categoria.find(query).populate('usuario','nombre').skip(Number(skip)).limit(Number(limit))]
    );

    return res.status(200).json({
        total,
        categorias
    });
}

const categoriasGETById = async (req, res=response)=> {

    const {id} = req.params;
    console.log("Id: ", id);
    
    const categoria = await Categoria.findById(id);

    return res.status(200).json({
        categoria
    });
}


const categoriasPOST = async (req, res=response)=> {

    const {nombre, estado, usuario} = req.body;
    const categoria = new Categoria({nombre, estado, usuario});

    try {
         await categoria.save();
         res.status(201).json({
            categoria
         });
    } catch (error) {
        console.log(`Error registrando la categoria ${categoria.nombre}`, error);
        res.status(500).json({
            errors: [{
                value: "",
                msg: `La categoria  ${categoria.nombre} no ha sido registrada`,
                param: "",
                location: "body"
             }]
         });
    }
}   

const categoriasPUT = async (req, res=response)=> {

    const {id} = req.params;
    const {estado, usuario, ...categoriaUpdate} = req.body;
    const {modifiedCount} = await Categoria.updateOne({_id:id}, categoriaUpdate);
    try {
        res.status(200).json({
            modifiedCount
         });
    } catch (error) {
        res.status(500).json({
            errors: [{
                value: "",
                msg: `La categoria con id ${id} no ha sido actualizada`,
                param: "",
                location: "body"
             }]
         });
    }
}   

const categoriasDELETE = async (req, res=response)=> {

    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate({_id:id}, {estado:false});

    res.status(200).json({
        categoria
    });
}   

module.exports = {
    categoriasGET,
    categoriasGETById,
    categoriasPOST,
    categoriasPUT,
    categoriasDELETE
}