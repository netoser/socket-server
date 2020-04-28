

import {Router, Request, Response} from 'express';
import Server from '../classes/server';
// import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';
// Si quisieramos exportar más cosas de aqui lo pondriamos asi la exportación
// export const router = Router(); //El router es el que voy a ocupar para crear mis api.endpoint  o mis servicios REST
const router = Router();
//Paht que yo quiero llamar /mensajes, obtendra esta información, 
//Luego viene el Handler, en pocas palabras es la ficnión que va a manejr esta petición
//Con esto ya tengo creado todo mi primer servicio, ya tengo un EdnPoint llamado /mensajes
router.get('/mensajes', (req:Request, rest: Response) => {

    rest.json({
        ok: true,
        mensaje: 'todo esta bien!!'
    });

});

router.post('/mensajes', (req:Request, rest: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload); //Para enviar mensajes a todos


    rest.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
        //mensaje: 'POST - Listo!!'
    });

});

router.post('/mensajes/:id', (req:Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }


    const server = Server.instance; //como es un singleton es la misma instancia

    server.io.in( id ).emit('mensaje-privado', payload); // Para enviar mensaje privado


    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});



// Servicio para obtener todos los id de los usuarios
router.get('/usuarios', (req:Request, res: Response) => {
    
    const server = Server.instance;
    server.io.clients( (err: any, clientes: string[]) => {
        if( err ) {
            return res.json ( {
                ok: false,
                err
            })
        }


        res.json ({
            ok: true,
            clientes: clientes
        })

    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req:Request, res: Response) => {
    
    res.json ({
        ok: true,
        clientes: usuariosConectados.getLista()
    })

});


export default router;