import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(username: string, email: string, password: string): void {
    const userCredentials = { username, email, password };

    this.authService.register(userCredentials).subscribe({
      next: response => {
        this.successMessage = "Well done! You have successfully registered.";

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);  // 2000 milliseconds = 2 seconds
      },
      error: (err: any) => {
        // Check if the error has a 'detail' property
        if (err && err.error && err.error.detail) {
          this.errorMessage = err.error.detail;
        } else {
          this.errorMessage = 'Registration failed';
        }
      }
    });
  }
}
