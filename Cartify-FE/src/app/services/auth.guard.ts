import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      // Dacă nu e logat, îl trimitem la pagina de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
