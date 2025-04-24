import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) {}

  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'participant'
  };
  
  selectedFile: File | null = null;
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  register() {
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('password_confirmation', this.user.password_confirmation);
    formData.append('role', this.user.role);
    
    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }
  
    this.authService.register(formData).subscribe(response => {
      console.log('Usuario registrado', response);
      this.router.navigate(['/welcome']);
    }, error => {
      console.error('Error en el registro', error);
    });
  }
  
}