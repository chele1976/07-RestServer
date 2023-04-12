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

        this.app.use("/api/auth", require("../routes/auth"))
        this.app.use("/api/usuarios", require("../routes/usuarios"))
    }

    listen = ()=>{
        this.app.listen(this.port, ()=>{
            console.log("Server listening on port", this.port);
        });
    }

}

module.exports = Server;