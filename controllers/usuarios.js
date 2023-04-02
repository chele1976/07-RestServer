const {response} = require("express")

const usuariosGET = (req, res=response)=> {
    res.status(200).json({
        ok:true,
        message:'GET Success!'
    });
}

const usuariosPOST = (req, res=response)=> {
    res.status(201).json({
        ok:true,
        message:'POST Success!'
    });
}   

const usuariosPUT = (req, res=response)=> {
    res.status(200).json({
        ok:true,
        message:'PUT Success!'
    });
}   

const usuariosPATCH = (req, res=response)=> {
    res.status(200).json({
        ok:true,
        message:'PATCH Success!'
    });
}   

const usuariosDELETE = (req, res=response)=> {
    res.status(200).json({
        ok:true,
        message:'DELETE Success!'
    });
}   

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}