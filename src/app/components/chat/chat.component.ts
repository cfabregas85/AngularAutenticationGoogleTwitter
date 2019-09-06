import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',  
})
export class ChatComponent implements OnInit{

  message:string="";
  element:any;

  constructor(private chatService: ChatService) {
    this.chatService.GetMessages().
    subscribe(()=>{
      // this.element.scrollTop = this.element.scrollHeight;
    });
   }

   ngOnInit(){
     this.element = document.getElementById('app-messages');
   }

  Send() {
    console.log(this.message);
    if (this.message.length === 0) {
      return;
    }
    
    this.chatService.AddMessage(this.message).then(()=> this.message ="")
                              .catch((err)=>console.error('Error', err));
  }

}
