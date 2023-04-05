const mongoose = require('mongoose');

const connectDB = async ()=>{
        
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("¡Base de datos online!")
    } catch (error) {
        console.log(error);
        throw new Error("Error al realizar la conexion a la base de datos");            
    }
}

module.exports = {
    connectDB
}