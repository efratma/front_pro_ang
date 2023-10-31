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
  selector: 'app-equation-system-hard',
  templateUrl: './equation-system-hard.component.html',
  styleUrls: ['./equation-system-hard.component.scss'],
})
export class EquationSystemHardComponent implements OnInit {
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
    equation1Fractions: { numerator: string, denominator: string }[];
    equation2Fractions: { numerator: string, denominator: string }[];
    solution_x: number;
    solution_y: number;
  }[] = [];
  userTestAnswers: { x: number, y: number }[] = [];
  testCorrectAnswers: number = 0;
  backgroundColor: string = '';
  showTestSummary: boolean = false;
  savedQuestions: any[] = [];
  showExercises: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuestion();
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
        this.authService.getDifficultSystemOfEquations().subscribe((data) => {
            this.equation1Fractions = this.formatEquation(data.equation1);
            this.equation2Fractions = this.formatEquation(data.equation2);

            // Check if the question has no solution or infinite solutions
            if (data.error) {
                // If so, call loadQuestion() recursively to fetch a new question
                this.loadQuestion();
            } else {
                // Handle the regular case with valid solutions
                this.equation1 = data.equation1;
                this.equation2 = data.equation2;

                // Format the solutions
                this.correctSolutionX = this.formatNumber(data.solution_x);
                this.correctSolutionY = this.formatNumber(data.solution_y);

                this.isAnswerChecked = false; // Reset the answer check status
            }
        });
    } else {
        this.showSummary = true; // Show the summary when all questions are answered
    }
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


checkSolution(): void {
  this.isAnswerChecked = true;

  // Format user's answers
  this.userSolutionX = this.formatNumber(this.userSolutionX);
  this.userSolutionY = this.formatNumber(this.userSolutionY);

  if (
    this.userSolutionX === this.correctSolutionX &&
    this.userSolutionY === this.correctSolutionY
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
    const requests = Array(10).fill(null).map(() => this.authService.getDifficultSystemOfEquations());

    forkJoin(requests).subscribe({
        next: (questions) => {
            // Format each question and store it in testQuestions
            this.testQuestions = questions.map(question => ({
                equation1Fractions: this.formatEquation(question.equation1),
                equation2Fractions: this.formatEquation(question.equation2),
                solution_x: this.formatNumber(question.solution_x),  // Formatting here
                solution_y: this.formatNumber(question.solution_y),  // Formatting here
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
        // Format the correct solutions from the test questions
        const formattedSolutionX = this.formatNumber(question.solution_x);
        const formattedSolutionY = this.formatNumber(question.solution_y);

        // Format the user's test answers
        const formattedUserAnswerX = this.formatNumber(this.userTestAnswers[index].x);
        const formattedUserAnswerY = this.formatNumber(this.userTestAnswers[index].y);

        if (
            formattedUserAnswerX === formattedSolutionX &&
            formattedUserAnswerY === formattedSolutionY
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
    this.authService.getUserExercises8().subscribe((data: any[]) => {
        this.savedQuestions = data;
        this.showExercises = true;
    }, error => {
        console.error("Error fetching user exercises:", error);
    });
}


}
