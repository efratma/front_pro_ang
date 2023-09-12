import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Update the path based on your structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(username: string, password: string): void {
    const userCredentials = { username, password };
    this.authService.login(userCredentials).subscribe({
      next: response => {
        localStorage.setItem('token', response.access); // Store the token

        // Set the success message to include the username
        this.successMessage = 'כיף לראות אותך שוב  ' + username + '!';

        // Introduce a delay of 2 seconds before navigating
        setTimeout(() => {
          this.router.navigate(['/topic-selection']);
        }, 2000);  // 2000 milliseconds = 2 seconds
      },
      error: error => {
        if (error.status === 401) {
          // Unauthorized error, handle it as needed (e.g., show an error message).
          this.errorMessage = 'Invalid credentials';
        } else if (error.status === 412) {
          // Precondition Failed status, which could indicate a password reset.
          // Redirect to the password reset page.
          this.router.navigate(['/request-password-reset']);
        } else {
          // Handle other errors as needed.
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    });
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/request-password-reset']);
  }
}
