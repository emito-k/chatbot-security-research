import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../models/user.interface';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ConversationDTOInterface, ConversationInterface } from '../interfaces/conversation.interface';
import { ConversationMessageDTO, ConversationMessageInterface } from '../models/conversation-message.interface';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  currentConversation = new Subject<ConversationInterface | null>();
  socket = io(environment.socketServerUrl);

  constructor() { }

  getUsers() : Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.apiUrl}/users`);
  }

  createConversation(conversationDto: ConversationDTOInterface) : Observable<ConversationInterface> {
    return this.http.post<ConversationInterface>(`${this.apiUrl}/conversations`, conversationDto);
  }

  getConversations() : Observable<ConversationInterface[]> {
    return this.http.get<ConversationInterface[]>(`${this.apiUrl}/conversations`);
  }

  setConversation(newConversation : ConversationInterface) : void {
    this.currentConversation.next(newConversation);
  }

  createConversationMessage(newMessage: ConversationMessageDTO) : Observable<ConversationMessageInterface> {
    return this.http.post<ConversationMessageInterface>(`${this.apiUrl}/messages`, newMessage);
  }

  getCurrentConversationMessages(conversation: ConversationInterface) : Observable<ConversationMessageInterface[]> {
    return this.http.get<ConversationMessageInterface[]>(`${this.apiUrl}/messages/conversation/${conversation.id}`);
  }



  getCurrentConversationMessagesStream(conversation: ConversationInterface) : Observable<ConversationMessageInterface> {
    return new Observable((observer => {
      // this.socket.on()
    }));
  }
}
