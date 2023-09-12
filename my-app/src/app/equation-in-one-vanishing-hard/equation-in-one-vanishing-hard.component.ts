import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
interface QuizData {
  equation_text: string;
  correct_answer: string;
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-equation-in-one-vanishing-hard',
  templateUrl: './equation-in-one-vanishing-hard.component.html',
  styleUrls: ['./equation-in-one-vanishing-hard.component.scss']
})
export class EquationInOneVanishingHardComponent implements OnInit {
  Part = Part;
  equation: string = '';
  userSolution: number = 0; // Changed to number
  correctSolution: string = '';
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 0;
  correctAnswers: number = 0;
  maxAttempts: number = 7;
  showSummary: boolean = false;
  currentPart: Part = Part.Explanation;
  testQuestions: QuizData[] = [];
  userTestAnswers: number[] = []; // Changed to number array
  testCorrectAnswers: number = 0;
  showTestSummary: boolean = false; // Added this property
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
      this.authService.getHardEquationInOneVanishing().subscribe((data: QuizData) => {
        this.equation = data.equation_text;
        this.correctSolution = data.correct_answer;
        this.isAnswerChecked = false;
      });
    } else {
      this.showSummary = true;
    }
  }

  checkSolution(): void {
    this.isAnswerChecked = true;
    if (this.userSolution === parseFloat(this.correctSolution)) { // Compare as numbers
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
    const requests = Array(10).fill(null).map(() => this.authService.getHardEquationInOneVanishing());

    forkJoin(requests).subscribe({
      next: (questions: QuizData[]) => {
        this.testQuestions = questions;
        this.userTestAnswers = this.testQuestions.map(() => 0); // Initialize with zeros
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  checkTestAnswers(): void {
    this.testCorrectAnswers = 0;
    this.testQuestions.forEach((question, index) => {
      if (this.userTestAnswers[index] === parseFloat(question.correct_answer)) {
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
    this.authService.getUserExercises5().subscribe((data: QuizData[]) => {
        this.savedExercises = data;
        this.showExercises = true;
    }, error => {
        console.error("Error fetching user exercises:", error);
    });
}
anyValidExercise(): boolean {
  return this.savedExercises.some(exercise => exercise.equation_text && exercise.equation_text.trim() !== '' && exercise.equation_text !== 'Default Equation');
}


}
