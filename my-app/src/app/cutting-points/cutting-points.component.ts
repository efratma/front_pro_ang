import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


interface QuestionData {
  equation: string;
  x_when_y_zero: number;
  y_when_x_zero: number;
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-cutting-points',
  templateUrl: './cutting-points.component.html',
  styleUrls: ['./cutting-points.component.scss']

})
export class CuttingPointsComponent implements OnInit {
  Part = Part;
  equation: string = '';
  x_when_y_zero: number = 0;
  y_when_x_zero: number = 0;
  userSolutionX: string = '';
  userSolutionY: string = '';
  correctSolutionX: string = '';
  correctSolutionY: string = '';
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 0;
  correctAnswers: number = 0;
  maxAttempts: number = 7;
  showSummary: boolean = false;
  currentPart: Part = Part.Explanation;
  testQuestions: QuestionData[] = []; // Change to QuestionData
  userTestAnswers: string[] = [];
  testCorrectAnswers: number = 0;
  showTestSummary: boolean = false;
// User's answer for the Y intersection
  userTestAnswersX: string[] = []; // User's answers for X intersections in the test
  userTestAnswersY: string[] = []; // User's answers for Y intersections in the test
  userIntersectionPoint: string = '';
  userXIntersection: string = '';
  userYIntersection: string = '';
  savedQuestions: QuestionData[] = [];
  showExercises: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

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

  loadQuestion(): void {
    if (!this.authService.isAuthenticated()) {
      console.error("User not authenticated. Cannot fetch question.");
      return;
    }
    if (this.attempts < this.maxAttempts) {
    this.authService.getCuttingPoints().subscribe((data: any) => {
      this.equation = this.formatEquation(data.equation);
      this.x_when_y_zero = data.x_when_y_zero;
      this.y_when_x_zero = data.y_when_x_zero;
      this.isAnswerChecked = false;
    });
    } else {
      this.showSummary = true;
    }
  }


  checkSolution(): void {
    this.isAnswerChecked = true;

    // Parse the user's answer for X and Y intersections
    const userAnswerX = parseFloat(this.userXIntersection.split(',')[0].replace(/[()]/g, ''));
    const userAnswerY = parseFloat(this.userYIntersection.split(',')[1].replace(/[()]/g, ''));

    // Check if the user's answers match the correct values
    if (userAnswerX === this.x_when_y_zero && userAnswerY === this.y_when_x_zero) {
      this.isAnswerCorrect = true;
      this.correctAnswers++; // Increment the correct answers counter
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
    const requests = Array(10).fill(null).map(() => this.authService.getCuttingPoints());

    forkJoin(requests).subscribe({
      next: (questions: QuestionData[]) => {
        this.testQuestions = questions.map(question => ({
          ...question,
          equation: this.formatEquation(question.equation),
        }));
        // Initialize userTestAnswersX and userTestAnswersY after loading testQuestions
        this.userTestAnswersX = this.testQuestions.map(() => '');
        this.userTestAnswersY = this.testQuestions.map(() => '');
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
    });
  }


  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      // Parse the user's answers for X and Y intersections
      const userAnswerX = parseFloat(this.userTestAnswersX[index].replace(/[()]/g, '').split(',')[0]);
      const userAnswerY = parseFloat(this.userTestAnswersY[index].replace(/[()]/g, '').split(',')[1]);

      // Check if the user's answers match the correct answers
      if (userAnswerX === question.x_when_y_zero && userAnswerY === question.y_when_x_zero) {
        this.testCorrectAnswers++;
      }
    });
    this.showTestSummary = true;

  }




  startTest(): void {
    this.currentPart = Part.Test;
    this.initializeTest();
  }

  // ... other methods ...

  navigateToTopics(): void {
    this.router.navigate(['/topic-selection']);
  }
  fetchUserExercises(): void {
    this.authService.getUserExercises2().subscribe((data: QuestionData[]) => {
        this.savedQuestions = data;
        this.showExercises = true;
    }, error => {
        console.error("Error fetching user exercises:", error);
    });
}
}
