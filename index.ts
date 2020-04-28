import Server from './classes/server';
import { SERVER_PORT } from './global/environment';
// import { router } from './routes/routes'; //Esto se podría asi (con las {}) si quisieramos ecporta mas cosas del routes
import router from './routes/routes';

import bodyParser from 'body-parser';

import cors from 'cors';

// const server = new Server();
const server = Server.instance;


// BodyParser
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );
//Para saber mas del BodyParser en la pagina del paquete

//Habilitar CORS
server.app.use( cors({origin: true, credentials: true }) );

//Rutas de servicios
server.app.use('/', router)

server.start ( () => {
    console.log(`Servidor corriendo por el puerto ${SERVER_PORT}`);
});