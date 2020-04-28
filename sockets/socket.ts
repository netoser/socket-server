// Para centralizar toda la logica de los sockets
// Tendra una gran colección de todo lo que yo quieta eschuchar o emitir

import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });
        
}
// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server )=>{
    cliente.on('mensaje',(payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
        

    });
}



