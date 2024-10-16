import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";

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

  usernameFormControl = new FormControl("");
  passwordFormControl = new FormControl("")

  onSubmit(event: any) {
    event.preventDefault()

    if (this.usernameFormControl.value && this.passwordFormControl.value) {
      this.snackBar.open("Yippie");
      console.log(this.usernameFormControl.value, this.passwordFormControl.value);
    }
    else {
      this.snackBar.open("Please provide valid input");
    }
  }
}
