import { Injectable } from '@angular/core';
import { ChatMessageInterface } from '../models/chat-message.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    //
  }

  getData() {
    localStorage.getItem("");
  }

  // TODO: Create user information class
  clearData() {}

  getUserInfo() {
  }

  updateUserInfo() {}

  // Chats
  // TODO: Change this to use promises instead...
  getChats() : ChatMessageInterface[] {
    const stringChats : string = localStorage.getItem("chats") ?? "";

    if (stringChats === "") {
      this.setChats([]);
      return [];
    }

    return JSON.parse(stringChats) as ChatMessageInterface[];
  }

  setChats(chats: ChatMessageInterface[]) : void {
    localStorage.setItem("chats", JSON.stringify(chats));
  }

  addChat(chat: ChatMessageInterface) : void {
    const chats: ChatMessageInterface[] = this.getChats();
    chats.push(chat);
    this.setChats(chats);
  }

  deleteChats() : void {
    this.setChats([]);
  }
}
