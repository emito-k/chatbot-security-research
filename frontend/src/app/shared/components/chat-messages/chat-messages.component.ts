import { Component, Input } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatMessageInterface } from '../../models/chat-message.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {
  @Input() chats: ChatMessageInterface[] = [];
  @Input() loading: boolean = false;
}
