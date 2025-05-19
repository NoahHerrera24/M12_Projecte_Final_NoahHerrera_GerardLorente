import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: false
})
export class ForgotPasswordComponent implements OnInit {
  public error: string = '';
  public message: string = '';
  public form = {
    email: '',
    password: '',
    password_confirmation: '',
    resetToken: ''
  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el token de la URL si existe
    this.route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'] || '';
    });
  }

  onSubmit(): void {
    if (!this.form.email) {
      this.error = 'El correo electrónico es obligatorio.';
      return;
    }

    if (this.form.resetToken) {
      // Cambiar contraseña si hay un token
      this.authService.changePassword(this.form).subscribe({
        next: (data) => this.handleResponse(data),
        error: (err) => this.handleError(err)
      });
    } else {
      // Solicitar enlace de recuperación si no hay token
      this.authService.forgotPassword(this.form.email).subscribe({
        next: (data) => this.handleResponse(data),
        error: (err) => this.handleError(err)
      });
    }
  }

  handleResponse(data: any): void {
    if (this.form.resetToken) {
      this.message = 'Contraseña cambiada con éxito. Redirigiendo al login...';
      setTimeout(() => this.router.navigateByUrl('/welcome'), 3000);
    } else {
      this.message = 'Enlace de recuperación enviado a tu correo.';
    }
    this.error = '';
  }

  handleError(error: any): void {
    this.error = error.error?.message || 'Enlace de recuperación enviado a tu correo.';
    this.message = '';
  }
}


