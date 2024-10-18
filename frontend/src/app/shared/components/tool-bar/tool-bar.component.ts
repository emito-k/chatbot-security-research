import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule } from '@angular/material/menu';
import { AdminService } from '../../services/admin.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

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
export class ToolBarComponent {
  adminService = inject(AdminService);
  localStorageService = inject(LocalStorageService);
  router = inject(Router);

  onLogout() {
    this.localStorageService.clearUserData();
    this.router.navigate(['/login']);
  }
}
