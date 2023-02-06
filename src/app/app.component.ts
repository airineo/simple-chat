import { Component, OnInit} from '@angular/core';

import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'notification-test';
  message : string;
  messages: string[] = [];
  userName : string;
  isAddedUser : boolean = false;
  sessionSocketUser : string;

  constructor(private chatService: ChatService) { }

  sendMessage(){
     this.chatService.sendMessage(this.message);

     this.message = "";
  }
  access(){
     this.chatService.setUser(this.userName);
     
     
     this.isAddedUser = true;
  }
  
  ngOnInit(){
      
      this.chatService.getMessage().subscribe((message : string) =>{
          
         
          this.messages.push(message);

      });
  }

}
