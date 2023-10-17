import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}


@Component({
  selector: 'app-equation-system-medium',
  templateUrl: './equation-system-medium.component.html',
  styleUrls: ['./equation-system-medium.component.scss']
})
export class EquationSystemMediumComponent {
  Part = Part;
  equation1: string = '';
  equation2: string = '';
  userSolutionX: number = 0;
  userSolutionY: number = 0;
  correctSolutionX: number | null = 0;
  correctSolutionY: number | null = 0;
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 0;
  correctAnswers: number = 0;
  maxAttempts: number = 7;
  showSummary: boolean = false;
  equation1Fractions: { numerator: string, denominator: string }[] = [];
  equation2Fractions: { numerator: string, denominator: string }[] = [];
  currentPart: Part = Part.Explanation;
  testQuestions: {
    equation1: string;
    equation2: string;
    solution_x: number;
    solution_y: number;
  }[] = [];
  userTestAnswers: { x: number, y: number }[] = [];
  testCorrectAnswers: number = 0;
  backgroundColor: string = '';
  showTestSummary: boolean = false;
  savedQuestions: {
    equation1: string;
    equation2: string;
    solution_x: number;
    solution_y: number;
  }[] = [];
  showExercises: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuestion();
  }
  formatNumber(value: number): number {
    const strValue = value.toString();
    if (strValue.includes('.')) {
        const [intPart, decimalPart] = strValue.split('.');
        if (decimalPart === '00') {
            return parseFloat(intPart);
        } else if (decimalPart.charAt(1) === '0') {
            return parseFloat(`${intPart}.${decimalPart.charAt(0)}`);
        }
    }
    return value;
}

  navigateToTopics(): void {
    this.router.navigate(['/topic-selection']);
  }

  loadQuestion(): void {
    if (!this.authService.isAuthenticated()) {
      console.error("User not authenticated. Cannot fetch question.");
      return;
    }
    if (this.attempts < this.maxAttempts) {
      this.authService.getMediumSystemOfEquations().subscribe(
        (data) => {
          // Check if the question has no solution or infinite solutions
          if (data.error) {
            // If so, call loadQuestion() recursively to fetch a new question
            this.loadQuestion();
          } else {
            // Handle the regular case with valid solutions
            this.equation1 = this.processEquation(data.equation1);
            this.equation2 = this.processEquation(data.equation2);
            this.correctSolutionX = this.formatNumber(data.solution_x);
            this.correctSolutionY = this.formatNumber(data.solution_y);
            this.isAnswerChecked = false; // Reset the answer check status

            // Format the equations into fractions
            this.equation1Fractions = this.formatEquation(data.equation1);
            this.equation2Fractions = this.formatEquation(data.equation2);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
          // Handle the error, e.g., by displaying a message to the user
        }
      );
    } else {
      this.showSummary = true; // Show the summary when all questions are answered
    }

  }

  formatExpression(expr: string): string {
    return expr.replace(/([a-z])2/g, '$1^2');
  }

  formatUserInput(expr: string): string {
    return expr.replace(/([a-z])\^2/g, '$12');
  }
  
  formatEquation(equation: string): { numerator: string, denominator: string }[] {
    const fractions: { numerator: string, denominator: string }[] = [];
    const parts = equation.split(' ');

    // Process each part to create fractions
    parts.forEach((part, index) => {
      if (part.includes('/')) {
        const [numerator, denominator] = part.split('/');
        fractions.push({ numerator, denominator });
      } else {
        // Handle operators and constants
        fractions.push({ numerator: part, denominator: '' });
      }
    });

    return fractions;
  }
  checkSolution(): void {
    this.isAnswerChecked = true;

    // Normalize both the correct solution and the user's input.
    const normalizedUserX = this.formatNumber(this.userSolutionX);
    const normalizedUserY = this.formatNumber(this.userSolutionY);

    if (
      normalizedUserX === this.correctSolutionX &&
      normalizedUserY === this.correctSolutionY
    ) {
      this.isAnswerCorrect = true;
      this.correctAnswers++;
    } else {
      this.isAnswerCorrect = false;
    }
  }

  nextQuestion(): void {
    this.isAnswerChecked = false;
    this.attempts++;
    if (this.attempts < this.maxAttempts-1) {
      this.loadQuestion();
    } else {
      this.showSummary = true; // Show the summary when all questions are answered
      this.currentPart = Part.QuizCompleted; // If you want to move to another part
    }
  }

  resetQuiz(): void {
    this.attempts = 0;
    this.correctAnswers = 0;
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;
    this.showSummary = false; // Reset the summary view
    this.loadQuestion();
  }
  changePart(part: Part): void {
    this.currentPart = part;
    console.log('Current Part:', this.currentPart);
    if (part === Part.Quiz) {
      this.resetQuiz();
    } else if (part === Part.Test) {
      this.initializeTest();
    }
  }
  initializeTest(): void {
    // Create an array of Observables to request 10 questions
    const requests = Array(10).fill(null).map(() => this.authService.getMediumSystemOfEquations());

    forkJoin(requests).subscribe({
      next: (questions) => {
        // Store the questions directly in testQuestions without formatting
        this.testQuestions = questions.map(question => ({
          equation1: this.processEquation(question.equation1),
          equation2: this.processEquation(question.equation2),
          solution_x: this.formatNumber(question.solution_x),
          solution_y: this.formatNumber(question.solution_y),
        }));
        // Initialize the user answers
        this.userTestAnswers = this.testQuestions.map(() => ({ x: 0, y: 0 }));
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      this.userTestAnswers[index].x = this.formatNumber(this.userTestAnswers[index].x);
      this.userTestAnswers[index].y = this.formatNumber(this.userTestAnswers[index].y);
      if (
        question.solution_x === this.userTestAnswers[index].x &&
        question.solution_y === this.userTestAnswers[index].y
      ) {
        this.testCorrectAnswers++;
      }
    });
    this.showTestSummary = true; // Show the test summary
}

  startTest(): void {
    this.currentPart = Part.Test;
    console.log('Starting test, current part:', this.currentPart);
    this.initializeTest();
  }
  fetchUserExercises(): void {
    this.authService.getUserExercises9().subscribe(
      (data) => {
        this.savedQuestions = data;
        this.showExercises = true;
      },
      error => {
        console.error("Error fetching user exercises:", error);
      }
    );
  }

  processEquation(equation: string): string {
    let processedEquation = equation.replace(/\s?\+?\s?0x/g, '').replace(/\s?\+?\s?0y/g, '').replace(/\s?\-\s?0x/g, '').replace(/\s?\-\s?0y/g, '');
    processedEquation = processedEquation.replace(/\s?\+?\s?1x/g, ' + x').replace(/\s?\+?\s?1y/g, ' + y').replace(/\s?\-\s?1x/g, ' - x').replace(/\s?\-\s?1y/g, ' - y');
    processedEquation = processedEquation.replace(/\+\s?\-/g, '-');
    processedEquation = processedEquation.replace(/\-\s?\+/g, '-');
    processedEquation = processedEquation.replace(/^(\s?\+)/g, '').replace(/=\s?\+/g, '=');
    processedEquation = processedEquation.replace(/\s\s+/g, ' ');

    return processedEquation.trim();
  }

}


