import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  titol: string = 'Benvingut a Next-Level Tournament League';

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Sessió tancada correctament');
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Error al tancar sessió:', err);
      }
    });
  }
}