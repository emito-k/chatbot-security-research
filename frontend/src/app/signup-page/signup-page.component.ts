import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from '../shared/services/admin.service';
import { UserInterface } from '../shared/models/user.interface';
import { LoginSuccessDialogComponent } from '../shared/components/login-success-dialog/login-success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  snackBar = inject(MatSnackBar);
  adminService = inject(AdminService);
  dialog = inject(MatDialog);

  usernameFormControl = new FormControl("");
  passwordFormControl = new FormControl("")

  onSubmit(event: any) {
    event.preventDefault()

    if (this.usernameFormControl.value && this.passwordFormControl.value) {
      this.snackBar.open("Yippie");
      // console.log(this.usernameFormControl.value, this.passwordFormControl.value);
      this.adminService.createUser({
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
        public_key: "random",
        is_bot: false
      }).subscribe({
        next: data => {
          console.log(data);

          this.dialog.open(LoginSuccessDialogComponent, {
            data: data,
          });

          this.snackBar.open("User created");
        },
        error: error => {
          this.snackBar.open("Error:", error);
        }
      });
      ;
    }
    else {
      this.snackBar.open("Please provide valid input");
    }
  }
}
