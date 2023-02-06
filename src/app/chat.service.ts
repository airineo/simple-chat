import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;    
    public user : string;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message){
        this.socket.emit('new-message', message);
    }

    public getMessage = () => {
        return Observable.create((observer) =>{
           
            this.socket.on('new-message', (message) =>{
               
                var a:Array<string>;
                var msg = "";
                a = message.split(":");
                
                msg = (a[2] == this.socket.id ? "You" : a[0] ) + ": " + a[1]; 
                observer.next(msg);
               
            }); 

            this.socket.on('user joined', (data) => {
                this.user = data.username;
            });
        });
    }
    public setUser(user){
        this.socket.emit('add user', user);
    }

}