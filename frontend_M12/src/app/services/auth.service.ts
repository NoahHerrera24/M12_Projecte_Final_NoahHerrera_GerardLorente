import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseUrl: string = 'https://m12projectefinalnoahherreragerardlorente-production.up.railway.app/api';
  private readonly baseUrlSanctum: string = 'https://m12projectefinalnoahherreragerardlorente-production.up.railway.app/sanctum';

  constructor(private http: HttpClient, private router: Router) {} 

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userSubject = new BehaviorSubject<IUser | null>(null);
  public user$ = this.userSubject.asObservable();

  setLoginState(loggedIn: boolean): void {
    this.isLoggedInSubject.next(loggedIn);
  }

  getLoginState(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.baseUrlSanctum}/csrf-cookie`, { withCredentials: true });
  }
  
  login(email: string, password: string): Observable<IUser> {
    return this.http.get(`${this.baseUrlSanctum}/csrf-cookie`, { withCredentials: true }).pipe(
      switchMap(() =>
        this.http.post<{ user: IUser }>(`${this.baseUrl}/login`, {
          email: email,
          password: password
        }, { withCredentials: true }).pipe(
          map(response => {
            this.setUser(response.user); 
            return response.user;
          })
        )
      )
    );
  }

  remove() {
    return localStorage.removeItem('user');
  }

  logout(): void {
    this.remove();
    this.setLoginState(false);
    this.router.navigateByUrl('/welcome');
  }

  // Método para verificar si el correo ya está registrado
  checkEmail(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/check-email`, { email });
  }

  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  setUser(user: IUser): void {
    this.userSubject.next(user);
  }

  getUser(): IUser | null {
    return this.userSubject.value;
  }

  getUserRole(): string | null {
    return this.userSubject.value?.role || null;
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  changePassword(data: { email: string; password: string; password_confirmation: string; resetToken: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, data);
  }
}