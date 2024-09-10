import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ChatMessageInterface } from '../models/chat-message.interface';
import { LocalStorageService } from './local-storage.service';
import { ChatPayloadInterface } from '../models/chat-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket = io("http://localhost:3000");

  constructor(private localStorageService: LocalStorageService) { }

  sendMessage(message: string) {
    const newMessage : ChatMessageInterface = {
      content: message,
      role: "user",
      created_at: new Date().toISOString(),
      imageUrl: "https://i.pinimg.com/originals/90/de/25/90de257fdac14d35d66a81ab8e282cad.jpg"
    };

    // this.localStorageService.addChat(newMessage);

    const chatPayload : ChatPayloadInterface = {
      use_cloud_chats: false,
      encrypted: false,
      previous_chats: this.localStorageService.getChats() as ChatMessageInterface[],
      new_chat: newMessage
    };

    this.socket.emit("send-message", chatPayload);

    return newMessage;
  }

  receiveMessages() {
    const observable = new Observable<ChatMessageInterface>((observer) => {
      this.socket.on("receive-message", (chatPayload : ChatPayloadInterface) => {
        console.log(chatPayload);
        this.localStorageService.addChat(chatPayload.new_chat); // FIXME: Must be a cleaner way of doing this
        observer.next(chatPayload.new_chat);
      });

      return () => {console.log('closing socket...');this.socket.disconnect()};
    });

    return observable;
  }
}
