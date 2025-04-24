import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

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

  logout(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() =>
        this.http.delete('/api/logout', { withCredentials: true }).pipe(
          tap(() => {
            this.setLoginState(false);
          })
        )
      )
    );
  }

  getUser(): Observable<any> {
    return this.http.get(`api/user`, { withCredentials: true });
  }

  register(userData: FormData): Observable<any> {
    return this.http.post(`api/register`, userData);
  }

}