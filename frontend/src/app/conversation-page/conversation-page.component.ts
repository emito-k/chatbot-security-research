import { Component, inject } from '@angular/core';
import { ChatbotService } from '../shared/services/chatbot-service.service';
import { ChatMessagesComponent } from '../shared/components/chat-messages/chat-messages.component';
import { ChatMessageInterface } from '../shared/models/chat-message.interface';
import { ChatPromptResponseInterface } from '../shared/models/chat-prompt-response.interface';
import { ChatService } from '../shared/services/chat.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ConversationService } from '../shared/services/conversation.service';
import { ConversationInterface } from '../shared/interfaces/conversation.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversationMessagesComponent } from '../shared/components/conversation-messages/conversation-messages.component';

@Component({
  selector: 'app-conversation-page',
  standalone: true,
  imports: [
    ChatMessagesComponent,
    ConversationMessagesComponent
  ],
  templateUrl: './conversation-page.component.html',
  styleUrl: './conversation-page.component.css'
})
export class ConversationPageComponent {
  conversationService = inject(ConversationService);
  conversation: ConversationInterface | null = null;
  snackBar = inject(MatSnackBar);

  chats: ChatMessageInterface[] = [
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
    // {imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg", message: "hello", timestamp: "11:00", sender: "me"},
  ];
  loading: boolean = false;

  constructor(private chatbotService: ChatbotService, private chatService: ChatService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.chatbotService.getChats().then((chats) => {
    //   this.chats.push(...chats);
    //   console.log(this.chats);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    this.conversationService.currentConversation.subscribe({
      next: conversation => this.conversation = conversation,
      error: error => this.snackBar.open(error.message, "Oof")
    });

    this.chats.push(...this.localStorageService.getChats());

    this.chatService.receiveMessages().subscribe(chat => this.chats.push(chat));
  }

  sendMessage(message: string) {
    // this.chats.push({
    //   imgUrl: "https://www.w3schools.com/w3images/bandmember.jpg",
    //   content: message,
    //   timestamp: (new Date()).toISOString(),
    //   role: "me"
    // });

    // this.loading = true;

    // this.chatbotService.sendChat(message).then((chats) => {
    //   this.chats.push(chats[chats.length - 2]);
    //   this.chats.push(chats[chats.length - 1]);
    //   this.loading = false;
    // })
    // .catch((error) => {
    //   console.log(error);
    //   this.loading = false;
    // });

   this.chatService.sendMessage(message)
  }
}
