import { Component } from '@angular/core';
import * as math from 'mathjs';


@Component({
  selector: 'app-scientific-calculator',
  templateUrl: './scientific-calculator.component.html',
  styleUrls: ['./scientific-calculator.component.scss']
})
export class ScientificCalculatorComponent {

  displayValue: string = '';

  backspace(): void {
    this.displayValue = this.displayValue.slice(0, -1);
  }

  calculate(): void {
    let expression = this.displayValue;
    let result;

    try {
      // Convert trigonometric function inputs from degrees to radians
      expression = expression.replace(/sin\(/g, 'sin(' + Math.PI / 180 + '*');
      expression = expression.replace(/cos\(/g, 'cos(' + Math.PI / 180 + '*');
      expression = expression.replace(/tan\(/g, 'tan(' + Math.PI / 180 + '*');

      result = math.evaluate(expression);
      this.displayValue = result.toString();
    } catch (error) {
      this.displayValue = "Error";
    }
  }

  squareRoot(): void {
    this.displayValue += "sqrt(";
  }

  base10Log(): void {
    this.displayValue += "log(";
  }

  pi(): void {
    this.displayValue += "pi";
  }

  e(): void {
    this.displayValue += "e";
  }

  power(): void {
    this.displayValue += "^(";
  }
  addToDisplay(value: string) {
    this.displayValue += value;
  }
  clearDisplay() {
    this.displayValue = '';
  }

  // You can add more methods if you have additional functionalities for the calculator.
}
