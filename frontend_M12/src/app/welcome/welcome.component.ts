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
    this.authService.logout();
  }
  
}