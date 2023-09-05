import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
interface QuizData {
  point1_x: number;
  point1_y: number;
  point2_x: number;
  point2_y: number;
  slope: number;
  y_intercept: number;
  equation: string;
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-linear-line',
  templateUrl: './linear-line.component.html',
  styleUrls: ['./linear-line.component.sass']
})
export class LinearLineComponent implements OnInit {
  Part = Part;
  point1_x: number = 0;
  point1_y: number = 0;
  point2_x: number = 0;
  point2_y: number = 0;
  slope: number = 0;
  y_intercept: number = 0;
  equation: string = '';
  userSolution: string = '';
  correctSolution: string = ''; // Now a string to store the equation
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 0;
  correctAnswers: number = 0;
  maxAttempts: number = 7;
  showSummary: boolean = false;
  currentPart: Part = Part.Explanation;
  testQuestions: QuizData[] = [];
  userTestAnswers: string[] = [];
  testCorrectAnswers: number = 0;
  showTestSummary: boolean = false;
  userSlope: number = 0; // Variable to store user's slope input
  isSlopeChecked: boolean = false; // Add this line to track if the slope has been checked
  isSlopeCorrect: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion(): void {
    if (!this.authService.isAuthenticated()) {
      console.error("User not authenticated. Cannot fetch question.");
      return;
    }
    if (this.attempts < this.maxAttempts) {
      this.authService.getLinearLine().subscribe((data: any) => {
        this.point1_x = data.point1_x;
        this.point1_y = data.point1_y;
        this.point2_x = data.point2_x;
        this.point2_y = data.point2_y;
        this.slope = data.slope;
        this.y_intercept = data.y_intercept;
        this.equation = data.equation;
        this.isSlopeChecked = false;
        this.isAnswerChecked = false;
      });
    } else {
      this.showSummary = true;
    }
  }
  checkSolution(): void {
    this.isAnswerChecked = true;
    if (this.userSolution === this.equation) {
      this.isAnswerCorrect = true;
    } else {
      this.isAnswerCorrect = false;
    }
  }
  navigateToTopics(): void {
    this.router.navigate(['/topic-selection']);
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
    const requests = Array(10).fill(null).map(() => this.authService.getLinearLine());

    forkJoin(requests).subscribe({
      next: (questions: QuizData[]) => {
        console.log('Test Questions:', questions); // Add this line to log the questions
        this.testQuestions = questions;
        this.userTestAnswers = this.testQuestions.map(() => '');
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
    });
  }


  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      if (this.userTestAnswers[index] === question.equation) {
        this.testCorrectAnswers++;
      }
    });
    this.showTestSummary = true;
  }

  startTest(): void {
    this.currentPart = Part.Test;
    this.initializeTest();
  }

  clearTestAnswer(index: number): void {
    this.userTestAnswers[index] = '';
  }

  checkSlope(): void {
    this.isSlopeChecked = true;
    if (this.userSlope === this.slope) {
      this.isSlopeCorrect = true;
    } else {
      this.isSlopeCorrect = false;
    }
  }

}


