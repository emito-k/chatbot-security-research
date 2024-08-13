import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatServiceService } from './shared/services/chat-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'research-chatbot-prototype';
  response = '';
  constructor(private chatService: ChatServiceService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chatService.sendPrompt('how are you doing today').then((res) => {
      console.log(res);
      this.response = res.data.message;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
