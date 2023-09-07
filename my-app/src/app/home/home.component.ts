import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  videoUrl: SafeResourceUrl;
  isComponentVisible = true;  // initially, the component is visible

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    // Sanitize the YouTube URL before use
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/VIDEO_ID?autoplay=1');
  }

  navigateToRegister() {
    this.isComponentVisible = false;  // hide the component
    this.router.navigate(['/register']);
  }

  navigateToLogin() {
    this.isComponentVisible = false;  // hide the component
    this.router.navigate(['/login']);
  }
}
