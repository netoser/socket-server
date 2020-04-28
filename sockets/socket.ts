// Para centralizar toda la logica de los sockets
// Tendra una gran colección de todo lo que yo quieta eschuchar o emitir

import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {
    const usuario = new Usuario ( cliente.id );
    usuariosConectados.agregar( usuario );
}

export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        // console.log('Cliente Desconectado');
        // const usuario = new Usuario ( cliente.id );
        usuariosConectados.borrarUsuario(cliente.id);
    });
        
}
// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server )=>{
    cliente.on('mensaje',(payload: {de: string, cuerpo: string} ) => {
        // console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);

    });
}

// escuchar configurar-usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server )=>{
    cliente.on('configurar-usuario',(payload: {nombre: string}, callback: Function ) => {
        //  console.log('Configurando Usuario', payload.nombre );

        usuariosConectados.actuualizarNombre(cliente.id, payload.nombre);

        // Donde se hace el emit, ej: resp, el callback es la fucnión que regresa como resp 
        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre }, configurado` 
        })

        // io.emit('mensaje-nuevo', payload);

    });
}



