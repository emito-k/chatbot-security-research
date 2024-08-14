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
    this.chatService.getChats().then((chats) => {
      this.chats.push(...chats);
      console.log(this.chats);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  sendMessage(message: string) {
    // this.chats.push({
    //   imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg",
    //   content: message,
    //   timestamp: (new Date()).toISOString(),
    //   role: "me"
    // });

    this.loading = true;

    this.chatService.sendChat(message).then((chats) => {
      this.chats.push(chats[chats.length - 2]);
      this.chats.push(chats[chats.length - 1]);
      this.loading = false;
    })
    .catch((error) => {
      console.log(error);
      this.loading = false;
    });
  }
}
