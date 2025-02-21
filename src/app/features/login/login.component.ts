import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../core/services/loader.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/environment';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private http: HttpClient
  ) {}

  onSubmit() {
    this.loaderService.show();
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/users']);
        this.loaderService.hide();
      },
      error: (err: { error: { message: any } }) => {
        this.loaderService.hide();
        Swal.fire({
          icon: 'error',
          title: 'Login',
          text: 'E-mail ou senha inválidos',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  }

  protected togglePasswordVisibility() {
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }

    this.switchIcon();
  }

  protected switchIcon() {
    const icon = document.getElementById('icon');
    if (icon) {
      if (icon.classList.contains('bi-eye-fill')) {
        icon.classList.remove('bi-eye-fill');
        icon.classList.add('bi-eye-slash-fill');
      } else {
        icon.classList.remove('bi-eye-slash-fill');
        icon.classList.add('bi-eye-fill');
      }
    }
  }
}
