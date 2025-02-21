import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { hideLoader, showLoader } from '../../core/utils/global-function';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    showLoader();

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        hideLoader();
        this.router.navigate(['/users']);
      },
      error: (err: { error: { message: any } }) => alert(err.error.message),
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
