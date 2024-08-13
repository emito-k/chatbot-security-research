import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotService } from './shared/services/chat-service.service';
import { ChatMessagesComponent } from './shared/components/chat-messages/chat-messages.component';
import { ChatMessageInterface } from './shared/models/chat-message.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatMessagesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  chats: ChatMessageInterface[] = [
    {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
  ];
  constructor(private chatService: ChatbotService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.chatService.sendPrompt('how are you doing today').then((res) => {
    //   console.log(res);
    //   this.response = res.response;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });


  }
}
