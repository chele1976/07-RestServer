const express = require('express');
const cors = require('cors');

const {connectDB} = require("../database/config")

class Server {

    constructor(){
        this.app = express();
        
        this.port = process.env.PORT;
        this.basePath = __dirname.replace("\models","");

        this.databaseConnection();

        this.middleware();

        this.paths = {
            auth : "/api/auth",
            busquedas: "/api/busquedas",
            categorias: "/api/categorias",
            productos: "/api/productos",
            usuarios: "/api/usuarios"
        }

        this.routes();
    }

    async databaseConnection (){
       await connectDB();        
    }

    middleware (){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    routes (){
       this.app.get('/app', (req, res)=> {
            res.sendFile(this.basePath + '/public/index.html');
        });

        this.app.use(this.paths.auth, require("../routes/auth"))
        this.app.use(this.paths.busquedas, require("../routes/busquedas"))
        this.app.use(this.paths.categorias, require("../routes/categorias"))
        this.app.use(this.paths.productos, require("../routes/productos"))
        this.app.use(this.paths.usuarios, require("../routes/usuarios"))
    }

    listen = ()=>{
        this.app.listen(this.port, ()=>{
            console.log("Server listening on port", this.port);
        });
    }

}

module.exports = Server;