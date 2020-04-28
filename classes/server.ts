import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http'; //Sirve como interm,ediario entre socket.io y express, 
                        //express tras bastidores lo que hace es levantar un servdiro http

import * as mySocket from '../sockets/socket';


export  default class Server {
    private static _instance: Server; //Es del mismo tipo de la calse server

    public app: express.Application;
    public port: number;

    //Sockets
    public io: socketIO.Server;
    private httpServer: http.Server; //Este es el servidor que vamos a levantar
    //Patron songleton hace privado al constructor
    // Solo propiedades y metodos de la clase van a poder crear el constructor
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app); //Mandamos la configuración que tiene app de express
        this.io = socketIO( this.httpServer );

        this.escucharSockets();

    }

    public static get instance(){
        // Si ya existe una instacia, regresa this._instance, sino crea uno nuevo
        return this._instance || ( this._instance = new this() ); // como si fuera un new Server()
    }

    private escucharSockets() {

        console.log('Escuhando conexiones - sockets');

        //Escuchar evento
        this.io.on('connection', cliente => { 
            console.log('Cliente conectado');

            // cliente.on('disconnect', () => {
            //     console.log('Cliente desconectado');
            // });
            
            // Listado de metodos de sockets.ts para escuchar o emitir

            //Mensajes
            mySocket.mensaje( cliente, this.io );

            // Desconectar
            mySocket.desconectar(cliente);
 


         });


    }

    //Patron songleton es para que solo exista una sola instacia  de mi clase server

    start( callback: Function ) {

        // this.httpServer.listen( this.port, callback ); // La función que va a llamar va a ser un callback
        
        this.httpServer.listen( this.port, callback());
    }


}