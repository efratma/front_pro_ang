import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {

  username: string = '';
  email: string = '';
  resetLinkSent: boolean = false;
  resetLinkError: boolean = false;

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.resetLinkSent = false;
    this.resetLinkError = false;

    const requestData = {
      username: this.username,
      email: this.email
    };

    this.authService.requestReset(requestData).subscribe(
      (response: any) => {
        this.resetLinkSent = true;
      },
      (error: any) => {
        this.resetLinkError = true;
      }
    );
  }
}
