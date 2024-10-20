import { Routes } from '@angular/router';
import { ConversationPageComponent } from './conversation-page/conversation-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

export const routes: Routes = [
  { component: ConversationPageComponent, path: "" },
  { component: LoginPageComponent, path: "login" },
  { component: SignupPageComponent, path: "signup" }
];
