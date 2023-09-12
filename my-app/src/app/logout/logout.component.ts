import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: '<div class="logout-message"> מצפים לפגוש אותך שוב </div>',
  styles: [`
    .logout-message
      font-size: 50px
      text-align: center
      margin-top: 100px
      color: blue
      font-family: courier
  `]
})
export class LogoutComponent { }
