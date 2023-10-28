import { Component, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { NgZone } from '@angular/core';


interface TriangularData {
  area: string;
  height: string;
  base: string;
  line_equation: string;
  y_intersection: string;
  x_intersection: string;
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-easy-triangular-area',
  templateUrl: './easy-triangular-area.component.html',
  styleUrls: ['./easy-triangular-area.component.scss']

})
export class EasyTriangularAreaComponent implements OnInit {
  Part = Part; // This exposes the enum to the template
  currentPart: Part = Part.Explanation;
  line_equation: string = '';
  x_intersection: number = 0;
  y_intersection: number = 0;
  userBase: string='';
  userHeight: string = '';
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 1;
  correctAnswers: number = 0;
  maxAttempts: number = 7;
  showSummary: boolean = false;
  testQuestions: TriangularData[] = [];
  userTestAnswersBase: string[] = [];
  userTestAnswersHeight: string[] = [];
  testCorrectAnswers: number = 0;
  showTestSummary: boolean = false;
  correctBase: string = '';
  correctHeight: string = '';
  area: string = '';
  userArea: string = '';
  userTestAnswersArea: string[] = [];
  base:number=0;
  height:number=0;
  chartData: any[] = []; // This will hold the data for the chart.
  view: [number, number] = [700, 400]; // Width and height for the chart
  savedQuestions: TriangularData[] = [];
  showExercises: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}


  ngOnInit(): void {
    this.loadQuestion();
  }


drawTriangle(): void {
  console.log('drawTriangle called');
    const svg = d3.select('#triangle-sketch');
    svg.selectAll('*').remove();  // Clear previous drawings

    const margin = {top: 10, right: 10, bottom: 20, left: 30};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain([0, Math.max(this.base, this.height) + 1]);  // Adjust domain as needed
    y.domain([0, Math.max(this.base, this.height) + 1]);  // Adjust domain as needed

    // Draw X axis
    g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .append('text')
        .attr('x', width)
        .attr('dy', '-0.71em')
        .attr('text-anchor', 'end')
        .text('X axis');

    // Draw Y axis
    g.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Y axis');

    // Draw Triangle
    g.append('polygon')
        .attr('points', `0,${y(0)}, ${x(this.base)},${y(0)}, 0,${y(this.height)}`)
        .attr('fill', 'steelblue');
}




  loadQuestion(): void {
    if (!this.authService.isAuthenticated()) {
      console.error("User not authenticated. Cannot fetch question.");
      return;
    }
    if (this.attempts < this.maxAttempts) {
      this.authService.getTriangularArea().subscribe((data: any) => {
        this.line_equation = data.line_equation;
        this.x_intersection = data.x_intersection;
        this.y_intersection = data.y_intersection;

        // Set the base, height, and area properties based on the server's response
        this.base = parseFloat(data.base);
        this.height = parseFloat(data.height);
        this.area = data.area;
        this.isAnswerChecked = false;
        this.drawTriangle();
      });
    } else {
      this.showSummary = true;
    }
}

formatEquation(equation: string): string {
  const parts = equation.split(' ');

  // Assuming the format is: y = mx + b
  let m = parts[2];  // coefficient of x
  let b = parts[4];  // constant term

  // Process coefficient of x
  if (m === '1' || m === '+1') {
    m = '';  // Remove coefficient if it's 1
  } else if (m === '-1') {
    m = '-';  // Keep the sign if coefficient is -1
  } else if (m === '0' || m === '+0' || m === '-0') {
    m = '';  // Omit x term if coefficient is 0
  } else {
    m = m.replace('x', '');  // Remove x from coefficient
  }

  // Process constant term
  if (b === '0' || b === '+0' || b === '-0') {
    b = '';  // Omit constant term if it's 0
  }

  // Reconstruct the equation
  let formattedEquation = 'y =';
  if (m || m === '-') {
    formattedEquation += ` ${m}x`;
  }
  if (b) {
    if (b[0] !== '-' && (m || m === '-')) {
      formattedEquation += ' +';
    }
    formattedEquation += ` ${b}`;
  }

  return formattedEquation;
}
  checkSolution(): void {
    this.isAnswerChecked = true;

    // Correct values from the server
    const correctBase = this.base.toString();  // Assuming 'base' is the variable that holds the value from the server
    const correctHeight = this.height.toString();  // Assuming 'height' is the variable that holds the value from the server

    // Compare user's input with the correct values
    if (this.userBase === correctBase && this.userHeight === correctHeight && this.userArea === this.area) {
      this.isAnswerCorrect = true;
      this.correctAnswers++;
    } else {
      this.isAnswerCorrect = false;
    }
  }

  nextQuestion(): void {
    this.isAnswerChecked = false;
    this.attempts++;
    if (this.attempts < this.maxAttempts - 1) {
      this.loadQuestion();
    } else {
      this.showSummary = true;
      this.currentPart = Part.QuizCompleted;
    }
  }

  resetQuiz(): void {
    this.attempts = 0;
    this.correctAnswers = 0;
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;
    this.showSummary = false;
    this.loadQuestion();
  }

  changePart(part: Part): void {
    this.currentPart = part;
    if (part === Part.Quiz) {
      this.resetQuiz();
    } else if (part === Part.Test) {
      this.initializeTest();

    }
  }

  initializeTest(): void {
    const requests = Array(10).fill(null).map(() => this.authService.getTriangularArea());

    forkJoin(requests).subscribe({
      next: (questions: TriangularData[]) => {
        this.testQuestions = questions.map(question => ({
          ...question,
          area: question.area.toString(), // Ensure area is a string
        }));
        this.userTestAnswersBase = this.testQuestions.map(() => '');
        this.userTestAnswersHeight = this.testQuestions.map(() => '');
        this.userTestAnswersArea = this.testQuestions.map(() => ''); // Initialize the area answers
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
    });
}

checkTestAnswers(): void {
  this.testCorrectAnswers = 0;
  this.testQuestions.forEach((question, index) => {
    // Correct values from the server
    const correctBase = question.base.trim();
    const correctHeight = question.height.trim();
    const correctArea = question.area.trim();

    // User's answers as strings
    const userBase = this.userTestAnswersBase[index].trim();
    const userHeight = this.userTestAnswersHeight[index].trim();
    const userArea = this.userTestAnswersArea[index].trim();

    // Compare user's answers with the correct answers
    if (userBase === correctBase && userHeight === correctHeight && userArea === correctArea) {
      this.testCorrectAnswers++;
    }
  });
  this.showTestSummary = true;
}

  startTest(): void {
    this.currentPart = Part.Test;
    this.initializeTest();
  }
  navigateToTopics(): void {
    this.router.navigate(['/topic-selection']);
  }

  fetchUserExercises(): void {
    this.authService.getUserExercises3().subscribe((data: TriangularData[]) => {
      this.savedQuestions = data;
      this.showExercises = true;
    }, error => {
      console.error("Error fetching user exercises:", error);
    });
  }

}
