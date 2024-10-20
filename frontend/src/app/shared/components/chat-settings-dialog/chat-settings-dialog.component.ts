import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-settings-dialog',
  standalone: true,
  imports: [
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './chat-settings-dialog.component.html',
  styleUrl: './chat-settings-dialog.component.css'
})
export class ChatSettingsDialogComponent {
  privacyForm: FormGroup;
  showSelfDestructInput = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChatSettingsDialogComponent>
  ) {
    this.privacyForm = this.fb.group({
      saveLocally: [false],
      saveToCloud: [false],
      enableE2EE: [false],
      enableSelfDestruction: [false],
      selfDestructTime: ['']
    });
  }

  toggleSelfDestruct() {
    this.showSelfDestructInput = this.privacyForm.get('enableSelfDestruction')?.value;
  }

  deleteCloud() {
    console.log('Delete cloud data');
    // Logic for deleting messages in the cloud
  }

  deleteLocal() {
    console.log('Delete local messages');
    // Logic for deleting local messages
  }

  deleteConversation() {
    console.log('Delete entire conversation');
    // Logic for deleting the entire conversation
  }

  close() {
    this.dialogRef.close();
  }
}
