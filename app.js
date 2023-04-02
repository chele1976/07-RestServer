//Importaciones Node
//Importaciones de terceros
require("dotenv").config();
//Importaciones de la aplicacion
const Server = require("./models/Server");

const server = new Server();
server.listen();


