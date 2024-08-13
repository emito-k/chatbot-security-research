import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotService } from './shared/services/chatbot-service.service';
import { ChatMessagesComponent } from './shared/components/chat-messages/chat-messages.component';
import { ChatMessageInterface } from './shared/models/chat-message.interface';
import { ChatPromptResponseInterface } from './shared/models/chat-prompt-response.interface';

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
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
  ];
  loading: boolean = false;

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

  sendMessage(message: string) {
    this.chats.push({
      imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg",
      message: message,
      timestamp: (new Date()).toISOString(),
      sender: "me"
    });

    this.loading = true;
    this.chatService.sendPrompt(message).then((res: ChatPromptResponseInterface) => {
      this.chats.push({
        imgUrl: "https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif",
        message: res.response,
        timestamp: (new Date()).toISOString(),
        sender: "bot"
      });
      this.loading = false;
    })
    .catch(error => {
      console.error(error)
      this.loading = false;
    });
  }
}
