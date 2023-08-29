import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'http://127.0.0.1:8000';  // Update with your Django API URL if different

  constructor(private http: HttpClient) { }

  retrieveSolvedExercises() {
    return this.http.get(`${this.baseUrl}/retrieve-exercises/`);
  }

  // You can add other exercise-related methods here in the future
}
