import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

  export class AppComponent {
    solvedExercises: any[] = [];

    constructor(private authService: AuthService, private router: Router) { }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/logged-out']);
    }



  }
