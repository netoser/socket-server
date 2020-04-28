import { Usuario } from './usuario';


export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor(){

    }

    //agregar un usuario
    public agregar(usuario: Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    //Para actualizar el nombre del usuario a los id que no tienen nombre y solo tiene id
    public actuualizarNombre( id: string, nombre: string) {
        // si fuera una base de datos hasta podria ser más rapido con una consulta.
        for(let usuario of this.lista) {
            if( usuario.id === id ){
                usuario.nombre = nombre
                break;
            }
        }

        console.log('=====ACTUALIZANDO USUARIO=====');
        console.log(this.lista); 

    }

    //Obtenr lista de usuarios conectados
    public getLista(){
        return this.lista;
    }

    //Regresar un usuario
    public getUsuario(id: string) {
        return this.lista.find( usuario => usuario.id === id );
    }

    //Obtener usuario en una sala en particular
    public getUsuariosEnSala ( sala: string ) {
        return this.lista.filter ( usuario => {
            return usuario.sala === sala;
        });
    }

    //Borar un usuario cuando deja el chat
    public borrarUsuario( id: string) {
        const tempUsuario = this.getUsuario( id);
        this.lista = this.lista.filter ( usuario => {
            return usuario.id !== id;
        });
        // console.log(this.lista);
        return tempUsuario;
    }
}