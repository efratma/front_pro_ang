import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
interface MeetingPointData {
  line1_equation: string;
  line2_equation: string;
  intersection_point: string;
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-meeting-point',
  templateUrl: './meeting-point.component.html',
  styleUrls: ['./meeting-point.component.sass']
})
export class MeetingPointsComponent implements OnInit {
  Part = Part;
  line1_equation: string = '';
  line2_equation: string = '';
  intersection_point: string = '';
  userIntersectionPoint: string = '';
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 0;
  correctAnswers: number = 0;
  maxAttempts: number = 6;
  showSummary: boolean = false;
  currentPart: Part = Part.Explanation;
  testQuestions: MeetingPointData[] = [];
  userTestAnswers: string[] = [];
  testCorrectAnswers: number = 0;
  showTestSummary: boolean = false;
  savedQuestions: MeetingPointData[] = [];
  showExercises: boolean = false;

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
      this.authService.getMeetingPoint().subscribe((data: any) => {
        this.line1_equation = data.line1_equation;
        this.line2_equation = data.line2_equation;
        this.intersection_point = data.intersection_point;
        this.isAnswerChecked = false;
      });
    } else {
      this.showSummary = true;
    }
  }
  checkSolution(): void {
    this.isAnswerChecked = true;

    // Parse the user's answer
    const userAnswer = this.userIntersectionPoint.replace(/[()]/g, '').split(',').map(Number); // Fix here

    // Parse the correct answer
    const correctAnswer = this.intersection_point.replace(/[()]/g, '').split(',').map(Number);

    // Check if the user's answer matches the correct answer
    if (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]) {
      this.isAnswerCorrect = true;
      this.correctAnswers++; // Increment the correct answers counter
    } else {
      this.isAnswerCorrect = false;
    }
  }

  nextQuestion(): void {
    this.isAnswerChecked = false;
    this.attempts++;
    if (this.attempts < this.maxAttempts) {
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
    const requests = Array(10).fill(null).map(() => this.authService.getMeetingPoint());

    forkJoin(requests).subscribe({
      next: (questions: MeetingPointData[]) => {
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
      // Parse the user's answer
      const userAnswer = this.userTestAnswers[index].trim().replace(/[()]/g, '').split(',').map(Number);

      // Parse the correct answer
      const correctAnswer = question.intersection_point.trim().replace(/[()]/g, '').split(',').map(Number);

      // Check if the user's answer matches the correct answer
      if (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]) {
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
    this.authService.getUserExercises().subscribe((data: MeetingPointData[]) => {
        this.savedQuestions = data;
        this.showExercises = true;
    }, error => {
        console.error("Error fetching user exercises:", error);
    });
}
}
