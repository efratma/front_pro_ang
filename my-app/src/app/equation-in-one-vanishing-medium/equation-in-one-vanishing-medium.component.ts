import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
interface QuizData {
  equation: string; // Updated field name
  correct_answer_fl: number; // Updated field name and type
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-equation-in-one-vanishing-medium',
  templateUrl: './equation-in-one-vanishing-medium.component.html',
  styleUrls: ['./equation-in-one-vanishing-medium.component.sass'],
})
export class EquationInOneVanishingMediumComponent implements OnInit {
  Part = Part;
  equation: string = '';
  userSolution: number = 0;
  correctSolution: number = 0; // Changed to number
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 0;
  correctAnswers: number = 0;
  maxAttempts: number = 7;
  showSummary: boolean = false;
  currentPart: Part = Part.Explanation;
  testQuestions: QuizData[] = [];
  userTestAnswers: number[] = [];
  testCorrectAnswers: number = 0;
  showTestSummary: boolean = false;

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
      this.authService.getMediumEquationInOneVanishing().subscribe((data: QuizData) => {
        this.equation = data.equation; // Updated field name
        this.correctSolution = data.correct_answer_fl; // Updated field name
        this.isAnswerChecked = false;
      });
    } else {
      this.showSummary = true;
    }
  }
  checkSolution(): void {
    this.isAnswerChecked = true;
    if (this.userSolution === this.correctSolution) { // Compare as numbers directly
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
    const requests = Array(10).fill(null).map(() => this.authService.getMediumEquationInOneVanishing());

    forkJoin(requests).subscribe({
      next: (questions: QuizData[]) => {
        this.testQuestions = questions;
        this.userTestAnswers = this.testQuestions.map(() => 0);
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
    });
  }

  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      if (this.userTestAnswers[index] === question.correct_answer_fl) { // Updated field name
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
    this.userTestAnswers[index] = 0;
  }
}
