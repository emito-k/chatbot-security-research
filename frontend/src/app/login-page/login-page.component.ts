import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from '../shared/services/admin.service';
import { UserInterface } from '../shared/models/user.interface';
import { LoginSuccessDialogComponent } from '../shared/components/login-success-dialog/login-success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  snackBar = inject(MatSnackBar);
  adminService = inject(AdminService);
  dialog = inject(MatDialog);

  usernameFormControl = new FormControl("");
  passwordFormControl = new FormControl("");
  privateKeyFormControl = new FormControl("");

  onSubmit(event: any) {
    event.preventDefault()

    if (this.usernameFormControl.value && this.passwordFormControl.value && this.privateKeyFormControl.value) {
      this.snackBar.open("Yippie");
      // console.log(this.usernameFormControl.value, this.passwordFormControl.value);
      this.adminService.loginUser({
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
        public_key: "random",
        is_bot: false
      }, this.privateKeyFormControl.value).subscribe({
        next: data => {
          console.log(data);

          this.dialog.open(LoginSuccessDialogComponent, {
            data: data,
          });

          this.snackBar.open("User created");
        },
        error: error => {
          console.log(error);
          this.snackBar.open("Error:", error.message);
        }
      });
      ;
    }
    else {
      this.snackBar.open("Please provide valid input");
    }
  }
}
