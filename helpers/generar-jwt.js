const jwt = require("jsonwebtoken");

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject)=>{
        const payload = {uid};

        jwt.sign(payload, process.env.JWTSECRETKEY,{ expiresIn: '1h' },(error, token)=>{
            if (error){
                console.log("Error generando el token", error);
                reject("Error en la generacion del token");
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}