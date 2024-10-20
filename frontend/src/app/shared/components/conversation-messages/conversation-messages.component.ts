import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConversationService } from '../../services/conversation.service';
import { ConversationInterface } from '../../interfaces/conversation.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversationMessageInterface } from '../../models/conversation-message.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserInterface } from '../../models/user.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conversation-messages',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './conversation-messages.component.html',
  styleUrl: './conversation-messages.component.css'
})
export class ConversationMessagesComponent implements OnInit {
  conversationService = inject(ConversationService);
  currentConversation: ConversationInterface | null = null;
  snackBar = inject(MatSnackBar);
  conversationMessages: ConversationMessageInterface[] = [];
  localStorageService = inject(LocalStorageService);
  currentUser: UserInterface | null = null;
  messageFormControl: FormControl = new FormControl();
  currentMessagesSubscription: Observable<ConversationMessageInterface> | null = null;
  conversationFlag: boolean = false;

  ngOnInit(): void {
    this.conversationService.getCurrentConversationMessagesStream().subscribe({
      next: message => this.conversationMessages.push(message),
      error: error => this.snackBar.open(error.message, "Oof")
    });

    this.conversationService.currentConversation.subscribe({
      next: conversation => {
        if (conversation) {
          this.conversationService.leaveConervsation(this.currentConversation);
          this.currentConversation = conversation;

          this.conversationService.getCurrentConversationMessages(conversation)
          .subscribe({
            next: conversations => {
              this.conversationMessages = conversations;
              console.log(conversations);

              this.conversationService.joinConversation(conversation);

              // if (!this.conversationFlag) {
              //   this.conversationFlag = true;

              // }

            },
            error: error => this.snackBar.open(error.message, "Oof")
          });
        }
      },
      error: error => this.snackBar.open(error.message, "Oof")
    });


    this.currentUser = this.localStorageService.getUserInfo();
  }

  sendMessage() {
    if (this.currentConversation && this.currentUser && this.messageFormControl.value) {
      this.conversationService.sendConversationMessage({
        conversation_id_fk: this.currentConversation.id,
        encryption_algorithm: "", // TODO: Add encryption algorithm
        is_encrypted: false,
        message_content: this.messageFormControl.value,
        user_id_fk: this.currentUser.id
      });
    }
    else {
      console.log(this.currentConversation);
      console.log(this.currentUser);
      console.log(this.messageFormControl.value);
    }

  }

}
