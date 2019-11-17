import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }

    public enviarMensaje(mensaje){
        console.log("mensaje a enviar " + mensaje);
        this.socket.emit('new-message', mensaje);
    }

    public obtenerMensaje = () => {
        console.log("tratara de ejecutar la función dentro de -obtenermensaje ")
        return Observable.create((observer) =>{
            this.socket.on('new-message', (mensaje) =>{
                console.log("mensaje obtenido :");
                console.log(mensaje);
                observer.next(mensaje);
            }); 
        });
    }

}