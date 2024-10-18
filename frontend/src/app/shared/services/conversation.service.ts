import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../models/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ConversationDTOInterface, ConversationInterface } from '../interfaces/conversation.interface';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

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
}
