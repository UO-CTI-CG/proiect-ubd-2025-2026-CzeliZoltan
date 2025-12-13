import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;

  constructor ( private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router){

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]], // ✔ FIX
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    const password = this.signupForm.get('password')?.value;
    const confirm_password = this.signupForm.get('confirm_password')?.value;
    if (password !== password){
      this.snackBar.open('Passwords do not match!', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('Sign up successfully', 'Close', { duration: 5000 });
        this.router.navigate(["/login"]);
      },
      (error) => {
        this.snackBar.open('Sign up failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    )
  }
}
