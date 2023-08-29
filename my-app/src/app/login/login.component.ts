import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Update the path based on your structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
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
        this.successMessage = 'Welcome back, ' + username + '!';

        // Introduce a delay of 2 seconds before navigating
        setTimeout(() => {
          this.router.navigate(['/topic-selection']);
        }, 2000);  // 2000 milliseconds = 2 seconds
      },
      error: error => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
// login.component.ts

}


