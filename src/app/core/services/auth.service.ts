import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>('http://localhost:8000/login', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.token !== undefined) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.user || null;
    } catch (error) {
      return null;
    }
  }
}
