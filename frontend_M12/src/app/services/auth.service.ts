import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {} 

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setLoginState(loggedIn: boolean) {
    this.isLoggedInSubject.next(loggedIn);
  }

  getCsrfToken(): Observable<any> {
    return this.http.get('/sanctum/csrf-cookie', { withCredentials: true });
  }
  
  login(email: string, password: string) {
    return this.http.get('/sanctum/csrf-cookie', { withCredentials: true }).pipe(
      switchMap(() =>
        this.http.post('api/login', {
          email: email,
          password: password
        }, { withCredentials: true })
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

  getUser(): Observable<any> {
    return this.http.get(`api/user`, { withCredentials: true });
  }

  register(userData: FormData): Observable<any> {
    return this.http.post(`api/register`, userData);
  }

}