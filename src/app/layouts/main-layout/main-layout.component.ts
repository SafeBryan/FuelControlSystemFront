import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthService } from '../../core/services/auth.service';
import { MenuService, IMenu } from '../../core/services/menu.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  username = 'Usuario';
  role = 'Admin';
  menuList: IMenu[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuService: MenuService
  ) {
    const token = this.authService.getToken();
    if (token) {
      const decoded = this.authService.decodeToken(token);
      this.username = decoded?.unique_name || 'Usuario';
      this.role = decoded?.role || 'Admin';
      this.menuList = this.menuService.getMenuByRol(this.role);
    } else {
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
