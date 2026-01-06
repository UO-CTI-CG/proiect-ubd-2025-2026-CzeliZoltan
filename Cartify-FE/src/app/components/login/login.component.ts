import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode: boolean = true;

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    console.log('Se trimit datele:', this.user);

    if (this.isLoginMode) {
      this.authService.login(this.user).subscribe({
        next: (response) => {
          console.log('Login reușit');
          this.router.navigate(['/products']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Email sau parolă incorectă!';
        }
      });

    } else {
      if (!this.user.firstName || !this.user.lastName) {
        this.errorMessage = 'Te rugăm să completezi Numele și Prenumele.';
        return;
      }

      this.authService.register(this.user).subscribe({
        next: (response) => {
          console.log('Înregistrare reușită');
          this.successMessage = 'Cont creat cu succes! Te rugăm să te autentifici.';
          this.isLoginMode = true;
          this.user.firstName = '';
          this.user.lastName = '';
          this.user.password = '';
        },
        error: (err) => {
          console.error('Register error:', err);
          if (err.error && typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else {
            this.errorMessage = 'Eroare la înregistrare. Email-ul ar putea fi deja folosit.';
          }
        }
      });
    }
  }
}
