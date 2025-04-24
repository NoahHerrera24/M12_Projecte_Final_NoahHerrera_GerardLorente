import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (res) => {
        console.log('Login correcto', res);
        this.authService.setLoginState(true);
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error('Error en login', err);
      }
    });
  }
}