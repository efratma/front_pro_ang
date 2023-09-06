import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
interface QuizData {
  a_fl: number;
  b_fl: number;
  c_fl: number;
  option: 'a' | 'b' | 'c'; // Indicates the correct option
}


enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-pythagoras-hard',
  templateUrl: './pythagoras-hard.component.html',
  styleUrls: ['./pythagoras-hard.component.sass']
})
export class PythagorasHardComponent implements OnInit {
  Part = Part;
  sideA: number | null = null;
  sideB: number | null = null;
  sideC: number | null = null;
  userSolution: number = 0;
  correctSolution: number = 0;
  missingSide: 'a' | 'b' | 'c' = 'a';
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
  savedExercises: QuizData[] = [];
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
      this.authService.getPythagorasHard().subscribe((data: any) => {
        this.sideA = data.option === 'a' ? null : data.a_fl;
        this.sideB = data.option === 'b' ? null : data.b_fl;
        this.sideC = data.option === 'c' ? null : data.c_fl;
        this.missingSide = data.option;

        // Set the correct solution based on the missing side option
        switch (data.option) {
          case 'a':
            this.correctSolution = data.a_fl;
            break;
          case 'b':
            this.correctSolution = data.b_fl;
            break;
          case 'c':
            this.correctSolution = data.c_fl;
            break;
        }

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
    const requests = Array(10).fill(null).map(() => this.authService.getPythagorasHard());

    forkJoin(requests).subscribe({
      next: (questions: QuizData[]) => {
        console.log('Questions from API:', questions); // Log to see the fetched questions
        this.testQuestions = questions;
        this.userTestAnswers = this.testQuestions.map(() => 0);
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      let correctSolution: number | null = null;

      // Set the correct solution based on the missing side option
      switch (question.option) {
        case 'a':
          correctSolution = question.a_fl;
          break;
        case 'b':
          correctSolution = question.b_fl;
          break;
        case 'c':
          correctSolution = question.c_fl;
          break;
      }

      if (this.userTestAnswers[index] === correctSolution) {
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

  fetchUserExercises(): void {
    this.authService.getUserExercises14().subscribe((data: QuizData[]) => {
        this.savedExercises = data;
        this.showExercises = true;
    }, error => {
        console.error("Error fetching user exercises:", error);
    });
  }
  isValidExercise(exercise: QuizData): boolean {
    return exercise.a_fl !== 0 && exercise.b_fl !== 0 && exercise.c_fl !== 0 ;
  }

}
