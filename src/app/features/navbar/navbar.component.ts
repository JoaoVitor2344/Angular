import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule],
})
export class Navbar {
  routes: { path: string; title: string; canActivate: boolean }[] = [];
  user: User | undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.loadRoutes();
    this.loadUser();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadRoutes();
        this.loadUser();
      }
    });
  }

  private loadUser(): void {
    if (this.authService.isAuthenticated()) {
      const userInfo = this.authService.getUserInfo();

      if (userInfo) {
        this.user = userInfo;
      }
    }
  }

  private loadRoutes(): void {
    this.routes = [
      {
        path: '/users',
        title: 'Users',
        canActivate: this.authService.isAuthenticated(),
      },
    ];
  }

  logout(): void {
    this.authService.logout();
    this.user = undefined;
  }
}
