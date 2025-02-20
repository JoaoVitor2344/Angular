import { Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'users', component: UserComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];
