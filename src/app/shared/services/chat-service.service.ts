import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ChatPromptInterface } from '../models/chat-prompt.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor() { }

  async sendPrompt(prompt: string) : Promise<any> {
    const chatPrompt : ChatPromptInterface =  {
      model: environment.model,
      prompt: prompt,
      stream: false
    };

    console.log(chatPrompt);
    const res = await axios.post(`${environment.apiUrl}/api/generate`, chatPrompt, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  }
}
