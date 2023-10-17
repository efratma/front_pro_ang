import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
interface QuizData {
  problem_str: string;
  solution: string;
}

interface TestData {
  equation: string;
  solution: string;
}

enum Part {
  Explanation = 'explanation',
  Quiz = 'quiz',
  Test = 'test',
  QuizCompleted = 'quizCompleted',
}

@Component({
  selector: 'app-law-of-division-hard',
  templateUrl: './law-of-division-hard.component.html',
  styleUrls: ['./law-of-division-hard.component.scss']
})
export class LawOfDivisionHardComponent implements OnInit {
  Part = Part;
  equation: string = '';
  userSolution: string = '';
  correctSolution: string = '';
  isAnswerChecked: boolean = false;
  isAnswerCorrect: boolean = false;
  attempts: number = 1;
  correctAnswers: number = 0;
  maxAttempts: number = 7;
  showSummary: boolean = false;
  currentPart: Part = Part.Explanation;
  testQuestions: TestData[] = [];
  userTestAnswers: string[] = [];
  testCorrectAnswers: number = 0;
  backgroundColor: string = '';
  showTestSummary: boolean = false;
  savedQuestions: QuizData[] = [];
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
      this.authService.getHardLawOfDivision().subscribe((data: QuizData) => {
        this.equation = this.formatExpression(data.problem_str);
        this.correctSolution = this.formatExpression(data.solution);
        this.isAnswerChecked = false;
      });
    } else {
      this.showSummary = true;
    }
  }

  normalizeExpression(expr: string): string {
    return expr.replace(/\s+/g, '').trim();
}

checkSolution(): void {
  const normalizedUserSolution = this.normalizeExpression(this.formatUserInput(this.userSolution));
  const normalizedCorrectSolution = this.normalizeExpression(this.formatExpression(this.correctSolution));

  this.isAnswerChecked = true;

  if (normalizedUserSolution === normalizedCorrectSolution) {
      this.isAnswerCorrect = true;
      this.correctAnswers++;
  } else {
      this.isAnswerCorrect = false;
      // Debug output for discrepancy
      console.log("User Solution: ", JSON.stringify(normalizedUserSolution));
      console.log("Correct Solution: ", JSON.stringify(normalizedCorrectSolution));
  }
}

formatExpression(expr: string): string {
  // Convert from x2 to x^2
  expr = expr.replace(/([a-z])2/g, '$1^2');

  // Convert "+-" to "-"
  expr = expr.replace(/\+\-/g, '-');

  // Remove coefficient of 1 for variables
  expr = expr.replace(/(^|\s|\+|\-|\/|\*)1([a-z])/g, '$1$2');

  return expr;
}



formatUserInput(expr: string): string {
  // If the user mistakenly enters x2, convert it to x^2
  return expr.replace(/([a-z])2/g, '$1^2');
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
    const requests = Array(10).fill(null).map(() => this.authService.getHardLawOfDivision());

    forkJoin(requests).subscribe({
        next: (questions: QuizData[]) => {
            this.testQuestions = questions.map(question => ({
                equation: this.formatExpression(question.problem_str),
                solution: this.formatExpression(question.solution),
            }));
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
      const normalizedUserAnswer = this.normalizeExpression(this.formatUserInput(this.userTestAnswers[index]));
      const normalizedCorrectSolution = this.normalizeExpression(this.formatExpression(question.solution));

      if (normalizedCorrectSolution === normalizedUserAnswer) {
          this.testCorrectAnswers++;
      } else {
          // Debug output for discrepancy
          console.log("Test Question ", index + 1);
          console.log("User Solution: ", JSON.stringify(normalizedUserAnswer));
          console.log("Correct Solution: ", JSON.stringify(normalizedCorrectSolution));
      }
  });

  this.showTestSummary = true;
}




  startTest(): void {
    this.currentPart = Part.Test;
    this.initializeTest();
  }


  addTerm(term: string, index?: number): void {
    if (typeof index !== 'undefined') {
        this.userTestAnswers[index] = (this.userTestAnswers[index] || '') + term;
    } else {
        this.userSolution += term;
    }
}


clearTerm(index?: number): void {
  if (typeof index !== 'undefined') {
      this.userTestAnswers[index] = '';
  } else {
      this.userSolution = '';
  }
}

addSymbol(symbol: string, index?: number): void {
  if (typeof index !== 'undefined') {
      this.userTestAnswers[index] = (this.userTestAnswers[index] || '') + symbol;
  } else {
      this.userSolution += symbol;
  }
}


  addSymbolToTestAnswer(index: number, symbol: string): void {
    this.userTestAnswers[index] += symbol;
  }

  clearTestAnswer(index: number): void {
    this.userTestAnswers[index] = '';
  }
  fetchUserExercises(): void {
    this.authService.getUserExercises11().subscribe((data: QuizData[]) => {
        this.savedQuestions = data;
        this.showExercises = true;
    }, error => {
        console.error("Error fetching user exercises:", error);
    });
}

}
