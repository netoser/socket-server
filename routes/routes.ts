

import {Router, Request, Response} from 'express';
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



    rest.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
        //mensaje: 'POST - Listo!!'
    });

});

router.post('/mensajes/:id', (req:Request, rest: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;


    rest.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});

export default router;