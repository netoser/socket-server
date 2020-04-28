

//Configuración basica de un usuario del lado del servidor
export class Usuario {

    public id: string; //id del socket que se esta conecatdo, simepre debe de existir, es obligatoria
    public nombre: string;
    public sala: string;

    constructor( id: string ) {
        
        this.id=id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';

    }

}