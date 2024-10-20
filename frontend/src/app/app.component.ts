import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToolBarComponent } from './shared/components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ToolBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
