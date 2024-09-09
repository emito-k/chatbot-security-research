import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket = io("http://localhost:3000");

  constructor() { }

  sendMessage(message: string) {
    this.socket.emit("send-message", {
      // TODO: Decide on a structure of the message, something flexible
      // send the whole conversation
    });
  }
}
