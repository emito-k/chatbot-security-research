import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ChatMessageInterface } from '../models/chat-message.interface';
import { LocalStorageService } from './local-storage.service';

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

    this.localStorageService.addChat(newMessage);

    this.socket.emit("send-message", {
      settings: {},
      chats: this.localStorageService.getChats(),
    });

    return newMessage;
  }

  receiveMessages() {
    const observable = new Observable<ChatMessageInterface>((observer) => {
      this.socket.on("receive-message", (message) => {
        console.log(message);
        this.localStorageService.addChat(message.chats[0]); // FIXME: Must be a cleaner way of doing this
        observer.next(message.chats[0]);
      });

      return () => {console.log('closing socket...');this.socket.disconnect()};
    });

    return observable;
  }
}
