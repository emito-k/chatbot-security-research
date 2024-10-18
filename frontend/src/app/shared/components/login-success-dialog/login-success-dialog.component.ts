import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignupResponse } from '../../models/user.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-success-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './login-success-dialog.component.html',
  styleUrl: './login-success-dialog.component.css'
})
export class LoginSuccessDialogComponent implements OnInit {
  data : SignupResponse = inject(MAT_DIALOG_DATA);
  localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.localStorageService.saveUser(this.data.user);
    this.localStorageService.savePrivateKey(this.data.private_key);
  }
}
