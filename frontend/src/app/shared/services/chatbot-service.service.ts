import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ChatPromptInterface } from '../models/chat-prompt.interface';
import { ChatPromptResponseInterface } from '../models/chat-prompt-response.interface';
import { ChatMessageInterface } from '../models/chat-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor() { }

  async sendPrompt(prompt: string) : Promise<ChatPromptResponseInterface> {
    const chatPrompt : ChatPromptInterface =  {
      model: environment.model,
      prompt: prompt,
      stream: false
    };

    return await axios.post(`${environment.apiUrl}/api/generate`, chatPrompt, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.data);
  }

  chatAPI: string = 'http://localhost:3000/chats';
  async sendChat(content: string) : Promise<ChatMessageInterface[]> {
    return axios.post(`${this.chatAPI}/send`, { content: content, role: "user"}).then(res => res.data);
  }

  async getChats() : Promise<ChatMessageInterface[]> {
    return axios.get(this.chatAPI).then(res => {
      console.log(res.data);
      return res.data.chats;
    });
  }
}
