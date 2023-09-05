import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

interface QuizData {
  a: number;
  b: number;
  c_fl: number; // Missing side
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-pythagoras-easy',
  templateUrl: './pythagoras-easy.component.html',
  styleUrls: ['./pythagoras-easy.component.sass']
})

export class PythagorasEasyComponent implements OnInit {
  Part = Part;
  sideA: number = 0;
  sideB: number = 0;
  userSolution: number = 0;
  correctSolution: number = 0;
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
  question: string='';

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
      this.authService.getPythagorasEasy().subscribe((data: QuizData) => {
        this.sideA = data.a;
        this.sideB = data.b;
        this.correctSolution = data.c_fl;
        this.isAnswerChecked = false;
      });
    } else {
      this.showSummary = true;
    }
  }

  checkSolution(): void {
    // Check the solution
    this.isAnswerChecked = true;
    if (this.userSolution === this.correctSolution) {
      this.isAnswerCorrect = true;
      this.correctAnswers++;
    } else {
      this.isAnswerCorrect = false;
    }

    // Now, save the response to the backend
    const responseData = {
      topic: 'Pythagoras Easy',  // Modify this if needed
      question: this.question,
      user_answer: this.userSolution,  // Using userSolution from your code
      correct_answer: this.correctSolution,  // Using correctSolution from your code
      is_correct: this.isAnswerCorrect,  // Using isAnswerCorrect from your code
      // ... any other data you want to send
    };


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
    const requests = Array(10).fill(null).map(() => this.authService.getPythagorasEasy());

    forkJoin(requests).subscribe({
      next: (questions: QuizData[]) => {
        this.testQuestions = questions;
        this.userTestAnswers = this.testQuestions.map(() => 0);
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }
  navigateToTopics(): void {
    this.router.navigate(['/topic-selection']);
  }

  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      if (this.userTestAnswers[index] === question.c_fl) {
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

