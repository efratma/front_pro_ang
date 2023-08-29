import { Component, OnInit, Input } from '@angular/core';
import { ExerciseService } from '../exercise.service';  // Update the path if needed

@Component({
  selector: 'app-solved-problems',
  templateUrl: './solved-problems.component.html',
  styleUrls: ['./solved-problems.component.scss']
})
export class SolvedProblemsComponent implements OnInit {
  @Input() exercises: any[] = [];  // <-- Add this line for the Input property

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    // This will retrieve the exercises when the component initializes
    // You can remove this if you only want the retrieval to happen when the button is clicked
    this.retrieveExercises();
  }

  retrieveExercises(): void {
    this.exerciseService.retrieveSolvedExercises().subscribe((exercises: any) => {
      this.exercises = exercises;  // <-- Update this line to set the input property
    });
  }
}
