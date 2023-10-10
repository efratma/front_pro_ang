import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ScientificCalculatorComponent } from './scientific-calculator/scientific-calculator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('calculatorContainer', { read: ViewContainerRef }) container!: ViewContainerRef; // Updated this line
  calculatorRef: any = null; // Updated this line
  solvedExercises: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver // Added this line
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/logged-out']);
  }

  toggleCalculator() {
    if (this.calculatorRef) {
      this.calculatorRef.destroy();
      this.calculatorRef = null;
    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ScientificCalculatorComponent);
      this.container.clear();
      this.calculatorRef = this.container.createComponent(factory);
    }
  }
}
