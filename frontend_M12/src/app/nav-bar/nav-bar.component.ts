import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/iuser';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: IUser | null = null;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('NavBarComponent inicializado');
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('Rol del usuario:', this.user?.role); 
      this.cdr.detectChanges();
    });
  }

}