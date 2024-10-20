import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule } from '@angular/material/menu';
import { AdminService } from '../../services/admin.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateConversationDialogComponent } from '../create-conversation-dialog/create-conversation-dialog.component';
import { UserInterface } from '../../models/user.interface';
import { ConversationService } from '../../services/conversation.service';
import { ConversationInterface } from '../../interfaces/conversation.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent implements OnInit {
  adminService = inject(AdminService);
  localStorageService = inject(LocalStorageService);
  conversationService = inject(ConversationService);
  snackBar = inject(MatSnackBar);

  router = inject(Router);
  dialog = inject(MatDialog);

  conversations : ConversationInterface[] = [];

  ngOnInit(): void {
    this.conversationService.getConversations().subscribe({
      next: conversations => this.conversations = conversations,
      error: error => this.snackBar.open(error.message, "Oof")
    });
  }

  onLogout() {
    this.localStorageService.clearUserData();
    this.router.navigate(['/login']);
  }

  openCreateConversationDialog() {
    const currentUser : UserInterface = this.localStorageService.getUserInfo();

    this.dialog.open(CreateConversationDialogComponent, {
      data: currentUser
    });
  }

  selectConversation(conversation: ConversationInterface) : void {
    this.conversationService.setConversation(conversation);
  }
}
