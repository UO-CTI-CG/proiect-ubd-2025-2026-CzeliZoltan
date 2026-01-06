import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Luăm token-ul salvat la login (Basic Auth Header)
    const token = sessionStorage.getItem('token');
    // Luăm endpoint-ul API-ului (ca să nu trimitem credențiale către alte site-uri externe dacă e cazul)
    const secureEndpoints = ['http://localhost:8080/api'];

    if (token && secureEndpoints.some(url => request.url.startsWith(url))) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request);
  }
}
