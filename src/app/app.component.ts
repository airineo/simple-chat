import { Component, OnInit} from '@angular/core';

import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-simple19';
  mensaje : string;
  mensajes: string[] = [];

  constructor(private chatService: ChatService) { }

  enviarMensaje(){
     this.chatService.enviarMensaje(this.mensaje);

     this.mensaje = "";
  }
  
  ngOnInit(){
      console.log("ejecutando init de component...");
      this.chatService.obtenerMensaje().subscribe((mensaje : string) =>{
          console.log("mensaje a agregar : "+ mensaje);
          this.mensajes.push(mensaje);
      });
  }

}
