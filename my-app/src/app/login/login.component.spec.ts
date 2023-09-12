import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Update the path based on your structure


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService) { }

  onSubmit(username: string, password: string): void {
    const userCredentials = { username, password };
    this.authService.login(userCredentials).subscribe({
      next: response => {
        localStorage.setItem('token', response.access); // Store the token
        this.successMessage = 'Login successful!'; // Set the success message
      },
      error: error => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }


}
