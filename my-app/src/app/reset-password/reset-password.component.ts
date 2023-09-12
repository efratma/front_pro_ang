import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  uid: string = ''; // Initialize with an empty string
  newPassword: string = '';
  resetSuccess: boolean = false;
  resetError: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
  }

  onSubmit() {
    this.resetSuccess = false;
    this.resetError = false;

    this.authService.resetPassword(this.uid, this.token, this.newPassword).subscribe(
      (response) => {
        this.resetSuccess = true;
        // Redirect to a success page or login page, for example:
        this.router.navigate(['/login']);
      },
      (error) => {
        this.resetError = true;
        // Handle error and display a message to the user
      }
    );
  }
}
