import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/iuser';

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
      next: (res: IUser) => {
        console.log('Login correcto', res);
        this.authService.setLoginState(true);
        this.authService.setUser(res);
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error('Error en login', err);
      }
    });
  }
}