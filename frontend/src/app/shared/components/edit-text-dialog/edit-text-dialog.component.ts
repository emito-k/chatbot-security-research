import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConversationMessageInterface } from '../../models/conversation-message.interface';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-edit-text-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-text-dialog.component.html',
  styleUrl: './edit-text-dialog.component.css'
})
export class EditTextDialogComponent {
  message: ConversationMessageInterface = inject(MAT_DIALOG_DATA);
  editForm: FormGroup;

  private dialogRef = inject(MatDialogRef<EditTextDialogComponent>);
  private conversationService = inject(ConversationService);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.editForm = this.formBuilder.group({
      messageContent: [this.message.message_content],
      encryptionAlgorithm: [this.message.encryption_algorithm]
    });
  }

  save() {
    const updatedMessage = {
      ...this.message,
      message_content: this.editForm.value.messageContent,
      encryption_algorithm: this.editForm.value.encryptionAlgorithm
    };

    // this.conversationService.updateMessage(updatedMessage).subscribe({
    //   next: () => this.dialogRef.close(updatedMessage),
    //   error: err => console.error(err)
    // });
  }

  deleteMessage() {
    // this.conversationService.deleteMessage(this.message.id).subscribe({
    //   next: () => this.dialogRef.close(null),
    //   error: err => console.error(err)
    // });
  }

  close() {
    this.dialogRef.close();
  }
}
