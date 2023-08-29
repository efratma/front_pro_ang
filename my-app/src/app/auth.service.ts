import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface QuizData {
  problem_str: string;
  solution: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000'; // Update with your Django API URL

  constructor(private http: HttpClient) { }

  login(user: { username: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/login/`;
    return this.http.post(url, user);
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/register/`;
    return this.http.post(url, user);
  }

  getDifficultSystemOfEquations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/problem/test_2/`);
  }



getMediumSystemOfEquations(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/problem/test_3/`);
}

getEasySystemOfEquations() {
  return this.http.get<any>(`${this.apiUrl}/problem/test_4/`);
}

getHardLawOfDivision(): Observable<QuizData> {
  return this.http.get<QuizData>(`${this.apiUrl}/problem/test/`);
}

getEasyLawOfDivision() {
  return this.http.get<QuizData>(`${this.apiUrl}/problem/test_1/`);
}

getHardEquationInOneVanishing(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_5/`);
}

getMediumEquationInOneVanishing(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_6/`);
}

getEasyEquationInOneVanishing(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_7/`);
}

getPythagorasEasy(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_14/`);
}

getPythagorasHard(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_8/`);
}

getLinearLine(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_9/`);
}
getCuttingPoints(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_11/`);
}

getMeetingPoint(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_10/`);
}

getTriangularArea(): Observable<any> {
  return this.http.get(`${this.apiUrl}/problem/test_13/`);
}
// auth.service.ts
logout(): void {
  localStorage.removeItem('token');  // Assuming you're using a token for authentication.
}

}






