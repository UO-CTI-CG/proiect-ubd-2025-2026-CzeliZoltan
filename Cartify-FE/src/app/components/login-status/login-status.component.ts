import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isUserLoggedIn();
    if(this.isAuthenticated) {
      this.userEmail = this.authService.getUserEmail();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/products']).then(() => {
      window.location.reload();
    });
  }
}
