import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
    });

    // Păstrăm logica ta existentă pentru login
    return this.httpClient.get(this.baseUrl + '/orders', { headers }).pipe(
      map(response => {
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('token', 'Basic ' + btoa(user.email + ':' + user.password));
        return response;
      })
    );
  }

  register(user: any): Observable<any> {
    // MODIFICARE AICI: Am adăugat { responseType: 'text' }
    // Acest lucru permite primirea unui răspuns simplu de tip String de la Backend
    return this.httpClient.post(this.baseUrl + '/register', user, { responseType: 'text' });
  }

  logout() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('token');
  }

  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem('userEmail') === null);
  }

  getUserEmail(): string {
    return sessionStorage.getItem('userEmail') || '';
  }
}
