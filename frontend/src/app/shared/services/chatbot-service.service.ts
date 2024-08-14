import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ChatPromptInterface } from '../models/chat-prompt.interface';
import { ChatPromptResponseInterface } from '../models/chat-prompt-response.interface';

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
}
