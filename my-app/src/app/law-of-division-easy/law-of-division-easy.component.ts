import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
interface QuizData {
  problem_str: string;
  solution: string;
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-law-of-division-easy',
  templateUrl: './law-of-division-easy.component.html',
  styleUrls: ['./law-of-division-easy.component.sass']
})
export class LawOfDivisionEasyComponent implements OnInit {
  Part = Part;
  equation: string = '';
  userSolution: string = '';
  correctSolution: string = '';
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
      this.authService.getEasyLawOfDivision().subscribe((data: QuizData) => {
        this.equation = data.problem_str;
        this.correctSolution = data.solution;
        this.isAnswerChecked = false;
      });
    } else {
      this.showSummary = true;
    }
  }

  checkSolution(): void {
    this.isAnswerChecked = true;
    if (this.userSolution === this.correctSolution) {
      this.isAnswerCorrect = true;
      this.correctAnswers++;
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
      this.showSummary = true; // Show the summary when all questions are answered
      this.currentPart = Part.QuizCompleted; // If you want to move to another part
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
    const requests = Array(10).fill(null).map(() => this.authService.getEasyLawOfDivision());

    forkJoin(requests).subscribe({
      next: (questions: QuizData[]) => {
        this.testQuestions = questions; // Directly assign the questions, no need to map
        this.userTestAnswers = this.testQuestions.map(() => ''); // Initialize with empty strings
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      if (question.solution === this.userTestAnswers[index]) {
        this.testCorrectAnswers++;
      }
    });
    this.showSummary = true; // Use showSummary instead of showTestSummary
  }
  startTest(): void {
    this.currentPart = Part.Test;
    this.initializeTest();
  }


  addTerm(term: string): void {
    this.userSolution += term;
  }

  clearTerm(): void {
    this.userSolution = '';
  }
  addSymbol(symbol: string): void {
    this.userSolution += symbol;
  }

  addSymbolToTestAnswer(index: number, symbol: string): void {
    this.userTestAnswers[index] += symbol;
  }

  clearTestAnswer(index: number): void {
    this.userTestAnswers[index] = '';
  }

  // Rest of the methods would be similar to the previous component
  // You may add or modify methods to suit the requirements of this specific component
}
