import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: '<div class="logout-message">Waiting for you to come back</div>',
  styles: [`
    .logout-message
      font-size: 24px
      text-align: center
      margin-top: 100px
  `]
})
export class LogoutComponent { }
