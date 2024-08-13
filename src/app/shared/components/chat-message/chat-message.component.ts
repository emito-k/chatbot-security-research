import { Component, Input } from '@angular/core';
import { ChatMessageInterface } from '../../models/chat-message.interface';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  @Input({ required: true }) chatMessage!: ChatMessageInterface;
}
