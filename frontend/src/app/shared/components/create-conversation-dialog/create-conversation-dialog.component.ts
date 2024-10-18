import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ConversationService } from '../../services/conversation.service';
import { UserInterface } from '../../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-conversation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-conversation-dialog.component.html',
  styleUrl: './create-conversation-dialog.component.css'
})
export class CreateConversationDialogComponent implements OnInit {
  conversationService = inject(ConversationService);
  snackBar = inject(MatSnackBar);
  currentUser: UserInterface = inject(MAT_DIALOG_DATA);

  userSelectFormControl = new FormControl();

  users : UserInterface[] = [];

  ngOnInit(): void {
    this.conversationService.getUsers().subscribe({
      next: users => this.users = users,
      error: error => {
        this.snackBar.open("Error!", error.message);
      }
    });
  }

  createConversation() {
    // console.log(this.userSelectFormControl.value);

    if (this.userSelectFormControl.value && this.currentUser) {
      console.log(this.currentUser);
      console.log(this.userSelectFormControl.value);
      this.conversationService.createConversation({
        user_a_id_fk: this.currentUser.id,
        user_b_id_fk: this.userSelectFormControl.value.id}).subscribe({
          next: conversation => {
            this.snackBar.open(`Conversation ${conversation.id} has been created`, "Ok")
          },
          error: error => {
            this.snackBar.open(error.message, 'Oof');
          }
        });
    }
    else {
      console.log(this.currentUser);
      console.log(this.userSelectFormControl.value);
    }

  }
}
