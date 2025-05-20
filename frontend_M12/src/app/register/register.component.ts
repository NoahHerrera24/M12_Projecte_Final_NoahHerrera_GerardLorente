import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'participant'
  };

  selectedFile: File | null = null;
  errorMessage: string = ''; // Para manejar mensajes de error
  emailExists: boolean = false; // Para manejar el error de correo ya registrado

  constructor(private authService: AuthService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Método para verificar si el correo ya está registrado
  checkEmailExists() {
    if (!this.user.email) {
      return;
    }

    this.authService.checkEmail(this.user.email).pipe(
      debounceTime(300), // Espera 300ms para evitar múltiples solicitudes
      distinctUntilChanged(), // Evita solicitudes repetidas para el mismo valor
      switchMap(email => {
        if (!email) {
          return of(false); // Si no hay correo, no hace la solicitud
        }
        return of(email); // Devuelve el valor booleano directamente
      })
    ).subscribe({
      next: (exists: boolean) => {
        this.emailExists = exists; // Maneja el valor booleano correctamente
      },
      error: (error) => {
        console.error('Error al verificar el correo:', error);
      }
    });
  }

  register() {
    // Validaciones antes de enviar el formulario
    if (!this.user.name || !this.user.email || !this.user.password || !this.user.password_confirmation || !this.user.role) {
      this.errorMessage = 'Si us plau, completa tots els camps obligatoris.';
      return;
    }

    if (this.user.name.length > 15) {
      this.errorMessage = 'El nombre no puede superar los 15 caracteres.';
      return;
    }

    if (this.user.password.length < 8) {
      this.errorMessage = 'La contrasenya ha de tenir almenys 8 caràcters.';
      return;
    }

    if (this.user.password !== this.user.password_confirmation) {
      this.errorMessage = 'Les contrasenyes no coincideixen.';
      return;
    }

    if (this.emailExists) {
      this.errorMessage = 'El correu electrònic ja està registrat.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('password_confirmation', this.user.password_confirmation);
    formData.append('role', this.user.role);

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }
    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Usuario registrado', response);
        this.authService.setLoginState(true);
        this.authService.setUser(response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro', error);
        this.errorMessage = error.error?.message || 'Error en el registre. Si us plau, torna-ho a intentar.';
      }
    });
  }
}