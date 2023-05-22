const {response} = require("express");
const bcrypt = require('bcryptjs');
const {Producto} = require('../models');

const productosGET = async (req, res=response)=> {

    const {skip=0, limit=10} = req.query;
    const query = {estado:true};
    
    const [total, productos] = await Promise.all(
        [Producto.find(query).count(), Producto.find(query).populate('usuario','nombre').populate('categoria','nombren').skip(Number(skip)).limit(Number(limit))]
    );

    return res.status(200).json({
        total,
        productos
    });
}

const productosGETById = async (req, res=response)=> {

    const {id} = req.params;
    console.log("Id: ", id);
    
    const producto = await Producto.findById(id);

    return res.status(200).json({
        producto
    });
}


const productosPOST = async (req, res=response)=> {

    const {nombre, estado, usuario, precio, categoria, descripcion} = req.body;
    const producto = new Producto({nombre, estado, usuario, precio, categoria, descripcion});

    try {
         await producto.save();
         res.status(201).json({
            producto
         });
    } catch (error) {
        console.log(`Error registrando la categoria ${producto.nombre}`, error);
        res.status(500).json({
            errors: [{
                value: "",
                msg: `El poducto  ${producto.nombre} no ha sido registrado`,
                param: "",
                location: "body"
             }]
         });
    }
}   

const productosPUT = async (req, res=response)=> {

    const {id} = req.params;
    const {estado, usuario, categoria, ...productoUpdate} = req.body;
    const {modifiedCount} = await Producto.updateOne({_id:id}, productoUpdate);
    try {
        res.status(200).json({
            modifiedCount
         });
    } catch (error) {
        res.status(500).json({
            errors: [{
                value: "",
                msg: `El poducto  ${producto.nombre} no ha sido registrado`,
                param: "",
                location: "body"
             }]
         });
    }
}   

const productosDELETE = async (req, res=response)=> {

    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate({_id:id}, {estado:false});

    res.status(200).json({
        producto
    });
}   

module.exports = {
    productosGET,
    productosGETById,
    productosPOST,
    productosPUT,
    productosDELETE
}