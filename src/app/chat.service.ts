import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;    
    public usuario : string;

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
            console.log(observer);
            
            this.socket.on('new-message', (mensaje) =>{
                console.log("mensaje obtenido :");
                console.log(mensaje);
                observer.next(mensaje);
            }); 

            this.socket.on('user joined', (data) => {
                console.log(data.username + ' joined');
                this.usuario = data.username;
            });
        });
    }
    public establecerUsuario(usuario){
        console.log(usuario);
        this.socket.emit('add user', usuario);
    }

}