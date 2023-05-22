//Importaciones Node
//Importaciones de terceros
require("dotenv").config();
//Importaciones de la aplicacion
const {Server} = require("./models");

const server = new Server();
server.listen();


